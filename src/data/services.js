const services = [
  {
    slug: "website-development",

    // HERO
    title: "Website Development",
    subtitle:
      "We build fast, responsive, and SEO-friendly websites that deliver real results.",
    badge: "Popular Service",
    description:
      "We follow best practices and modern technologies to build high-performing websites.",

    heroImage: "/website-components/services-right-img.png",

    // HERO FEATURES (WITH ICONS)
    features: [
      {
        label: "Modern Design",
        icon: "FaPalette",
      },
      {
        label: "SEO Optimized",
        icon: "FaSearch",
      },
      {
        label: "Mobile Friendly",
        icon: "FaMobileAlt",
      },
    ],

    // WHAT YOU GET (CHECKLIST STYLE)
    whatYouGet: [
      "Custom & Modern Design",
      "Fully Responsive Layout",
      "SEO Friendly Structure",
      "Fast Loading Speed",
      "Cross Browser Compatibility",
      "Secure & Clean Code",
      "Easy to Manage (CMS)",
      "Post-Launch Support",
    ],

    // PRICING
    pricing: [
      {
        name: "Basic",
        price: 199,
        description: "Perfect for small business websites.",
        features: [
          "Up to 5 Pages",
          "Responsive Design",
          "Contact Form",
          "Basic SEO",
          "7 Days Support",
        ],
        highlighted: false,
      },
      {
        name: "Standard",
        price: 399,
        description: "Ideal for growing business and startups.",
        features: [
          "Up to 10 Pages",
          "Responsive Design",
          "CMS Integration",
          "On-page SEO",
          "Speed Optimization",
          "14 Days Support",
        ],
        highlighted: true,
      },
      {
        name: "Premium",
        price: 699,
        description: "For large businesses needing advanced solutions.",
        features: [
          "Up to 20 Pages",
          "Advanced Features",
          "CMS Integration",
          "On-page & Technical SEO",
          "Speed Optimization",
          "30 Days Support",
        ],
        highlighted: false,
      },
    ],

    // PROCESS (DYNAMIC ICON)
    process: [
      {
        title: "Discover & Plan",
        description:
          "We understand your goals, requirements, and audience.",
        icon: "FaSearch",
      },
      {
        title: "Design & Prototype",
        description:
          "We create wireframes and UI aligned with your brand.",
        icon: "FaPenNib",
      },
      {
        title: "Development",
        description:
          "We build scalable and clean code architecture.",
        icon: "FaCode",
      },
      {
        title: "Testing & Review",
        description:
          "We ensure performance, security, and responsiveness.",
        icon: "FaCheckCircle",
      },
      {
        title: "Launch & Support",
        description:
          "We deploy and provide ongoing support.",
        icon: "FaRocket",
      },
    ],

    // FAQ
    faq: [
      {
        question: "How long does it take to build a website?",
        answer:
          "Typically 1–3 weeks depending on complexity and requirements.",
      },
      {
        question: "Will my website be mobile-friendly?",
        answer:
          "Yes, all our websites are fully responsive and optimized for all devices.",
      },
      {
        question: "Do you provide SEO optimization?",
        answer:
          "Yes, we follow on-page SEO best practices for better visibility.",
      },
      {
        question: "Can I update the website myself?",
        answer:
          "Yes, we provide CMS-based solutions so you can manage content easily.",
      },
    ],
  },
];

export default services;