"use client";

import { useState } from "react";
import type { MenuItem } from "@/config/site";
import { Photo } from "@/components/ui/Photo";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import {
  buildLine,
  defaultSelections,
  hasOptions,
  lineUnitPrice,
  selectionsToList,
  type SelectionMap,
} from "@/lib/cartHelpers";

const tagColor: Record<string, string> = {
  Signature: "bg-terracotta text-cream-50",
  Vegetarian: "bg-agave text-cream-50",
  Halal: "bg-blue text-cream-50",
  Spicy: "bg-chili text-cream-50",
  "21+": "bg-gold-deep text-cream-50",
};

export function DishCard({
  item,
  priority = false,
  showModifiers = true,
}: {
  item: MenuItem;
  priority?: boolean;
  /** Homepage teaser grids link through to /menu rather than hosting the full inline builder. */
  showModifiers?: boolean;
}) {
  const { addLine } = useCart();
  const withOptions = showModifiers && hasOptions(item);

  const [map, setMap] = useState<SelectionMap>(() => defaultSelections(item));
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  function toggle(groupId: string, optionId: string, single: boolean) {
    setMap((prev) => {
      const current = prev[groupId] ?? [];
      if (single) return { ...prev, [groupId]: [optionId] };
      return {
        ...prev,
        [groupId]: current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
  }

  const unit = lineUnitPrice(item, selectionsToList(item, map));
  const requiredMet = (item.options ?? []).every(
    (g) => !g.required || (map[g.id]?.length ?? 0) > 0,
  );

  function onAdd() {
    if (withOptions) {
      if (!requiredMet) return;
      addLine(buildLine(item, map, qty, note));
      // reset this card for the next add
      setMap(defaultSelections(item));
      setQty(1);
      setNote("");
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
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>

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

        {withOptions && (
          <div className="mt-4 flex-1 text-left">
            {(item.options ?? []).map((group) => {
              const single = (group.max ?? 1) === 1;
              return (
                <fieldset key={group.id} className="mt-4 first:mt-0">
                  <legend className="mb-2 flex items-baseline gap-2 text-xs font-bold uppercase tracking-wide text-blue">
                    {group.label}
                    {group.required && (
                      <span className="text-[0.65rem] font-medium text-terracotta">Required</span>
                    )}
                  </legend>
                  <div className="space-y-1.5">
                    {group.options.map((opt) => {
                      const checked = (map[group.id] ?? []).includes(opt.id);
                      return (
                        <label
                          key={opt.id}
                          className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-xs transition-colors ${
                            checked
                              ? "border-terracotta bg-terracotta/5"
                              : "border-cream-200 bg-cream hover:border-gold"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <input
                              type={single ? "radio" : "checkbox"}
                              name={`${item.id}-${group.id}`}
                              checked={checked}
                              onChange={() => toggle(group.id, opt.id, single)}
                              className="accent-terracotta"
                            />
                            <span className="font-medium text-ink">{opt.label}</span>
                          </span>
                          {opt.price ? (
                            <span className="text-ink-soft">+{formatPrice(opt.price)}</span>
                          ) : null}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              );
            })}

            <div className="mt-4">
              <label
                htmlFor={`${item.id}-note`}
                className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-blue"
              >
                Special requests
              </label>
              <textarea
                id={`${item.id}-note`}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="Extra toum, no cilantro, allergy notes…"
                className="w-full resize-none rounded-lg border border-cream-200 bg-cream px-3 py-2 text-xs outline-none focus:border-gold"
              />
            </div>
          </div>
        )}

        {withOptions ? (
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center rounded-full border border-cream-200 bg-cream">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-1.5 text-base leading-none text-blue hover:text-terracotta"
                aria-label="Decrease quantity"
              >
                –
              </button>
              <span className="min-w-6 text-center text-sm font-semibold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-1.5 text-base leading-none text-blue hover:text-terracotta"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={onAdd}
              disabled={!requiredMet}
              className="flex flex-1 items-center justify-between rounded-full bg-terracotta px-4 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-cream-50 transition-colors hover:bg-terracotta-700 disabled:opacity-50"
            >
              <span>Add</span>
              <span>{formatPrice(unit * qty)}</span>
            </button>
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onAdd}
              className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-bold uppercase tracking-[0.1em] text-cream-50 transition-colors hover:bg-terracotta-700"
            >
              Add
            </button>
            <span className="font-display text-xl text-blue">{formatPrice(item.price)}</span>
          </div>
        )}
      </div>
    </article>
  );
}
