"use client";

import { useState } from "react";
import type { MenuItem } from "@/config/site";
import { Photo } from "@/components/ui/Photo";
import { ItemModal } from "./ItemModal";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import { buildLine, defaultSelections, hasOptions } from "@/lib/cartHelpers";

const tagColor: Record<string, string> = {
  Signature: "bg-terracotta text-cream-50",
  Vegetarian: "bg-agave text-cream-50",
  Halal: "bg-blue text-cream-50",
  Spicy: "bg-chili text-cream-50",
  "21+": "bg-gold-deep text-cream-50",
};

export function DishCard({ item, priority = false }: { item: MenuItem; priority?: boolean }) {
  const { addLine } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const withOptions = hasOptions(item);

  function onAdd() {
    if (withOptions) {
      setModalOpen(true);
    } else {
      addLine(buildLine(item, defaultSelections(item), 1));
    }
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-cream-50 shadow-[var(--shadow-card)] ring-1 ring-cream-200/70 transition-transform duration-300 hover:-translate-y-1">
      <div className="relative">
        <Photo
          src={item.image}
          alt={item.name}
          aspect="aspect-[4/3]"
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        {item.tags && item.tags.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {item.tags
              .filter((t) => t === "Signature")
              .map((t) => (
                <span
                  key={t}
                  className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider ${tagColor[t] ?? "bg-blue text-cream-50"}`}
                >
                  {t}
                </span>
              ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4 text-center">
        <h3 className="font-display text-xl leading-tight text-terracotta">{item.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{item.description}</p>

        {item.tags && (
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {item.tags
              .filter((t) => t !== "Signature")
              .map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-cream-100 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-ink-soft"
                >
                  {t}
                </span>
              ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            onClick={onAdd}
            className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-bold uppercase tracking-[0.1em] text-cream-50 transition-colors hover:bg-terracotta-700"
          >
            Add
          </button>
          <span className="font-display text-xl text-blue">{formatPrice(item.price)}</span>
        </div>
      </div>

      {withOptions && (
        <ItemModal item={item} open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </article>
  );
}
