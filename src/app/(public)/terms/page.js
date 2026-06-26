import LegalLayout from "@/components/legal/LegalLayout";
import { termsData } from "@/data/legal/terms";
import { generatePageMetadata } from "@/lib/seo/generatePageMetadata";
export const metadata = generatePageMetadata(
  "terms",
  "/terms",
);
export default function TermsPage() {
  return <LegalLayout {...termsData} />;
}