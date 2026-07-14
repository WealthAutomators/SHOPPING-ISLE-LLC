"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { editorialBanner } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function EditorialBanner() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid items-stretch overflow-hidden lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative min-h-[420px] bg-muted lg:min-h-[560px]"
          >
            <Image
              src={editorialBanner.image}
              alt={editorialBanner.title.replace(/\n/g, " ")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="flex flex-col justify-center bg-primary px-8 py-14 sm:px-12 lg:px-16 lg:py-20"
          >
            <h2 className="font-display text-4xl font-medium tracking-tight text-white whitespace-pre-line md:text-5xl">
              {editorialBanner.title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
              {editorialBanner.description}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-10 w-fit bg-white text-primary hover:bg-secondary hover:text-foreground"
            >
              <Link href={editorialBanner.ctaLink}>{editorialBanner.ctaText}</Link>
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
