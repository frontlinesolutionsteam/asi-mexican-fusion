import type { Metadata } from "next";
import { menu, menuCategories } from "@/config/site";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { DishCard } from "@/components/menu/DishCard";
import { Divider } from "@/components/brand/Divider";
import { TileStrip } from "@/components/brand/TileStrip";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Menu & Order",
  description:
    "Order online for pickup — halal Mexican–Middle Eastern fusion. Tostaditas, kebab plates, burritos, shawarma fries, hummus, micheladas and more.",
};

// Only show categories that actually have items
const populated = menuCategories.filter((c) => menu.some((m) => m.categoryId === c.id));

export default function MenuPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-blue text-cream-50">
        <div className="mx-auto max-w-6xl px-5 py-14 text-center sm:px-8 sm:py-16">
          <p className="eyebrow text-gold-soft">Bold flavors · Two cultures · One table</p>
          <h1 className="mt-4 font-display text-5xl uppercase leading-none sm:text-6xl">
            The Fusion Menu
          </h1>
          <Divider className="mx-auto my-6" width="w-48" />
          <p className="mx-auto max-w-xl text-cream/85">
            Everything is halal, made from scratch, and built for sharing. Add what you love —
            your cart is up in the corner, ready for pickup.
          </p>
        </div>
        <TileStrip height={26} tone="blue" />
      </section>

      <CategoryNav categories={populated} />

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {populated.map((cat, catIndex) => {
          const items = menu.filter((m) => m.categoryId === cat.id);
          return (
            <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-40 pb-14 last:pb-0">
              <div className="mb-8 flex flex-col items-center text-center">
                <h2 className="font-display text-3xl text-blue sm:text-4xl">{cat.name}</h2>
                <p className="mt-2 text-ink-soft">{cat.blurb}</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, i) => (
                  <Reveal key={item.id} delay={(i % 3) * 0.06}>
                    <DishCard item={item} priority={catIndex === 0 && i === 0} />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
