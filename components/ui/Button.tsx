import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "blue";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Terracotta pill — the main CTA in the mockups
  primary:
    "bg-terracotta text-cream-50 shadow-soft hover:bg-terracotta-700 hover:-translate-y-0.5 active:translate-y-0",
  blue: "bg-blue text-cream-50 shadow-soft hover:bg-blue-ink hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border-2 border-cream-50/80 text-cream-50 hover:bg-cream-50 hover:text-blue",
  ghost: "text-blue hover:bg-blue/10",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-8 py-4 text-base uppercase tracking-[0.12em]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href">) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
