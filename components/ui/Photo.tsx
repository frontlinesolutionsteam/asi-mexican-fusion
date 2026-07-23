"use client";

import Image from "next/image";
import { useState } from "react";
import { ButterflyEmblem } from "@/components/brand/ButterflyEmblem";

/**
 * Photographic slot. Renders an optimized next/image when the file exists.
 * Until you drop a real photo at `src`, it shows a warm, on-brand placeholder
 * with a visible "swap me" marker — so the layout always looks intentional and
 * you can see exactly where each real Yelp / Instagram photo goes.
 *
 * To add a real photo: save it at the path shown on the placeholder marker
 * (e.g. /public/images/menu/beef-shawarma-tostaditas.jpg). The marker vanishes.
 */
export function Photo({
  src,
  alt,
  aspect = "aspect-[4/3]",
  className = "",
  imgClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  fit = "cover",
  emblem = true,
}: {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  emblem?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden ${aspect} ${className}`}>
      {/* Warm branded placeholder — always the base layer */}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-cream-100 via-cream to-cream-200 text-ink/70">
          {emblem && (
            <ButterflyEmblem
              className="h-16 w-16 opacity-40"
              variant="mono"
              color="#9c7526"
            />
          )}
          <span className="rounded-full border border-dashed border-gold-deep/50 bg-cream-50/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-gold-deep">
            Add photo · {src.replace("/images/", "")}
          </span>
        </div>
      )}

      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={`${fit === "cover" ? "object-cover" : "object-contain"} ${imgClassName}`}
        />
      )}
    </div>
  );
}
