"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";
import { Photo } from "@/components/ui/Photo";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { isOpen, closeCart, lines, setQty, removeLine, subtotal, tax, totalBeforeTip, count } =
    useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial="closed"
          animate="open"
          exit="closed"
        >
          <motion.button
            aria-label="Close cart"
            onClick={closeCart}
            className="absolute inset-0 bg-blue-ink/50 backdrop-blur-[2px]"
            variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream-50 shadow-2xl"
            role="dialog"
            aria-label="Your order"
            variants={{ open: { x: 0 }, closed: { x: "100%" } }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
          >
            <header className="flex items-center justify-between border-b border-cream-200 bg-blue px-5 py-4 text-cream-50">
              <div>
                <h2 className="font-display text-2xl">Your Order</h2>
                <p className="text-xs uppercase tracking-[0.18em] text-gold">
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="rounded-full p-2 hover:bg-cream-50/10"
                aria-label="Close"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center text-ink-soft">
                <p className="font-display text-2xl text-blue">Your cart is empty</p>
                <p className="text-sm">Add something delicious from the menu to get started.</p>
                <Link
                  href="/menu"
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream-50 hover:bg-terracotta-700"
                >
                  Browse the menu
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-cream-200 overflow-y-auto px-5">
                  {lines.map((line) => (
                    <li key={line.lineId} className="flex gap-3 py-4">
                      <Photo
                        src={line.image}
                        alt={line.name}
                        aspect="aspect-square"
                        className="h-20 w-20 flex-none rounded-xl"
                        emblem={false}
                        sizes="80px"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold leading-tight text-blue">{line.name}</p>
                          <button
                            onClick={() => removeLine(line.lineId)}
                            className="text-xs font-medium text-ink-soft underline hover:text-terracotta"
                          >
                            Remove
                          </button>
                        </div>
                        {line.selections.length > 0 && (
                          <p className="mt-0.5 text-xs text-ink-soft">
                            {line.selections.map((s) => s.label).join(", ")}
                          </p>
                        )}
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-full border border-cream-200 bg-cream">
                            <button
                              onClick={() => setQty(line.lineId, line.quantity - 1)}
                              className="px-3 py-1 text-lg leading-none text-blue hover:text-terracotta"
                              aria-label="Decrease quantity"
                            >
                              –
                            </button>
                            <span className="min-w-6 text-center text-sm font-semibold">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() => setQty(line.lineId, line.quantity + 1)}
                              className="px-3 py-1 text-lg leading-none text-blue hover:text-terracotta"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-semibold text-blue">
                            {formatPrice(line.unitPrice * line.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-cream-200 px-5 py-4">
                  <dl className="space-y-1 text-sm text-ink-soft">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>{formatPrice(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Estimated tax</dt>
                      <dd>{formatPrice(tax)}</dd>
                    </div>
                    <div className="flex justify-between pt-1 text-base font-bold text-blue">
                      <dt>Total</dt>
                      <dd>{formatPrice(totalBeforeTip)}</dd>
                    </div>
                  </dl>
                  <p className="mt-1 text-xs text-ink-soft">Tip added at checkout.</p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="mt-4 flex w-full items-center justify-center rounded-full bg-terracotta px-6 py-3.5 font-semibold uppercase tracking-[0.12em] text-cream-50 hover:bg-terracotta-700"
                  >
                    Checkout
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
