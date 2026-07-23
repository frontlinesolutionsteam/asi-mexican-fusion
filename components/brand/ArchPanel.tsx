import type { ReactNode } from "react";
import { TileStrip } from "./TileStrip";

/**
 * Cream arched panel with a gold hairline, brass flourish, and a talavera
 * tile band along the bottom — the framed text card used across the mockups
 * ("Come Sit With Us", "Two Flags. One Family.").
 */
export function ArchPanel({
  children,
  className = "",
  tile = true,
}: {
  children: ReactNode;
  className?: string;
  tile?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-t-[3rem] rounded-b-2xl border border-gold/50 bg-cream-50 shadow-[var(--shadow-card)] ${className}`}
    >
      {/* Brass flourish at the apex */}
      <div className="flex justify-center pt-7">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2l2.4 5.1L20 9.6l-5.6 2.5L12 17l-2.4-4.9L4 9.6l5.6-2.5z"
            fill="#c0963c"
          />
          <circle cx="12" cy="20.5" r="1.6" fill="#c0963c" />
        </svg>
      </div>

      <div className="px-7 pb-10 pt-4 sm:px-10">{children}</div>

      {tile && <TileStrip height={28} className="absolute inset-x-0 bottom-0" />}
      {tile && <div className="h-7" />}
    </div>
  );
}
