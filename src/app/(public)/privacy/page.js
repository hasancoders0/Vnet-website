import LegalLayout from "@/components/legal/LegalLayout";
import { privacyData } from "@/data/legal/privacy";

export default function PrivacyPage() {
  return <LegalLayout {...privacyData} />;
}