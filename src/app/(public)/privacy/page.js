import LegalLayout from "@/components/legal/LegalLayout";
import { privacyData } from "@/data/legal/privacy";
import { generatePageMetadata } from "@/lib/seo/generatePageMetadata";
export const metadata = generatePageMetadata(
  "privacy",
  "/privacy",
);
export default function PrivacyPage() {
  return <LegalLayout {...privacyData} />;
}