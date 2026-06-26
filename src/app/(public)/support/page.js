import ComingSoon from "@/components/ui/ComingSoon";
import { generatePageMetadata } from "@/lib/seo/generatePageMetadata";
export const metadata = generatePageMetadata(
  "support",
  "/support",
);
export default function Page() {
  return <ComingSoon />;
}