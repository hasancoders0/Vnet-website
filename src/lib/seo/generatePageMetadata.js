import { PAGE_METADATA } from "@/config/metadata";

export function generatePageMetadata(page, path) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vnet-it.com";

  const meta = PAGE_METADATA[page];

  if (!meta) {
    return {};
  }

  const image = `${siteUrl}${meta.image}`;

  return {
    title: meta.title,

    description: meta.description,

    keywords: meta.keywords,

    alternates: {
      canonical: `${siteUrl}${path}`,
    },

    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteUrl}${path}`,
      siteName: "Visionary Network",
      type: "website",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [image],
    },

    robots: {
      index: true,
      follow: true,
    },
    authors: [
      {
        name: "Visionary Network",
      },
    ],

    creator: "Visionary Network",

    publisher: "Visionary Network",
  };
}
