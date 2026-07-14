import Image from "next/image";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";

export function CustomerReviews() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          title="Customer Reviews"
          subtitle="Words from guests who shop with intention — verified purchases, thoughtful finds."
          centered
        />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex h-full flex-col border border-border bg-card p-7 transition-shadow hover:shadow-[0_8px_30px_rgba(36,50,61,0.06)]"
            >
              <div className="mb-5 flex items-center gap-3">
                <Image
                  src={`/reviews/review-${((Number(t.id) - 1) % 8) + 1}.jpg`}
                  alt={t.name}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-medium tracking-wide">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <StarRating rating={t.rating} showCount={false} size="sm" />
                <Badge variant="outline" className="border-secondary/50 text-[10px] text-foreground">
                  Verified Purchase
                </Badge>
              </div>
              <p className="flex-1 font-display text-lg leading-relaxed text-foreground/80">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
