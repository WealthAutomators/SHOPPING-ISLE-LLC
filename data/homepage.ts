import {
  Feature,
  HeroSlide,
  PromoBanner,
} from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    image: "/hero/hero-1.jpg",
    headline: "Shop Beautifully.\nLive Comfortably.",
    description:
      "Explore thoughtfully selected products for every room, every routine and every season.",
    ctaText: "Explore Collection",
    ctaLink: "/shop",
    secondaryCtaText: "Shop New Arrivals",
    secondaryCtaLink: "/new-arrivals",
  },
];

export const features: Feature[] = [
  {
    id: "1",
    icon: "truck",
    title: "Complimentary Shipping",
    description: "Free shipping on orders over $75. Most arrive in 3–5 business days.",
  },
  {
    id: "2",
    icon: "star",
    title: "Curated Selection",
    description: "Every product is chosen for design, comfort, and lasting quality.",
  },
  {
    id: "3",
    icon: "shield",
    title: "Secure Checkout",
    description: "Your payment details are protected with industry-standard encryption.",
  },
  {
    id: "4",
    icon: "rotate",
    title: "Easy Returns",
    description: "Hassle-free 30-day returns on most items. We make it simple.",
  },
];

export const featuredCollections = [
  {
    id: "1",
    title: "Summer Living",
    subtitle: "Light fabrics, breezy textures, and sunlit essentials",
    href: "/categories/fashion-accessories",
    image: "/categories/fashion-accessories.jpg",
  },
  {
    id: "2",
    title: "Modern Home",
    subtitle: "Refined pieces for calm, intentional interiors",
    href: "/categories/home-kitchen",
    image: "/categories/home-kitchen.jpg",
  },
  {
    id: "3",
    title: "Outdoor Comfort",
    subtitle: "Lounge-ready finds for terraces and gardens",
    href: "/categories/sports-outdoors",
    image: "/categories/sports-outdoors.jpg",
  },
  {
    id: "4",
    title: "Everyday Essentials",
    subtitle: "Beautiful tools for the rituals you return to daily",
    href: "/categories/beauty",
    image: "/categories/beauty.jpg",
  },
];

export const editorialBanner = {
  title: "Inspired Spaces.\nThoughtful Living.",
  description:
    "SHOPPING ISLE LLC is a curated lifestyle destination — where coastal calm meets modern comfort. Discover products chosen to elevate every corner of your home and every moment of your day.",
  ctaText: "Discover More",
  ctaLink: "/about",
  image: "/banners/featured.jpg",
};

export const dealsEndTime = new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString();

export const homepageDealsSlugs = [
  "linen-duvet-cover",
  "bath-towel-set",
  "outdoor-lantern-set",
  "cashmere-scarf",
  "gaming-headset",
  "spa-robe-set",
] as const;

export const homepageTrendingSlugs = [
  "linen-duvet-cover",
  "ceramic-diffuser",
  "teak-desk-organizer",
  "outdoor-lounge-cushion",
  "woven-storage-baskets",
  "yoga-mat",
  "bluetooth-speaker",
  "marble-serving-board",
] as const;

export const homepageBestsellerSlugs = [
  "wireless-earbuds",
  "linen-duvet-cover",
  "electric-kettle",
  "bath-towel-set",
  "outdoor-lantern-set",
  "dog-bed",
  "yoga-mat",
  "ceramic-diffuser",
] as const;

export const homepageFeaturedSlugs = [
  "linen-duvet-cover",
  "marble-serving-board",
  "outdoor-lounge-cushion",
  "teak-desk-organizer",
  "coastal-throw-blanket",
  "spa-robe-set",
  "cashmere-scarf",
  "ceramic-diffuser",
  "woven-storage-baskets",
  "outdoor-lantern-set",
] as const;

export const homepageNewArrivalSlugs = [
  "linen-duvet-cover",
  "marble-serving-board",
  "ceramic-diffuser",
  "outdoor-lantern-set",
  "cashmere-scarf",
  "brass-picture-frame",
] as const;

export const promotionalBanner: PromoBanner = {
  id: "1",
  title: "Curated Living. Inspired Shopping.",
  description:
    "Premium materials. Quiet design. Products chosen to bring resort calm into everyday life.",
  buttonText: "Browse Collection",
  buttonLink: "/shop",
  image: "/banners/featured.jpg",
};

export const featuredCollection = {
  title: "Featured Products",
  description:
    "Hand-selected pieces across home, beauty, fashion, and more — curated for coastal lifestyle living.",
  bannerImage: "/banners/featured.jpg",
  categorySlug: "home-kitchen",
};

export const bestSellerTabs = [
  { label: "All", slug: "all" },
  { label: "Home & Kitchen", slug: "home-kitchen" },
  { label: "Beauty", slug: "beauty" },
  { label: "Fashion", slug: "fashion-accessories" },
  { label: "Sports", slug: "sports-outdoors" },
];

export const newsletter = {
  title: "Join Our Community.",
  description:
    "Receive seasonal collections, exclusive offers and carefully curated recommendations.",
  placeholder: "Enter your email address",
  buttonText: "Subscribe",
};

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export const aboutSection = {
  title: "Inspired Spaces.\nThoughtful Living.",
  description:
    "SHOPPING ISLE LLC is more than a marketplace — it is a curated lifestyle destination. We gather products that bring the ease of resort living into your everyday spaces: soft textiles, refined tools, and beautiful essentials for home, self-care, and leisure.",
  checklist: [
    "Coastal-inspired curation across every category",
    "Quality-first selection over endless inventory",
    "Products designed for comfort, clarity, and beauty",
    "A shopping experience that feels like turning magazine pages",
  ],
  buttonText: "Discover More",
  buttonLink: "/about",
  image: "/banners/about.jpg",
};
