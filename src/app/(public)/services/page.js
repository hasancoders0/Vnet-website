import ServicesHero from "@/components/services/ServicesHero";
import ServicesTabs from "@/components/services/ServicesTabs";
import ServicesGrid from "@/components/services/ServicesGrid";
import ProcessSection from "@/components/services/ProcessSection";
import WhyChooseUs from "@/components/services/WhyChooseUs";

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesTabs />
      <ServicesGrid />
      <ProcessSection />
      <WhyChooseUs />
    </main>
  );
}