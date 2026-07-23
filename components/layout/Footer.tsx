import Link from "next/link";
import Image from "next/image";
import { site, story } from "@/config/site";
import { Logo } from "@/components/brand/Logo";
import { TileStrip } from "@/components/brand/TileStrip";
import { hoursLabel } from "@/lib/format";

const nav = [
  { href: "/menu", label: "Menu & Order" },
  { href: "/story", label: "Our Story" },
  { href: "/catering", label: "Catering" },
  { href: "/location", label: "Location & Hours" },
];

export function Footer() {
  const { contact, hours } = site;
  return (
    <footer className="relative bg-blue text-cream-50">
      <TileStrip tone="blue" height={40} />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <Logo emblemClassName="h-12 w-12" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/75">
            {site.tagline}. Family-owned, halal Mexican–Middle Eastern fusion in the heart of
            San Jose.
          </p>
          <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gold">
            <span>Mexican</span>
            <span className="text-gold/40">◆</span>
            <span>Middle Eastern</span>
            <span className="text-gold/40">◆</span>
            <span>Halal</span>
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Footer">
          <h3 className="font-display text-lg text-gold">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/85">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Visit */}
        <div>
          <h3 className="font-display text-lg text-gold">Visit</h3>
          <address className="mt-4 space-y-1 text-sm not-italic text-cream/85">
            <p>{contact.address.street}</p>
            <p>
              {contact.address.city}, {contact.address.state} {contact.address.zip}
            </p>
            <p>
              <a href={contact.phoneHref} className="hover:text-gold">
                {contact.phone}
              </a>
            </p>
          </address>
          <dl className="mt-4 space-y-0.5 text-xs text-cream/70">
            {hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-4">
                <dt>{h.short}</dt>
                <dd className={h.closed ? "text-cream/40" : ""}>{hoursLabel(h)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-cream-50/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-cream/60 sm:flex-row sm:px-8">
          <div className="flex items-center gap-2">
            <Image src={site.images.butterflyMark} alt="" width={373} height={250} className="h-5 w-8 object-contain" />
            <span>
              © {new Date().getFullYear()} {site.name}. Made with heart in San Jose.
            </span>
          </div>
          <p className="font-script text-lg text-gold-soft">{story.scriptLine}</p>
        </div>
      </div>
    </footer>
  );
}
