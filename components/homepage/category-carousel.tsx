"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const homepageCategorySlugs = [
  "electronics",
  "home-kitchen",
  "bathroom",
  "beauty",
  "sports-outdoors",
  "office-supplies",
  "fashion-accessories",
  "baby-products",
  "pet-supplies",
  "health-wellness",
  "gaming",
  "toys-games",
];

export function CategoryCarousel() {
  const homepageCategories = categories.filter((c) => homepageCategorySlugs.includes(c.slug));

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          title="Explore By Category"
          subtitle="Wide editorial panels for every corner of a well-curated life."
          centered
        />
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {homepageCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <Link
                href={`/categories/${category.slug}`}
                className="group relative block aspect-[16/9] overflow-hidden bg-muted sm:aspect-[2/1]"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C5C]/70 via-[#0F4C5C]/35 to-transparent transition-opacity duration-500 group-hover:from-[#0F4C5C]/80" />
                <div className="absolute inset-0 flex items-end justify-between p-6 md:p-8">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-secondary">
                      Collection
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-white md:text-3xl">
                      {category.name}
                    </h3>
                    <p className="mt-1 max-w-xs text-sm text-white/75">
                      {category.description}
                    </p>
                  </div>
                  <span className="mb-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:border-secondary group-hover:bg-secondary group-hover:text-foreground">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
