import ComingSoon from "@/components/ui/ComingSoon";
import { generatePageMetadata } from "@/lib/seo/generatePageMetadata";
export const metadata = generatePageMetadata(
  "templates",
  "/templates",
);
export default function Page() {
  return <ComingSoon />;
}