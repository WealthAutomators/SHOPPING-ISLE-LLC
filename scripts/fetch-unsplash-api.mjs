/**
 * Fetches relevant product/category imagery from the Unsplash API for
 * SHOPPING ISLE LLC and saves them into /public.
 *
 * Usage:
 *   UNSPLASH_ACCESS_KEY=xxxx node scripts/fetch-unsplash-api.mjs
 *   node scripts/fetch-unsplash-api.mjs <access_key>
 *
 * Optionally limit work:
 *   ONLY_SLUGS=slug1,slug2 UNSPLASH_ACCESS_KEY=xxxx node scripts/fetch-unsplash-api.mjs
 *   FETCH_HOMEPAGE=1 UNSPLASH_ACCESS_KEY=xxxx node scripts/fetch-unsplash-api.mjs
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || process.argv[2];
if (!ACCESS_KEY) {
  console.error("Missing Unsplash access key. Pass it as env UNSPLASH_ACCESS_KEY or as the first argument.");
  process.exit(1);
}

const MAX_API_CALLS = 48;
let apiCalls = 0;

const PRODUCT_QUERIES = {
  "wireless-earbuds": "wireless earbuds",
  "bluetooth-speaker": "portable bluetooth speaker",
  "coastal-throw-blanket": "linen throw blanket sofa",
  "marble-serving-board": "marble cheese board",
  "electric-kettle": "electric glass kettle",
  "air-fryer": "air fryer kitchen",
  "coffee-grinder": "coffee grinder",
  "linen-duvet-cover": "linen bedding duvet white",
  "bath-towel-set": "folded bath towels spa",
  "bamboo-bath-mat": "bamboo bath mat bathroom",
  "spa-robe-set": "white waffle spa robe",
  "ceramic-diffuser": "ceramic essential oil diffuser",
  "dog-bed": "dog bed",
  "woven-storage-baskets": "seagrass woven basket storage",
  "vitamin-c-serum-set": "skincare serum bottle beauty",
  "outdoor-lantern-set": "outdoor metal lantern patio",
  "yoga-mat": "yoga mat",
  "resistance-bands-set": "resistance bands workout",
  "outdoor-lounge-cushion": "outdoor patio cushion lounge",
  "standing-desk-lamp": "minimal desk lamp",
  "teak-desk-organizer": "wooden desk organizer tray",
  "leather-wallet": "leather wallet",
  "sunglasses-classic": "sunglasses",
  "cashmere-scarf": "cashmere scarf fashion",
  "baby-monitor": "baby monitor camera",
  "magnetic-tile-builders": "magnetic building tiles kids",
  "foam-roller": "foam roller fitness",
  "brass-picture-frame": "brass picture frame decor",
  "gaming-headset": "gaming headset",
  "silk-pillowcase-set": "silk pillowcase luxury bedding",
};

const CATEGORY_QUERIES = {
  electronics: "minimal electronics lifestyle",
  "home-kitchen": "beautiful modern kitchen interior coastal",
  bathroom: "luxury spa bathroom interior",
  "educational-toys": "educational toys children",
  "pet-supplies": "pet supplies accessories",
  beauty: "beauty skincare flat lay aesthetic",
  "sports-outdoors": "outdoor patio lifestyle",
  "office-supplies": "calm organized desk workspace",
  "fashion-accessories": "fashion accessories flat lay linen",
  "baby-products": "baby nursery soft",
  "toys-games": "toys and games",
  "health-wellness": "wellness spa products",
  gaming: "gaming setup clean desk",
};

function parseProducts() {
  const content = fs.readFileSync(path.join(ROOT, "data", "products.ts"), "utf8");
  const blocks = content.split(/\n  \{/);
  const products = [];
  for (const block of blocks.slice(1)) {
    const slug = block.match(/slug: "([^"]+)"/)?.[1];
    const categorySlug = block.match(/categorySlug: "([^"]+)"/)?.[1];
    if (slug && categorySlug) products.push({ slug, categorySlug });
  }
  return products;
}

async function searchPhotos(query, { orientation = "squarish", perPage = 8 } = {}) {
  if (apiCalls >= MAX_API_CALLS) {
    throw new Error(`API budget (${MAX_API_CALLS}) reached — stopping to respect rate limit`);
  }
  apiCalls++;
  const url =
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}` +
    `&per_page=${perPage}&orientation=${orientation}&content_filter=high`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
      "Accept-Version": "v1",
    },
  });
  const remaining = res.headers.get("x-ratelimit-remaining");
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Unsplash API ${res.status}: ${body.slice(0, 160)}`);
  }
  const data = await res.json();
  return { results: data.results || [], remaining };
}

async function downloadImage(photo, width) {
  const url = `${photo.urls.raw}&fm=jpg&q=82&w=${width}&fit=crop`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`CDN HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error("file too small");
  return buf;
}

const usedPhotoIds = new Set();
const usedHashes = new Set();

function pickUnused(results) {
  return results.filter((p) => !usedPhotoIds.has(p.id));
}

async function saveTarget(file, photo, width) {
  const buf = await downloadImage(photo, width);
  const hash = crypto.createHash("sha256").update(buf).digest("hex");
  if (usedHashes.has(hash)) return false;
  const dest = path.join(PUBLIC, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  usedPhotoIds.add(photo.id);
  usedHashes.add(hash);
  return true;
}

async function fetchProductImages(products) {
  let success = 0;
  let failed = 0;
  for (const product of products) {
    const query = PRODUCT_QUERIES[product.slug] || product.slug.replace(/-/g, " ");
    try {
      const { results, remaining } = await searchPhotos(query, {
        orientation: "squarish",
        perPage: 8,
      });
      const candidates = pickUnused(results);
      const files = [`products/${product.slug}-1.jpg`, `products/${product.slug}-2.jpg`];
      let idx = 0;
      for (const file of files) {
        let saved = false;
        while (idx < candidates.length && !saved) {
          try {
            saved = await saveTarget(file, candidates[idx], 900);
          } catch (err) {
            console.warn(`  retry ${file}: ${err.message}`);
          }
          idx++;
        }
        if (saved) {
          success++;
          console.log(`✓ ${file} ← "${query}" (api left: ${remaining})`);
        } else {
          failed++;
          console.error(`✗ ${file} — no unique photo from "${query}"`);
        }
      }
    } catch (err) {
      console.error(`✗ product ${product.slug}: ${err.message}`);
      if (err.message.includes("budget")) return { success, failed, stop: true };
      failed += 2;
    }
  }
  return { success, failed, stop: false };
}

async function fetchHomepageImages() {
  let success = 0;
  let failed = 0;
  const wide = [
    { file: "hero/hero-1.jpg", query: "luxury coastal living room soft light", width: 2000 },
    { file: "banners/featured.jpg", query: "elegant coastal interior lifestyle", width: 1600 },
    { file: "banners/about.jpg", query: "resort lifestyle coastal terrace", width: 1600 },
    { file: "categories/fashion-accessories.jpg", query: "summer fashion accessories linen", width: 1200 },
    { file: "categories/home-kitchen.jpg", query: "bright modern coastal kitchen", width: 1200 },
    { file: "categories/sports-outdoors.jpg", query: "outdoor patio lounge cushion", width: 1200 },
    { file: "categories/beauty.jpg", query: "spa beauty products flat lay", width: 1200 },
  ];
  for (const t of wide) {
    try {
      const { results, remaining } = await searchPhotos(t.query, {
        orientation: "landscape",
        perPage: 6,
      });
      const candidates = pickUnused(results);
      let saved = false;
      let i = 0;
      while (i < candidates.length && !saved) {
        try {
          saved = await saveTarget(t.file, candidates[i], t.width);
        } catch (err) {
          console.warn(`  retry ${t.file}: ${err.message}`);
        }
        i++;
      }
      if (saved) {
        success++;
        console.log(`✓ ${t.file} ← "${t.query}" (api left: ${remaining})`);
      } else {
        failed++;
      }
    } catch (err) {
      console.error(`✗ ${t.file}: ${err.message}`);
      if (err.message.includes("budget")) break;
      failed++;
    }
  }
  return { success, failed };
}

async function main() {
  const onlySlugs = process.env.ONLY_SLUGS
    ? new Set(process.env.ONLY_SLUGS.split(",").map((s) => s.trim()))
    : null;
  const fetchHomepage = process.env.FETCH_HOMEPAGE === "1" || !onlySlugs;

  const products = parseProducts().filter((p) => !onlySlugs || onlySlugs.has(p.slug));
  let success = 0;
  let failed = 0;

  console.log(`Unsplash API image fetch — budget ${MAX_API_CALLS} searches\n`);

  if (products.length) {
    const result = await fetchProductImages(products);
    success += result.success;
    failed += result.failed;
    if (result.stop) return finish(success, failed);
  }

  if (fetchHomepage && !onlySlugs) {
    const result = await fetchHomepageImages();
    success += result.success;
    failed += result.failed;
  } else if (process.env.FETCH_HOMEPAGE === "1") {
    const result = await fetchHomepageImages();
    success += result.success;
    failed += result.failed;
  }

  finish(success, failed);
}

function finish(success, failed) {
  console.log(
    `\nDone: ${success} images saved, ${failed} failed, ${usedPhotoIds.size} unique photos, ${apiCalls} API calls used.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
