import type { ReactNode } from "react";
import { Divider } from "@/components/brand/Divider";

type Tone = "cream" | "blue" | "cream-50";

const toneClass: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  "cream-50": "bg-cream-50 text-ink",
  blue: "bg-blue text-cream-50",
};

/**
 * Standard section wrapper with consistent vertical rhythm and an optional
 * centered header (eyebrow + brass divider + display heading + subhead).
 */
export function Section({
  children,
  tone = "cream",
  id,
  className = "",
  containerClassName = "",
}: {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={`${toneClass[tone]} py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  tone = "dark",
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  tone?: "dark" | "light";
  align?: "center" | "left";
}) {
  const headingColor = tone === "light" ? "text-cream-50" : "text-blue";
  const subColor = tone === "light" ? "text-cream/80" : "text-ink-soft";
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>
      {eyebrow && <p className="eyebrow text-terracotta mb-4">{eyebrow}</p>}
      <h2 className={`font-display text-4xl sm:text-5xl lg:text-[3.4rem] ${headingColor}`}>
        {title}
      </h2>
      <Divider className={`my-6 ${align === "center" ? "" : "self-start"}`} width="w-40" />
      {subtitle && (
        <p className={`text-lg leading-relaxed ${subColor} font-script text-2xl`}>{subtitle}</p>
      )}
    </div>
  );
}
