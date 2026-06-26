import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutMission from "@/components/about/AboutMission";
import AboutTeam from "@/components/about/AboutTeam";
import AboutCTA from "@/components/about/AboutCTA";
import { generatePageMetadata } from "@/lib/seo/generatePageMetadata";
export const metadata = generatePageMetadata(
  "about",
  "/about",
);
export default function AboutPage() {
  return (
    <main>

      {/* HERO */}
      <AboutHero />

      {/* STATS */}
      <AboutStats />

      {/* MISSION & VALUES */}
      <AboutMission />

      {/* TEAM */}
      <AboutTeam />

      {/* CTA */}
      <AboutCTA />

    </main>
  );
}