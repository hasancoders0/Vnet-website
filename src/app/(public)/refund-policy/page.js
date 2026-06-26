import LegalLayout from "@/components/legal/LegalLayout";
import { refundData } from "@/data/legal/refund";
import { generatePageMetadata } from "@/lib/seo/generatePageMetadata";
export const metadata = generatePageMetadata(
  "refund-policy",
  "/refund-policy",
);
export default function RefundPage() {
  return <LegalLayout {...refundData} />;
}