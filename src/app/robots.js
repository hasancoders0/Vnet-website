export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/administrator/",
          "/api/",
        ],
      },
    ],

    sitemap: "https://vnet-it.com/sitemap.xml",

    host: "https://vnet-it.com",
  };
}