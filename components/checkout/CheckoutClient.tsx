"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import { useCart } from "@/components/cart/CartProvider";
import { Photo } from "@/components/ui/Photo";
import { Divider } from "@/components/brand/Divider";
import { formatPrice, formatTime } from "@/lib/format";
import { ButterflyEmblem } from "@/components/brand/ButterflyEmblem";

function pickupSlots(): string[] {
  const { pickupLeadMinutes, pickupSlotStepMinutes } = site.ordering;
  const now = new Date();
  const start = new Date(now.getTime() + pickupLeadMinutes * 60000);
  // round up to next step
  const rem = start.getMinutes() % pickupSlotStepMinutes;
  if (rem) start.setMinutes(start.getMinutes() + (pickupSlotStepMinutes - rem));
  start.setSeconds(0, 0);
  const slots: string[] = [];
  for (let i = 0; i < 10; i++) {
    const t = new Date(start.getTime() + i * pickupSlotStepMinutes * 60000);
    slots.push(`${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`);
  }
  return slots;
}

export function CheckoutClient() {
  const { lines, subtotal, tax, clear } = useCart();
  const slots = useMemo(pickupSlots, []);
  const [tipPct, setTipPct] = useState<number>(site.ordering.tipPresets[1]);
  const [customTip, setCustomTip] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [slot, setSlot] = useState(slots[0]);
  const [placed, setPlaced] = useState<null | { id: string; slot: string; total: number }>(null);

  const tip = customTip
    ? Math.max(0, parseFloat(customTip) || 0)
    : Math.round(subtotal * tipPct * 100) / 100;
  const total = Math.round((subtotal + tax + tip) * 100) / 100;

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    // DEMO: no payment yet. TODO(stripe): create PaymentIntent / Checkout Session,
    // then POST the order to /api/orders for email/SMS notification.
    const id = "ASI-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    setPlaced({ id, slot, total });
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---- Confirmation ----
  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center sm:px-8">
        <ButterflyEmblem className="mx-auto h-16 w-16" variant="flags" />
        <h1 className="mt-6 font-display text-4xl text-blue sm:text-5xl">¡Order received!</h1>
        <Divider className="mx-auto my-6" width="w-40" />
        <p className="text-ink-soft">
          Thank you{name ? `, ${name.split(" ")[0]}` : ""}! Your order{" "}
          <span className="font-bold text-blue">{placed.id}</span> is in. Pick up at{" "}
          <span className="font-bold text-blue">{formatTime(placed.slot)}</span> —{" "}
          {site.contact.address.street}.
        </p>
        <div className="mt-5 rounded-2xl border border-gold/40 bg-cream-50 p-5 text-sm text-ink-soft">
          <p className="font-semibold text-terracotta">Heads up — this is a preview checkout.</p>
          <p className="mt-1">
            Online payment isn’t connected yet, so please call to confirm your order:{" "}
            <a href={site.contact.phoneHref} className="font-bold text-blue underline">
              {site.contact.phone}
            </a>
            . Total was {formatPrice(placed.total)}.
          </p>
        </div>
        <Link
          href="/menu"
          className="mt-8 inline-flex rounded-full bg-terracotta px-7 py-3.5 font-semibold uppercase tracking-[0.1em] text-cream-50 hover:bg-terracotta-700"
        >
          Order more
        </Link>
      </div>
    );
  }

  // ---- Empty ----
  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-4xl text-blue">Your cart is empty</h1>
        <Divider className="mx-auto my-6" width="w-40" />
        <p className="text-ink-soft">Add a few dishes from the menu and they’ll show up here.</p>
        <Link
          href="/menu"
          className="mt-8 inline-flex rounded-full bg-terracotta px-7 py-3.5 font-semibold uppercase tracking-[0.1em] text-cream-50 hover:bg-terracotta-700"
        >
          Browse the menu
        </Link>
      </div>
    );
  }

  // ---- Checkout ----
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="mb-10 text-center">
        <p className="eyebrow text-terracotta">Almost there</p>
        <h1 className="mt-3 font-display text-4xl text-blue sm:text-5xl">Checkout</h1>
      </div>

      <form onSubmit={placeOrder} className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* Left — details */}
        <div className="space-y-8">
          {/* Fulfillment */}
          <fieldset className="rounded-2xl border border-cream-200 bg-cream-50 p-6">
            <legend className="px-2 font-display text-xl text-blue">How you’ll get it</legend>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <span className="flex items-center justify-center gap-2 rounded-xl border-2 border-terracotta bg-terracotta/5 px-4 py-3 text-sm font-bold uppercase tracking-wide text-terracotta">
                Pickup
              </span>
              <span className="flex items-center justify-center gap-2 rounded-xl border border-cream-200 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-ink-soft/60">
                Delivery · soon
              </span>
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              {site.contact.address.street}, {site.contact.address.city} ·{" "}
              {site.contact.parkingNote}
            </p>
          </fieldset>

          {/* Contact + time */}
          <fieldset className="rounded-2xl border border-cream-200 bg-cream-50 p-6">
            <legend className="px-2 font-display text-xl text-blue">Your details</legend>
            <div className="mt-2 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-blue">
                Name
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First & last name"
                  className="rounded-xl border border-cream-200 bg-cream px-4 py-3 font-normal text-ink outline-none focus:border-gold"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-blue">
                Phone
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(408) 555-0123"
                  className="rounded-xl border border-cream-200 bg-cream px-4 py-3 font-normal text-ink outline-none focus:border-gold"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-blue sm:col-span-2">
                Pickup time
                <select
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="rounded-xl border border-cream-200 bg-cream px-4 py-3 font-normal text-ink outline-none focus:border-gold"
                >
                  {slots.map((s) => (
                    <option key={s} value={s}>
                      Today at {formatTime(s)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>

          {/* Tip */}
          <fieldset className="rounded-2xl border border-cream-200 bg-cream-50 p-6">
            <legend className="px-2 font-display text-xl text-blue">Add a tip</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {site.ordering.tipPresets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setTipPct(p);
                    setCustomTip("");
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    !customTip && tipPct === p
                      ? "bg-blue text-cream-50"
                      : "bg-cream-100 text-blue hover:bg-cream-200"
                  }`}
                >
                  {Math.round(p * 100)}%
                </button>
              ))}
              <input
                type="number"
                min="0"
                step="0.5"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                placeholder="Custom $"
                className="w-28 rounded-full border border-cream-200 bg-cream px-4 py-2 text-sm outline-none focus:border-gold"
              />
            </div>
          </fieldset>
        </div>

        {/* Right — summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-cream-200 bg-cream-50 p-6 shadow-[var(--shadow-soft)]">
            <h2 className="font-display text-xl text-blue">Your order</h2>
            <ul className="mt-4 divide-y divide-cream-200">
              {lines.map((l) => (
                <li key={l.lineId} className="flex gap-3 py-3">
                  <Photo
                    src={l.image}
                    alt={l.name}
                    aspect="aspect-square"
                    className="h-14 w-14 flex-none rounded-lg"
                    emblem={false}
                    sizes="56px"
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-semibold text-blue">
                      {l.quantity}× {l.name}
                    </p>
                    {l.selections.length > 0 && (
                      <p className="text-xs text-ink-soft">
                        {l.selections.map((s) => s.label).join(", ")}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-blue">
                    {formatPrice(l.unitPrice * l.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-1 border-t border-cream-200 pt-4 text-sm text-ink-soft">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Tax</dt>
                <dd>{formatPrice(tax)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Tip</dt>
                <dd>{formatPrice(tip)}</dd>
              </div>
              <div className="flex justify-between pt-2 text-lg font-bold text-blue">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>
            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-terracotta px-6 py-4 font-bold uppercase tracking-[0.1em] text-cream-50 transition-colors hover:bg-terracotta-700"
            >
              Place order · {formatPrice(total)}
            </button>
            <p className="mt-3 text-center text-xs text-ink-soft">
              Preview checkout — payment isn’t live yet. We’ll confirm by phone.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
