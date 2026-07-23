import { Hero } from "@/components/home/Hero";
import { FeatureDish } from "@/components/home/FeatureDish";
import { SignatureGrid } from "@/components/home/SignatureGrid";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { TileStrip } from "@/components/brand/TileStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureDish />
      <SignatureGrid />
      <TileStrip height={40} />
      <StoryTeaser />
      {/* Next pass: interior/ambiance · reviews strip · location + map */}
    </>
  );
}
