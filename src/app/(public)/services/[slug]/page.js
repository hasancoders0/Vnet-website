import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import ServiceHero from "@/components/services/single/ServiceHero";
import ServiceStats from "@/components/services/single/ServiceStats";
import ServiceFeatures from "@/components/services/single/ServiceFeatures";
import ServicePricing from "@/components/services/single/ServicePricing";
import ServiceProcess from "@/components/services/single/ServiceProcess";
import ServicePortfolio from "@/components/services/single/ServicePortfolio";
import ServiceTestimonials from "@/components/services/single/ServiceTestimonials";
import ServiceFAQ from "@/components/services/single/ServiceFAQ";

export const dynamic = "force-dynamic";

const mapService = (service) => ({
  _id: service._id.toString(),
  slug: service.slug,
  title: service.title,
  subtitle: service.subtitle || service.shortDescription || "",
  badge: service.badge || "Service",
  description: service.fullDescription || service.shortDescription || "",
  heroImage: service.featuredImage || "/website-components/services-right-img.png",
  features: service.features || [],
  whatYouGet: service.whatYouGet?.items || [],
  whatYouGetDescription:
    service.whatYouGet?.description ||
    "We follow the best practices and latest technologies to deliver high-performing websites.",
  pricing: (service.pricing || []).map((plan) => ({
    name: plan.title,
    price: plan.price,
    description: plan.description,
    features: plan.features || [],
    highlighted: plan.highlighted,
  })),
  process: service.process || [],
  faq: service.faq || [],
});

async function getService(slug) {
  await connectDB();

  const service = await Service.findOne({ slug, status: "active" }).lean();

  return service ? mapService(service) : null;
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const data = await getService(slug);

  if (!data) notFound();

  return (
    <>
      <section className="relative hero-gradient overflow-hidden">
        <div className="hero-glow-purple -top-24 right-[-120px]" />
        <div className="hero-glow-blue top-[200px] left-[-120px]" />

        <ServiceHero data={data} />
        <ServiceStats />
      </section>

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-4 gap-12 items-start">
          <ServiceFeatures data={data} />
          <ServicePricing pricing={data.pricing} />
        </div>
      </section>

      <ServiceProcess process={data.process} />
      <ServicePortfolio />
      <ServiceTestimonials />
      <ServiceFAQ faq={data.faq} />
    </>
  );
}
