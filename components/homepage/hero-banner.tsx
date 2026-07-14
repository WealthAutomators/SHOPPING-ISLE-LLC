"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroSlides } from "@/data/homepage";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  const slide = heroSlides[0];

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <Image
        src={slide.image}
        alt={slide.headline.replace(/\n/g, " ")}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C5C]/70 via-[#0F4C5C]/25 to-[#D4B483]/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#24323D]/40 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-white whitespace-pre-line sm:text-6xl lg:text-7xl">
            {slide.headline}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
            {slide.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="min-w-[168px]">
              <Link href={slide.ctaLink}>{slide.ctaText}</Link>
            </Button>
            {slide.secondaryCtaText && slide.secondaryCtaLink && (
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="min-w-[168px] border-white bg-white/95 text-primary hover:border-primary hover:bg-primary hover:text-white"
              >
                <Link href={slide.secondaryCtaLink}>{slide.secondaryCtaText}</Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
