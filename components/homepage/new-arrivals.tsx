"use client";

import { homepageNewArrivalSlugs } from "@/data/homepage";
import { getProductsBySlugs } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Carousel } from "@/components/ui/carousel";
import { ProductCard } from "@/components/product/product-card";

export function NewArrivals() {
  const products = getProductsBySlugs(homepageNewArrivalSlugs);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          title="New Arrivals"
          subtitle="Fresh finds for the season ahead."
          viewMoreLink="/new-arrivals"
        />
        <Carousel slidesToShow={4} className="mt-4 px-4 sm:px-8">
          {products.map((product) => (
            <div key={product.id} className="px-2 sm:px-3">
              <ProductCard product={product} />
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
