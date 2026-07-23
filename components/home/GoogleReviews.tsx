import { site, googleReviews } from "@/config/site";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Official Google "G" mark — used only as a source indicator on review cards. */
function GoogleMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9.1h11.9c-.5 2.7-2.1 5.1-4.4 6.6v5.5h7.1c4.2-3.9 6.5-9.6 6.5-16.7z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.1 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.8 28.3c-.4-1.3-.7-2.7-.7-4.3s.2-2.9.7-4.3v-5.7H4.5C3 16.9 2 20.3 2 24s1 7.1 2.5 10l7.3-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.4 2 8.1 6.9 4.5 14l7.3 5.7c1.7-5.2 6.5-9 12.2-9z"
      />
    </svg>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 ${filled ? "fill-gold text-gold" : "fill-none text-cream-50/30"}`}
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6-4.4-4.2 6-.8z" />
    </svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= rating} />
      ))}
    </div>
  );
}

/** Google Reviews strip for the homepage (mockup slot: "reviews strip"). */
export function GoogleReviews() {
  const hasReviews = googleReviews.length > 0;

  return (
    <Section tone="blue" id="reviews">
      <SectionHeader
        eyebrow="On Google"
        title="What Guests Are Saying"
        tone="light"
      />

      {hasReviews ? (
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {googleReviews.map((r, i) => (
            <Reveal key={`${r.author}-${i}`} delay={(i % 3) * 0.08}>
              <figure className="flex h-full flex-col rounded-[var(--radius-card)] bg-cream-50/10 p-6 ring-1 ring-cream-50/15">
                <div className="flex items-center justify-between">
                  <StarRow rating={r.rating} />
                  <GoogleMark />
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-cream/90">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-cream-50">
                  {r.author}
                  <span className="ml-2 font-normal text-cream/60">· {r.relativeTime}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="mx-auto mt-14 flex max-w-xl flex-col items-center gap-4 rounded-[var(--radius-card)] bg-cream-50/10 px-8 py-12 text-center ring-1 ring-cream-50/15">
            <GoogleMark className="h-10 w-10" />
            <p className="font-display text-2xl text-cream-50">
              We&apos;re just getting started on Google
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-cream/75">
              Loved your visit? Be one of our first Google reviews — it means the world to a
              family-run kitchen.
            </p>
            <ButtonLink
              href={site.contact.googleReviewSearchUrl}
              variant="outline"
              size="md"
              className="mt-2"
            >
              Leave us a review
            </ButtonLink>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
