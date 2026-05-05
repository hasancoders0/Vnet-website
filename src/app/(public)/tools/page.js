import ToolsHero from "@/components/tools/ToolsHero";
import ToolsStats from "@/components/tools/ToolsStats";
import ToolsGrid from "@/components/tools/ToolsGrid";
import ToolsFeatures from "@/components/tools/ToolsFeatures";

export default function ToolsPage() {
  return (
    <main>
      <ToolsHero />
      <ToolsStats />
      <ToolsGrid />
      <ToolsFeatures />
    </main>
  );
}