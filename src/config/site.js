import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export const SITE_CONFIG = {
  // ================= BRAND =================
  name: "Visionary Network",

  url: "https://vnet-it.com",

  email: "support@vnet-it.com",

  phone: "+8801706776927",

  address: {
    line1: "Visionary Network IT",
    line2: "Dhaka, Bangladesh",
  },

  businessHours: "Our team is available during business hours.",

  description:
    "We help businesses grow with digital solutions that make an impact. Partner with us to scale your vision.",

  // ================= LOGOS =================
  logo: {
    light: "/website-components/logo.png",
    dark: "/website-components/logo-dark.png",
    icon: "/website-components/logo-icon.png",
  },

  favicon: "/website-components/favicon.png",

  ogImage: "/website-components/og-image.jpg",

  // ================= SEO =================
  seo: {
    title: "Visionary Network",

    description:
      "Modern web development, Shopify, WordPress, SEO, and digital solutions.",

    keywords: [
      "Web Development",
      "Shopify Development",
      "WordPress Development",
      "SEO Services",
      "Digital Agency",
      "Next.js Development",
      "MERN Stack",
      "UI UX Design",
    ],
  },

  // ================= SOCIALS =================
  socials: [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: FaFacebookF,
    },

    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: FaTwitter,
    },

    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: FaLinkedinIn,
    },

    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: FaInstagram,
    },
  ],
};