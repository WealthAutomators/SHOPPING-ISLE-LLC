import { Category } from "@/types";
import { products } from "@/data/products";

function countFor(slug: string) {
  return products.filter((p) => p.categorySlug === slug).length;
}

export const categories: Category[] = [
  {
    id: "1",
    slug: "electronics",
    name: "Electronics",
    image: "/categories/electronics.jpg",
    description: "Refined audio and everyday tech for a quieter, smarter home.",
    productCount: countFor("electronics"),
  },
  {
    id: "2",
    slug: "home-kitchen",
    name: "Home & Kitchen",
    image: "/categories/home-kitchen.jpg",
    description: "Beautiful tools and textiles for calm, intentional interiors.",
    productCount: countFor("home-kitchen"),
  },
  {
    id: "3",
    slug: "bathroom",
    name: "Bathroom",
    image: "/categories/bathroom.jpg",
    description: "Spa-soft towels, mats, and rituals for restorative mornings.",
    productCount: countFor("bathroom"),
  },
  {
    id: "4",
    slug: "educational-toys",
    name: "Educational Toys",
    image: "/categories/educational-toys.jpg",
    description: "Thoughtful play that sparks curiosity and creative discovery.",
    productCount: countFor("educational-toys"),
  },
  {
    id: "5",
    slug: "pet-supplies",
    name: "Pet Supplies",
    image: "/categories/pet-supplies.jpg",
    description: "Comfort-first pieces for the companions who share your home.",
    productCount: countFor("pet-supplies"),
  },
  {
    id: "6",
    slug: "beauty",
    name: "Beauty",
    image: "/categories/beauty.jpg",
    description: "Quiet self-care essentials with a resort-spa sensibility.",
    productCount: countFor("beauty"),
  },
  {
    id: "7",
    slug: "sports-outdoors",
    name: "Sports",
    image: "/categories/sports-outdoors.jpg",
    description: "Outdoor comfort and movement for terraces, gardens, and travel.",
    productCount: countFor("sports-outdoors"),
  },
  {
    id: "8",
    slug: "office-supplies",
    name: "Office",
    image: "/categories/office-supplies.jpg",
    description: "Warm, composed desk pieces for focused daily work.",
    productCount: countFor("office-supplies"),
  },
  {
    id: "9",
    slug: "fashion-accessories",
    name: "Fashion",
    image: "/categories/fashion-accessories.jpg",
    description: "Light layers and finishing details for coastal everyday style.",
    productCount: countFor("fashion-accessories"),
  },
  {
    id: "10",
    slug: "baby-products",
    name: "Baby",
    image: "/categories/baby-products.jpg",
    description: "Gentle essentials chosen with care for little ones.",
    productCount: countFor("baby-products"),
  },
  {
    id: "11",
    slug: "toys-games",
    name: "Toys & Games",
    image: "/categories/toys-games.jpg",
    description: "Playful pieces for family evenings and imaginative days.",
    productCount: countFor("toys-games"),
  },
  {
    id: "12",
    slug: "health-wellness",
    name: "Health & Wellness",
    image: "/categories/health-wellness.jpg",
    description: "Supportive tools for recovery, balance, and daily wellbeing.",
    productCount: countFor("health-wellness"),
  },
  {
    id: "13",
    slug: "gaming",
    name: "Gaming",
    image: "/categories/gaming.jpg",
    description: "Comfort-forward gear for immersive evenings at home.",
    productCount: countFor("gaming"),
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
