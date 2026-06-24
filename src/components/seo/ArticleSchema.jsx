export default function ArticleSchema({ post }) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://vnet-it.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: post.title,

    description: post.description,

    image: [
      post.metaImage ||
        post.image ||
        `${siteUrl}/website-components/og-image.jpg`,
    ],

    author: {
      "@type": "Person",
      name: post.author?.name || "VNet Team",
    },

    publisher: {
      "@type": "Organization",
      name: "Visionary Network",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/journal/${post.slug}`,
    },

    datePublished: post.datePublished,

    dateModified:
      post.dateModified || post.datePublished,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}