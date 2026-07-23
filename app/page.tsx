import { Hero } from "@/components/home/Hero";
import { FeatureDish } from "@/components/home/FeatureDish";
import { SignatureGrid } from "@/components/home/SignatureGrid";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { GoogleReviews } from "@/components/home/GoogleReviews";
import { TileStrip } from "@/components/brand/TileStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureDish />
      <SignatureGrid />
      <TileStrip height={40} />
      <StoryTeaser />
      <GoogleReviews />
      {/* Next pass: interior/ambiance · location + map */}
    </>
  );
}
