"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { MenuItem } from "@/config/site";
import { useCart } from "@/components/cart/CartProvider";
import { Photo } from "@/components/ui/Photo";
import { formatPrice } from "@/lib/format";
import {
  buildLine,
  defaultSelections,
  lineUnitPrice,
  selectionsToList,
  type SelectionMap,
} from "@/lib/cartHelpers";

export function ItemModal({
  item,
  open,
  onClose,
}: {
  item: MenuItem;
  open: boolean;
  onClose: () => void;
}) {
  const { addLine } = useCart();
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

  function add() {
    addLine(buildLine(item, map, qty, note));
    onClose();
    // reset for next open
    setMap(defaultSelections(item));
    setQty(1);
    setNote("");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] isolate flex items-end justify-center sm:items-center"
          initial="closed"
          animate="open"
          exit="closed"
        >
          <motion.button
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 [transform:translateZ(0)] bg-blue-ink/55 backdrop-blur-[2px] [will-change:opacity]"
            variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
          />
          <motion.div
            role="dialog"
            aria-label={item.name}
            className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-cream-50 shadow-2xl sm:rounded-3xl"
            variants={{
              open: { y: 0, opacity: 1 },
              closed: { y: 40, opacity: 0 },
            }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
          >
            <div className="relative">
              <Photo
                src={item.image}
                alt={item.name}
                aspect="aspect-[16/9]"
                sizes="(max-width: 640px) 100vw, 512px"
              />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/90 text-blue shadow hover:bg-cream-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <h2 className="font-display text-2xl text-blue">{item.name}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.description}</p>

              {(item.options ?? []).map((group) => {
                const single = (group.max ?? 1) === 1;
                return (
                  <fieldset key={group.id} className="mt-5">
                    <legend className="mb-2 flex items-baseline gap-2 text-sm font-bold uppercase tracking-wide text-blue">
                      {group.label}
                      {group.required && <span className="text-xs font-medium text-terracotta">Required</span>}
                    </legend>
                    <div className="space-y-2">
                      {group.options.map((opt) => {
                        const checked = (map[group.id] ?? []).includes(opt.id);
                        return (
                          <label
                            key={opt.id}
                            className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors ${
                              checked
                                ? "border-terracotta bg-terracotta/5"
                                : "border-cream-200 bg-cream hover:border-gold"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <input
                                type={single ? "radio" : "checkbox"}
                                name={group.id}
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

              <div className="mt-5">
                <label htmlFor="item-note" className="mb-2 block text-sm font-bold uppercase tracking-wide text-blue">
                  Special requests
                </label>
                <textarea
                  id="item-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder="Extra toum, no cilantro, allergy notes…"
                  className="w-full resize-none rounded-xl border border-cream-200 bg-cream px-4 py-3 text-sm outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-cream-200 px-5 py-4">
              <div className="flex items-center rounded-full border border-cream-200 bg-cream">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-lg leading-none text-blue hover:text-terracotta"
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <span className="min-w-6 text-center font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-2 text-lg leading-none text-blue hover:text-terracotta"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                onClick={add}
                disabled={!requiredMet}
                className="flex flex-1 items-center justify-between rounded-full bg-terracotta px-6 py-3.5 font-semibold uppercase tracking-[0.1em] text-cream-50 hover:bg-terracotta-700 disabled:opacity-50"
              >
                <span>Add to order</span>
                <span>{formatPrice(unit * qty)}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
