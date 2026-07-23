"use client";

import { useEffect, useRef, useState } from "react";
import type { MenuCategory } from "@/config/site";

/** Sticky category pills with scroll-spy, sitting under the main nav. */
export function CategoryNav({ categories }: { categories: MenuCategory[] }) {
  const [active, setActive] = useState(categories[0]?.id);
  // While a click-triggered smooth scroll is in flight, the section it passes
  // through would otherwise each register as "intersecting" for a frame,
  // flashing the active pill across every tab in between before landing on
  // the target. Suppress scroll-spy updates until that scroll settles.
  const scrollingToId = useRef<string | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(`cat-${c.id}`))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingToId.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id.replace("cat-", ""));
      },
      { rootMargin: "-160px 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    function onScroll() {
      if (!scrollingToId.current) return;
      if (idleTimer.current) clearTimeout(idleTimer.current);
      // Scroll position has stopped changing — the programmatic scroll (or
      // whatever momentum followed it) has settled, so scroll-spy can safely
      // take back over.
      idleTimer.current = setTimeout(() => {
        scrollingToId.current = null;
      }, 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  function go(id: string) {
    const el = document.getElementById(`cat-${id}`);
    if (!el) return;
    scrollingToId.current = id;
    setActive(id);
    const y = el.getBoundingClientRect().top + window.scrollY - 132;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  return (
    <div className="sticky top-[4.5rem] z-40 border-b border-cream-200 bg-cream-50 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => go(c.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.08em] transition-colors ${
              active === c.id
                ? "bg-blue text-cream-50"
                : "bg-cream-100 text-blue hover:bg-cream-200"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
