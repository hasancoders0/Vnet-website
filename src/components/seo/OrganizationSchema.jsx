import { SITE_CONFIG } from "@/config/site";

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",

    "@type": "ProfessionalService",

    name: SITE_CONFIG.name,

    url: SITE_CONFIG.url,

    logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo.icon}`,

    description: SITE_CONFIG.description,

    sameAs: SITE_CONFIG.socials.map((social) => social.href),

    contactPoint: [
      {
        "@type": "ContactPoint",

        contactType: "customer support",

        url: `${SITE_CONFIG.url}/contact`,

        availableLanguage: ["English"],
      },
    ],
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