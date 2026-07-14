"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { aboutSection } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function SplitLifestyleSection() {
  return (
    <section className="bg-muted/40 py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] overflow-hidden bg-muted"
          >
            <Image
              src={aboutSection.image}
              alt={aboutSection.title.replace(/\n/g, " ")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-lg lg:py-8"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-secondary">
              Our Philosophy
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-primary whitespace-pre-line md:text-5xl">
              {aboutSection.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {aboutSection.description}
            </p>
            <Button asChild size="lg" className="mt-10">
              <Link href={aboutSection.buttonLink}>{aboutSection.buttonText}</Link>
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
