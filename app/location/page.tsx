import type { Metadata } from "next";
import { site } from "@/config/site";
import { Divider } from "@/components/brand/Divider";
import { TileStrip } from "@/components/brand/TileStrip";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { hoursLabel } from "@/lib/format";
import { getOpenState } from "@/lib/format";

export const metadata: Metadata = {
  title: "Location & Hours",
  description: `Visit Así Mexican Fusion Bistro at ${site.contact.address.street}, ${site.contact.address.city}, ${site.contact.address.state}. Hours, map, phone, and parking.`,
};

export default function LocationPage() {
  const { contact, hours } = site;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=15&output=embed`;
  const dirHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.mapQuery)}`;
  const todayShort = getOpenState().today.short;

  return (
    <>
      <section className="bg-blue text-cream-50">
        <div className="mx-auto max-w-6xl px-5 py-14 text-center sm:px-8 sm:py-16">
          <p className="eyebrow text-gold-soft">Come find us</p>
          <h1 className="mt-4 font-display text-5xl uppercase leading-none sm:text-6xl">
            Visit Así
          </h1>
          <Divider className="mx-auto my-6" width="w-48" />
          <p className="text-cream/85">In the heart of South San Jose · halal · family-owned</p>
        </div>
        <TileStrip height={26} />
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-14">
        {/* Info */}
        <div>
          <h2 className="font-display text-3xl text-blue">Address & hours</h2>
          <Divider className="my-5" width="w-40" />

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-terracotta">Address</h3>
              <address className="mt-1 not-italic text-lg text-ink">
                {contact.address.street}
                <br />
                {contact.address.city}, {contact.address.state} {contact.address.zip}
              </address>
              <a
                href={dirHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-semibold text-blue underline hover:text-terracotta"
              >
                Get directions →
              </a>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-terracotta">Phone</h3>
              <a href={contact.phoneHref} className="mt-1 block text-lg text-ink hover:text-terracotta">
                {contact.phone}
              </a>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-bold uppercase tracking-widest text-terracotta">Hours</h3>
                <OpenBadge tone="dark" />
              </div>
              <dl className="mt-2 max-w-xs space-y-1">
                {hours.map((h) => (
                  <div
                    key={h.day}
                    className={`flex justify-between border-b border-cream-200 py-1.5 ${
                      h.short === todayShort ? "font-bold text-blue" : "text-ink-soft"
                    }`}
                  >
                    <dt>{h.day}</dt>
                    <dd className={h.closed ? "text-terracotta" : ""}>{hoursLabel(h)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-terracotta">Parking</h3>
              <p className="mt-1 text-ink-soft">{contact.parkingNote}</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-cream-200 shadow-[var(--shadow-card)]">
          <iframe
            title={`Map to ${site.name}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[24rem] w-full"
          />
        </div>
      </div>
    </>
  );
}
