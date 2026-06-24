export default function BlogCollectionSchema({
  articles = [],
}) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://vnet-it.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",

    name: "Visionary Network Journal",

    url: `${siteUrl}/journal`,

    hasPart: articles.map((article) => ({
      "@type": "BlogPosting",

      headline: article.title,

      url: `${siteUrl}/journal/${article.slug}`,
    })),
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