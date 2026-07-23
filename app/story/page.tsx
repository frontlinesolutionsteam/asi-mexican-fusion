import type { Metadata } from "next";
import Image from "next/image";
import { site, story } from "@/config/site";
import { Photo } from "@/components/ui/Photo";
import { Divider } from "@/components/brand/Divider";
import { TileStrip } from "@/components/brand/TileStrip";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Así Mexican Fusion Bistro — the family behind the two-flag butterfly. Mexican tradition meets Middle Eastern heritage in one halal kitchen in San Jose.",
};

export default function StoryPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-blue text-cream-50">
        <div className="mx-auto max-w-6xl px-5 py-14 text-center sm:px-8 sm:py-16">
          <p className="eyebrow text-gold-soft">Our story</p>
          <h1 className="mt-4 font-display text-4xl uppercase leading-[1] sm:text-6xl">
            <span>{story.headline[0]}</span>{" "}
            <span className="text-terracotta">{story.headline[1]}</span>{" "}
            <span>{story.headline[2]}</span>
          </h1>
          <Divider className="mx-auto my-6" width="w-48" />
          <p className="mx-auto max-w-xl text-cream/85">{story.openedText}</p>
        </div>
        <TileStrip height={26} />
      </section>

      {/* Family */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <Photo
            src={site.images.team}
            alt="Lourdes Barraza and her daughters, the family behind Así"
            aspect="aspect-[4/5]"
            className="rounded-[var(--radius-card)] shadow-[var(--shadow-card)]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow text-terracotta">The family</p>
          <h2 className="mt-3 font-display text-3xl text-blue sm:text-4xl">
            Made by a mother and her daughters
          </h2>
          <Divider className="my-5" width="w-40" />
          <div className="space-y-4 text-lg leading-relaxed text-ink-soft">
            {story.body.map((p) => (
              <p key={p.slice(0, 16)}>{p}</p>
            ))}
          </div>
          <p className="mt-6 font-semibold text-blue">— {story.founders}</p>
        </Reveal>
      </section>

      {/* The butterfly concept */}
      <section className="relative bg-blue text-cream-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-14">
          <Reveal className="order-2 flex justify-center lg:order-1">
            <Image
              src={site.images.butterflyLockup}
              alt="The Así butterfly — one wing the flag of Mexico, one the flag of Jordan"
              width={403}
              height={462}
              className="w-full max-w-sm"
            />
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <p className="eyebrow text-gold-soft">One wing, one wing</p>
            <h2 className="mt-3 font-display text-3xl uppercase leading-tight sm:text-4xl">
              Two flags on one butterfly
            </h2>
            <Divider className="my-5" width="w-40" color="text-gold" />
            <p className="text-lg leading-relaxed text-cream/85">{story.butterfly}</p>
            <p className="mt-6 font-script text-2xl text-gold-soft">{story.scriptLine}</p>
          </Reveal>
        </div>
        <TileStrip height={26} />
      </section>

      {/* Values */}
      <section className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { t: "Halal", d: "Every dish, always. Our whole kitchen is halal." },
            { t: "Family-owned", d: "Run by Lourdes and her daughters, day in and day out." },
            { t: "Made with heart", d: "From our shawarma to our aguas frescas, from scratch." },
          ].map((v) => (
            <Reveal key={v.t}>
              <h3 className="font-display text-2xl text-terracotta">{v.t}</h3>
              <p className="mt-2 text-ink-soft">{v.d}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-12">
          <ButtonLink href="/menu" size="lg" variant="blue">
            Explore the menu
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
