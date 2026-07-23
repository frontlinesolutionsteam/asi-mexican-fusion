import type { Metadata } from "next";
import { catering } from "@/config/site";
import { Divider } from "@/components/brand/Divider";
import { TileStrip } from "@/components/brand/TileStrip";
import { CateringForm } from "@/components/catering/CateringForm";
import { formatPrice } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Catering",
  description: catering.blurb,
};

export default function CateringPage() {
  return (
    <>
      <section className="bg-blue text-cream-50">
        <div className="mx-auto max-w-6xl px-5 py-14 text-center sm:px-8 sm:py-16">
          <p className="eyebrow text-gold-soft">Feed the whole table</p>
          <h1 className="mt-4 font-display text-5xl uppercase leading-none sm:text-6xl">
            {catering.headline}
          </h1>
          <Divider className="mx-auto my-6" width="w-48" />
          <p className="mx-auto max-w-2xl text-cream/85">{catering.blurb}</p>
        </div>
        <TileStrip height={26} />
      </section>

      {/* Packages */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {catering.packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-cream-200 bg-cream-50 p-7 shadow-[var(--shadow-soft)]">
                <h3 className="font-display text-2xl text-terracotta">{pkg.name}</h3>
                <p className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-3xl text-blue">
                    {pkg.price ? formatPrice(pkg.price) : "Ask"}
                  </span>
                  <span className="text-sm text-ink-soft">/ {pkg.per}</span>
                </p>
                <Divider className="my-4" width="w-24" />
                <p className="text-ink-soft">{pkg.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Inquiry form */}
      <section className="bg-cream-50/60">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <CateringForm />
        </div>
      </section>
    </>
  );
}
