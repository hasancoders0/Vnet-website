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
import RelatedServices from "@/components/services/single/RelatedServices";

import ServiceSchema from "@/components/seo/ServiceSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

import { buildBreadcrumbs } from "@/lib/seo/buildBreadcrumbs";

export const dynamic = "force-dynamic";

const mapService = (service) => ({
  _id: service._id.toString(),

 category: service.category
  ? service.category.toString()
  : null,

  slug: service.slug,
  title: service.title,

  subtitle: service.subtitle || service.shortDescription || "",

  metaTitle: service.metaTitle || "",

  metaDescription: service.metaDescription || "",

  metaImage: service.metaImage || "",

  focusKeyword: service.focusKeyword || "",

  badge: service.badge || "Service",

  description: service.fullDescription || service.shortDescription || "",

  heroImage:
    service.featuredImage || "/website-components/services-right-img.png",

  features: service.features || [],

  whatYouGet: service.whatYouGet?.items || [],

  support: service.support || {},

  whatYouGetDescription:
    service.whatYouGet?.description ||
    "We follow the best practices and latest technologies to deliver high-performing websites.",

  pricing: (service.pricing || []).map((plan) => ({
    title: plan.title,
    price: plan.price,
    deliveryTime: plan.deliveryTime,
    description: plan.description,
    features: plan.features || [],
    highlighted: plan.highlighted,
  })),

  process: service.process || [],

  faq: service.faq || [],
});

async function getService(slug) {
  await connectDB();

  const service = await Service.findOne({
    slug,
    status: "active",
  }).lean();

  return service ? mapService(service) : null;
}

async function getRelatedServices(categoryId, currentSlug) {
  await connectDB();

  const services = await Service.find({
    category: categoryId,
    status: "active",
    slug: { $ne: currentSlug },
  })
    .select(
      "_id title slug featuredImage shortDescription"
    )
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return services.map((service) => ({
    _id: service._id.toString(),
    title: service.title,
    slug: service.slug,
    featuredImage: service.featuredImage || "",
    shortDescription:
      service.shortDescription || "",
  }));
}
 

/* =========================
   SEO METADATA
========================= */
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const data = await getService(slug);

  if (!data) {
    return {
      title: "Service Not Found | Visionary Network",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vnet-it.com";

  const url = `${siteUrl}/services/${data.slug}`;

  const title = data.metaTitle || `${data.title} | Visionary Network`;

  const description =
    data.metaDescription ||
    data.subtitle ||
    "Professional digital services by Visionary Network.";

  const image =
    data.metaImage || data.heroImage || "/website-components/og-image.jpg";

  return {
    title,
    description,

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      type: "website",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/* =========================
   PAGE
========================= */
export default async function ServicePage({ params }) {
  const { slug } = await params;

  const data = await getService(slug);

  if (!data) {
    notFound();
  }
  const relatedServices = await getRelatedServices(data.category, data.slug);
  const breadcrumbs = buildBreadcrumbs([
    {
      name: "Home",
      path: "",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: data.title,
      path: `/services/${data.slug}`,
    },
  ]);

  return (
    <>
      {/* SEO SCHEMA */}
      <ServiceSchema service={data} />
      <FAQSchema faq={data.faq} />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* HERO */}
      <section className="relative hero-gradient overflow-hidden">
        <div className="hero-glow-purple -top-24 right-[-120px]" />
        <div className="hero-glow-blue top-[200px] left-[-120px]" />

        <ServiceHero data={data} />
        <ServiceStats />
      </section>

      {/* FEATURES + PRICING */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-4 gap-12 items-start">
          <ServiceFeatures data={data} />
          <ServicePricing pricing={data.pricing} />
        </div>
      </section>

      {/* PROCESS */}
      <ServiceProcess process={data.process} />

      {/* PORTFOLIO */}
      <ServicePortfolio />

      {/* TESTIMONIALS */}
      <ServiceTestimonials />

      {/* Related Service */}
      <RelatedServices services={relatedServices} />

      {/* FAQ */}
      <ServiceFAQ faq={data.faq} />
    </>
  );
}
