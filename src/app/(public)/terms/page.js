import LegalLayout from "@/components/legal/LegalLayout";
import { termsData } from "@/data/legal/terms";

export default function TermsPage() {
  return <LegalLayout {...termsData} />;
}