import { menu, signatureDishIds } from "@/config/site";
import { Section, SectionHeader } from "@/components/ui/Section";
import { DishCard } from "@/components/menu/DishCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** The signature dishes grid (mockup: asi-menu-grid). */
export function SignatureGrid() {
  const dishes = signatureDishIds
    .map((id) => menu.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <Section tone="cream" id="signature">
      <SectionHeader
        eyebrow="Bold flavors · Two cultures · One table"
        title="The Fusion Menu"
        subtitle="A taste of home, from both sides of the family."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dishes.map((item, i) => (
          <Reveal key={item.id} delay={(i % 3) * 0.08}>
            <DishCard item={item} showModifiers={false} />
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <ButtonLink href="/menu" size="lg" variant="blue">
          View Full Menu &amp; Order
        </ButtonLink>
      </div>
    </Section>
  );
}
