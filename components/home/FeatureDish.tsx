import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/brand/Divider";

/** The "Shawarma meets Tostada" signature feature (mockup: asi-feature). */
export function FeatureDish() {
  return (
    <section className="grid items-stretch bg-blue lg:grid-cols-2">
      <div className="relative min-h-[22rem] lg:min-h-[34rem]">
        <Photo
          src={site.images.feature}
          alt="Beef shawarma piled on a crispy blue-corn tostada with toum and sumac-pickled onions"
          aspect="aspect-auto"
          className="absolute inset-0 h-full w-full"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-ink/40 to-transparent lg:bg-gradient-to-r" />
      </div>

      <div className="flex items-center px-6 py-14 sm:px-12 lg:px-16">
        <Reveal className="max-w-md">
          <p className="eyebrow text-gold-soft">The signature</p>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] text-cream-50 sm:text-6xl">
            Shawarma
            <span className="my-2 flex items-center gap-3 text-2xl text-gold sm:text-3xl">
              <span className="text-gold/60">✦</span> meets <span className="text-gold/60">✦</span>
            </span>
            Tostada
          </h2>
          <Divider className="my-6" width="w-40" color="text-gold" />
          <p className="text-lg leading-relaxed text-cream/85">
            Tender beef shawarma, toum, sumac-pickled onions, and cilantro, piled on a crispy
            blue-corn tostada. Two cultures in one perfect bite.
          </p>
          <ButtonLink href="/menu" size="lg" className="mt-8">
            See the Menu
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
