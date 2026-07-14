import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { PageHero } from "@/components/ui/page-layout";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Shop by Category",
  description:
    "Browse every department at SHOPPING ISLE LLC — home & kitchen, beauty, fashion, outdoors, electronics, and more.",
};

export default function CategoriesPage() {
  return (
    <>
      <PageHero
        title="Shop by Category"
        description="Explore our full range of categories and find exactly what you're looking for across the store."
        breadcrumbs={[{ label: "Categories" }]}
      />

      <Container className="py-10 md:py-14">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/25 to-transparent transition-opacity duration-300 group-hover:from-primary/90" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h2 className="text-base font-semibold text-white drop-shadow md:text-lg">
                    {category.name}
                  </h2>
                  <p className="mt-0.5 line-clamp-1 text-xs text-white/85">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
