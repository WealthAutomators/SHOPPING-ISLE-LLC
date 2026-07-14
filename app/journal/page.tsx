import { company } from "@/data/company";
import { PageHero, PageSection } from "@/components/ui/page-layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Journal",
  description: `Stories, seasonal edits, and quiet inspiration from ${company.name}.`,
};

const journalNotes = [
  {
    title: "The Art of Soft Living",
    excerpt:
      "How washed linens, warm brass, and open windows transform everyday rooms into places you want to linger.",
  },
  {
    title: "Outdoor Evenings, Elevated",
    excerpt:
      "Lantern light, lounge textiles, and the small details that make a patio feel like a private resort.",
  },
  {
    title: "Beauty Rituals That Feel Like Home",
    excerpt:
      "Ceramic diffusers, silk pillowcases, and skincare essentials chosen for calm rather than clutter.",
  },
];

export default function JournalPage() {
  return (
    <>
      <PageHero
        title="Journal"
        description="Seasonal stories and carefully composed notes for living with intention."
        breadcrumbs={[{ label: "Journal" }]}
      />
      <Container className="pb-20">
        <div className="mx-auto max-w-3xl space-y-12 py-12">
          {journalNotes.map((note) => (
            <PageSection key={note.title} title={note.title}>
              <p className="text-muted-foreground leading-relaxed">{note.excerpt}</p>
            </PageSection>
          ))}
          <div className="pt-4 text-center">
            <Button asChild size="lg">
              <Link href="/shop">Shop the Edit</Link>
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
