"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Our Story" },
  { href: "/catering", label: "Catering" },
  { href: "/location", label: "Location" },
];

export function Nav() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b bg-blue text-cream-50 transition-shadow ${
          scrolled
            ? "border-gold/30 shadow-[0_6px_24px_-16px_rgba(0,0,0,0.7)]"
            : "border-gold/15"
        }`}
      >
        <div className="mx-auto grid h-[4.5rem] w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 sm:px-8">
          {/* Left — links (desktop) / hamburger (mobile) */}
          <nav className="hidden items-center gap-4 lg:flex xl:gap-5" aria-label="Primary">
            {links.map((link, i) => {
              const active = pathname === link.href;
              return (
                <span key={link.href} className="flex items-center gap-4 xl:gap-5">
                  <Link
                    href={link.href}
                    className={`whitespace-nowrap text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-gold ${
                      active ? "text-gold" : "text-cream-50/90"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {i < links.length - 1 && <span className="text-gold/50">◆</span>}
                </span>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="justify-self-start rounded-full p-2.5 text-cream-50 transition-colors hover:bg-cream-50/10 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Center — brand lockup */}
          <Logo layout="stacked" asiClassName="text-[1.7rem] sm:text-3xl" />

          {/* Right — cart + Order Online */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openCart}
              className="relative rounded-full p-2.5 text-cream-50 transition-colors hover:bg-cream-50/10"
              aria-label={`Open cart${count ? `, ${count} ${count === 1 ? "item" : "items"}` : ""}`}
            >
              <BagIcon />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-[0.7rem] font-bold text-cream-50">
                  {count}
                </span>
              )}
            </button>

            <Link
              href="/menu"
              className="hidden items-center gap-2 rounded-full border-2 border-terracotta bg-terracotta/0 px-5 py-2.5 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-cream-50 transition-colors hover:bg-terracotta sm:inline-flex"
            >
              Order Online
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-gold/20 bg-blue-ink lg:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3" aria-label="Mobile">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-cream-50/10 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-cream-50/90 last:border-0 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/menu"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-cream-50 hover:bg-terracotta-700"
              >
                Order Online
              </Link>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
}

function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
