import Image from "next/image";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-blue">
      {/* Food-spread background (cropped text-free from the brand mockup).
          ⟶ Swap /public/images/hero-food.jpg for a real wide food photo anytime. */}
      <Image
        src={site.images.hero}
        alt="A spread of Así dishes — chicken kebabs, beef shawarma tostada, michelada, and burrito on blue talavera plates"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-right"
      />
      {/* Legibility scrim — deep on the left where the copy sits, clear on the right */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-ink/95 via-blue-ink/70 to-blue-ink/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-blue-ink/70 via-transparent to-blue-ink/20" />

      <div className="mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-6xl flex-col justify-center px-5 py-20 sm:px-8">
        <div className="max-w-2xl">
          <Reveal immediate>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="eyebrow text-gold-soft">Mexican · Middle Eastern · Halal</span>
              <OpenBadge />
            </div>
          </Reveal>

          <Reveal immediate delay={0.08}>
            <h1 className="font-display text-[2.9rem] uppercase leading-[0.95] text-cream-50 sm:text-6xl lg:text-[4.6rem]">
              {site.heroHeadline}
            </h1>
          </Reveal>

          <Reveal immediate delay={0.16}>
            <p className="mt-5 max-w-lg text-lg font-semibold text-cream sm:text-xl">
              {site.heroSubtitle}
            </p>
          </Reveal>

          <Reveal immediate delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href="/menu" size="lg">
                Order Online
              </ButtonLink>
              <ButtonLink href="/menu" size="lg" variant="outline">
                See the Menu
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal immediate delay={0.32}>
          <p className="mt-8 text-sm text-cream/80">
            <a
              href={site.contact.phoneHref}
              className="font-semibold text-cream hover:text-gold"
            >
              {site.contact.phone}
            </a>

            <span className="mx-2 text-gold/60">◆</span>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=6239+Santa+Teresa+Blvd+San+Jose+CA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              {site.contact.address.street}, {site.contact.address.city}
            </a>
          </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
