import { HeroBanner } from "@/components/homepage/hero-banner";
import { FeaturedCollections } from "@/components/homepage/featured-collections";
import { SplitLifestyleSection } from "@/components/homepage/split-lifestyle-section";
import { BestSellers } from "@/components/homepage/best-sellers";
import { CategoryCarousel } from "@/components/homepage/category-carousel";
import { EditorialBanner } from "@/components/homepage/editorial-banner";
import { NewArrivals } from "@/components/homepage/new-arrivals";
import { CustomerReviews } from "@/components/homepage/customer-reviews";
import { Newsletter } from "@/components/homepage/newsletter";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <FeaturedCollections />
      <SplitLifestyleSection />
      <BestSellers />
      <CategoryCarousel />
      <EditorialBanner />
      <NewArrivals />
      <CustomerReviews />
      <Newsletter />
    </>
  );
}
