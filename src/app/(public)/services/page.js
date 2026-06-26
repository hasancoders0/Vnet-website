import ServicesHero from "@/components/services/ServicesHero";
import ServicesTabs from "@/components/services/ServicesTabs";
import ServicesGrid from "@/components/services/ServicesGrid";
import ProcessSection from "@/components/services/ProcessSection";
import WhyChooseUs from "@/components/services/WhyChooseUs";
import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import { generatePageMetadata } from "@/lib/seo/generatePageMetadata";
export const metadata = generatePageMetadata(
  "services",
  "/services",
);
export const dynamic = "force-dynamic";

const serializeService = (service) => ({
  _id: service._id.toString(),
  title: service.title,
  slug: service.slug,
  shortDescription: service.shortDescription,
  pricing: service.pricing || [],
  features: service.features || [],
});

async function getServices() {
  await connectDB();

  const services = await Service.find({ status: "active" })
    .sort({ order: 1, createdAt: -1 })
    .lean();

  return services.map(serializeService);
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main>
      <ServicesHero />
      <ServicesTabs />
      <ServicesGrid services={services} />
      <ProcessSection />
      <WhyChooseUs />
    </main>
  );
}
