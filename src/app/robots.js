import { SITE_CONFIG } from "@/config/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/administrator",
          "/api",
        ],
      },
    ],

    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,

    host: SITE_CONFIG.url,
  };
}