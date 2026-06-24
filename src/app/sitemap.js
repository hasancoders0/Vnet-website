import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import Blog from "@/models/Blog";

const BASE_URL = "https://vnet-it.com";

export default async function sitemap() {
  await connectDB();

  const services = await Service.find({
    status: "active",
  }).select("slug updatedAt");

  const blogs = await Blog.find({
    status: "published",
  }).select("slug updatedAt");

  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/journal`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const serviceUrls = services.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: service.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogUrls = blogs.map((blog) => ({
    url: `${BASE_URL}/journal/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...serviceUrls,
    ...blogUrls,
  ];
}