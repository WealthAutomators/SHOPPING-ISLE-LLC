"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { featuredCollections } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function FeaturedCollections() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          title="Seasonal Collections"
          subtitle="Four curated worlds for summer ease, modern interiors, outdoor comfort, and everyday rituals."
          centered
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {featuredCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <Link
                href={collection.href}
                className="group relative block aspect-[4/5] overflow-hidden bg-muted sm:aspect-[5/6]"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C5C]/75 via-[#0F4C5C]/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                  <h3 className="font-display text-3xl font-medium tracking-tight text-white md:text-4xl">
                    {collection.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-white/80 md:text-base">
                    {collection.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
