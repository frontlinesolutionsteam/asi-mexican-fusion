"use client";

import { useEffect, useState } from "react";
import { getOpenState } from "@/lib/format";

export function OpenBadge({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  // Compute after mount so it reflects the visitor's local time (avoids SSR mismatch)
  const [state, setState] = useState<{ isOpen: boolean; label: string } | null>(null);

  useEffect(() => {
    const update = () => {
      const s = getOpenState();
      setState({ isOpen: s.isOpen, label: s.label });
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!state) {
    // Reserve space; avoids layout shift
    return <span className={`inline-flex h-8 ${className}`} aria-hidden="true" />;
  }

  const base =
    tone === "light"
      ? "bg-cream-50/15 text-cream-50 ring-cream-50/25"
      : "bg-white text-ink ring-cream-200";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ring-1 ${base} ${className}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${state.isOpen ? "bg-agave-soft" : "bg-terracotta"}`}
        style={state.isOpen ? { boxShadow: "0 0 0 3px rgba(125,148,100,0.35)" } : undefined}
      />
      {state.label}
    </span>
  );
}
