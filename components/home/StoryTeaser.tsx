import { site, story } from "@/config/site";
import { Photo } from "@/components/ui/Photo";
import { ArchPanel } from "@/components/brand/ArchPanel";
import { ButtonLink } from "@/components/ui/Button";
import { Divider } from "@/components/brand/Divider";
import { Reveal } from "@/components/ui/Reveal";

/** Home story teaser — "Two flags. One family. One kitchen." (mockup: asi-story). */
export function StoryTeaser() {
  return (
    <section className="bg-cream py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <Photo
            src={site.images.team}
            alt="Lourdes Barraza and her daughters, the family behind Así Mexican Fusion Bistro"
            aspect="aspect-[4/5]"
            className="rounded-[var(--radius-card)] shadow-[var(--shadow-card)]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <ArchPanel>
            <p className="eyebrow text-center text-terracotta">Our story</p>
            <h2 className="mt-4 text-center font-display text-4xl leading-[1] sm:text-5xl">
              <span className="text-blue">{story.headline[0]}</span>{" "}
              <span className="text-terracotta">{story.headline[1]}</span>{" "}
              <span className="text-blue">{story.headline[2]}</span>
            </h2>
            <Divider className="mx-auto my-6" width="w-40" />
            <div className="space-y-4 text-center text-ink-soft">
              {story.body.map((p) => (
                <p key={p.slice(0, 16)} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-6 text-center font-script text-2xl text-terracotta">
              {story.scriptLine}
            </p>
            <div className="mt-7 flex justify-center">
              <ButtonLink href="/story" variant="blue" size="md">
                Read our story
              </ButtonLink>
            </div>
          </ArchPanel>
        </Reveal>
      </div>
    </section>
  );
}
