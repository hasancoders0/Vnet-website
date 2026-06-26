export default function ServiceSchema({ service }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",

    name: service.title,

    description:
      service.description ||
      service.subtitle ||
      "",

    image: service.heroImage,

    provider: {
      "@type": "ProfessionalService",
      name: "Visionary Network",
      url: "https://vnet-it.com",
    },

    areaServed: {
      "@type": "Country",
      name: "Worldwide",
    },

    serviceType: service.title,
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