import ComingSoon from "@/components/ui/ComingSoon";
import { generatePageMetadata } from "@/lib/seo/generatePageMetadata";

export const metadata = generatePageMetadata("help-center", "/help-center");
export default function Page() {
  return <ComingSoon />;
}
