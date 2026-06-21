import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

export default async function sitemap() {
  await connectDB();

  const services = await Service.find({
    status: "active",
  }).select("slug updatedAt");

  const serviceUrls = services.map((service) => ({
    url: `https://vnet-it.com/services/${service.slug}`,
    lastModified: service.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://vnet-it.com/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: "https://vnet-it.com/services",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    ...serviceUrls,
  ];
}