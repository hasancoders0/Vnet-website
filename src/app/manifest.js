import { SITE_CONFIG } from "@/config/site";

export default function manifest() {
  return {
    name: SITE_CONFIG.name,
    short_name: "VNet",

    description: SITE_CONFIG.seo.description,

    start_url: "/",

    display: "standalone",

    background_color: "#050816",

    theme_color: "#050816",

    icons: [
      {
        src: SITE_CONFIG.favicon,
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}