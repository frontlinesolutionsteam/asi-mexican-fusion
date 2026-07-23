"use client";

import { useState } from "react";
import { site, catering } from "@/config/site";
import { Divider } from "@/components/brand/Divider";
import { ButterflyEmblem } from "@/components/brand/ButterflyEmblem";

export function CateringForm() {
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // DEMO: no backend yet. TODO(catering): POST to /api/catering and email the
    // restaurant (Resend) — see README for the integration point.
    setSent(true);
    window.scrollTo({ top: e.currentTarget.offsetTop - 120, behavior: "smooth" });
  }

  if (sent) {
    return (
      <div className="rounded-[var(--radius-card)] border border-gold/40 bg-cream-50 p-10 text-center shadow-[var(--shadow-card)]">
        <ButterflyEmblem className="mx-auto h-14 w-14" variant="flags" />
        <h3 className="mt-5 font-display text-3xl text-blue">¡Gracias!</h3>
        <Divider className="mx-auto my-4" width="w-32" />
        <p className="text-ink-soft">
          Your catering request is in. We’ll reach out within a day to build your spread. Need us
          sooner? Call{" "}
          <a href={site.contact.phoneHref} className="font-bold text-blue underline">
            {site.contact.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const field =
    "rounded-xl border border-cream-200 bg-cream px-4 py-3 font-normal text-ink outline-none focus:border-gold";
  const label = "flex flex-col gap-1.5 text-sm font-semibold text-blue";

  return (
    <form
      onSubmit={submit}
      className="rounded-[var(--radius-card)] border border-cream-200 bg-cream-50 p-6 shadow-[var(--shadow-card)] sm:p-8"
    >
      <h3 className="font-display text-2xl text-blue">Tell us about your event</h3>
      <p className="mt-1 text-sm text-ink-soft">
        {catering.minGuests}+ guests · at least {catering.leadTimeDays} days’ notice
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={label}>
          Name
          <input required name="name" className={field} placeholder="Your name" />
        </label>
        <label className={label}>
          Email
          <input required type="email" name="email" className={field} placeholder="you@email.com" />
        </label>
        <label className={label}>
          Phone
          <input required type="tel" name="phone" className={field} placeholder="(408) 555-0123" />
        </label>
        <label className={label}>
          Event date
          <input required type="date" name="date" className={field} />
        </label>
        <label className={label}>
          Guests
          <input
            required
            type="number"
            min={catering.minGuests}
            name="guests"
            className={field}
            placeholder={`${catering.minGuests}+`}
          />
        </label>
        <label className={label}>
          Event type
          <select name="type" className={field} defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            <option>Office / corporate</option>
            <option>Wedding</option>
            <option>Birthday / party</option>
            <option>Other celebration</option>
          </select>
        </label>
        <label className={`${label} sm:col-span-2`}>
          Details
          <textarea
            name="details"
            rows={4}
            className={`${field} resize-none`}
            placeholder="Tell us about your vibe, any dietary needs, and which dishes you’re dreaming of."
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-terracotta px-6 py-4 font-bold uppercase tracking-[0.1em] text-cream-50 transition-colors hover:bg-terracotta-700 sm:w-auto sm:px-10"
      >
        Request catering
      </button>
    </form>
  );
}
