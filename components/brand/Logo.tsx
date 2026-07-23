import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site";

/**
 * Brand lockup: the real two-flag butterfly artwork + the gold
 * "ASÍ · MEXICAN FUSION BISTRO" wordmark (Cinzel), matching the mockups.
 *
 * layout="stacked"     — butterfly over ASÍ, centered (nav & hero heading)
 * layout="horizontal"  — butterfly beside ASÍ (footer, compact spots)
 */
export function Logo({
  layout = "horizontal",
  emblemClassName,
  asiClassName,
  tone = "gold",
  href = "/",
  className = "",
}: {
  layout?: "stacked" | "horizontal";
  emblemClassName?: string;
  asiClassName?: string;
  tone?: "gold" | "cream" | "blue";
  href?: string | null;
  className?: string;
}) {
  const asiColor =
    tone === "cream" ? "text-cream-50" : tone === "blue" ? "text-blue" : "text-gold";
  const subColor =
    tone === "cream" ? "text-cream-50/70" : tone === "blue" ? "text-blue/70" : "text-gold/80";

  const stacked = layout === "stacked";
  const size = emblemClassName ?? (stacked ? "h-11 w-16" : "h-9 w-14");

  const inner = (
    <span
      className={`flex ${stacked ? "flex-col items-center gap-0.5" : "flex-row items-center gap-2.5"} ${className}`}
    >
      <Image
        src={site.images.butterflyMark}
        alt=""
        width={373}
        height={250}
        className={`${size} object-contain`}
        priority
      />
      <span className={`flex flex-col leading-none ${stacked ? "items-center" : ""}`}>
        <span className={`font-logo font-bold ${asiColor} ${asiClassName ?? "text-2xl"}`}>ASÍ</span>
        <span
          className={`font-semibold uppercase ${subColor} ${
            stacked ? "mt-1 text-[0.55rem] tracking-[0.34em]" : "text-[0.55rem] tracking-[0.22em]"
          }`}
        >
          Mexican Fusion Bistro
        </span>
      </span>
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} aria-label={`${site.name} — home`} className="inline-flex">
      {inner}
    </Link>
  );
}
