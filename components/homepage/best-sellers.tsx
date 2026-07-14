"use client";

import { homepageBestsellerSlugs } from "@/data/homepage";
import { getProductsBySlugs } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Carousel } from "@/components/ui/carousel";
import { ProductCard } from "@/components/product/product-card";

export function BestSellers() {
  const bestsellers = getProductsBySlugs(homepageBestsellerSlugs);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          title="Best Sellers"
          subtitle="Quiet favorites our community returns to season after season."
          viewMoreLink="/best-sellers"
        />
        <Carousel slidesToShow={4} className="mt-4 px-4 sm:px-8">
          {bestsellers.map((product) => (
            <div key={product.id} className="px-2 sm:px-3">
              <ProductCard product={product} />
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
