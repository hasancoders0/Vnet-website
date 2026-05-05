export const refundData = {
  title: "Refund Policy",
  badge: "REFUND POLICY",
  description:
    "We strive to ensure customer satisfaction. This Refund Policy outlines the conditions and process for requesting a refund.",
  lastUpdated: "May 20, 2024",

  // 🔥 unified background (same as all legal pages)
  bgImage: "/website-components/top-bg.png",

  // 🔥 required for hero layout (missing before)
  rightImage: "/website-components/refund-top.png",

  sections: [
    {
      id: "intro",
      title: "Introduction",
      icon: "undo",
      content:
        "At Visionary Network, we aim to provide high-quality digital products and services. This Refund Policy explains when and how refunds may be issued.",
    },
    {
      id: "eligibility",
      title: "Eligibility for Refunds",
      icon: "check",
      content:
        "Refunds may be granted if the product or service does not meet expectations or has a technical issue. Requests must be made within the eligible timeframe and meet our refund criteria.",
    },
    {
      id: "non-refundable",
      title: "Non-Refundable Items",
      icon: "times",
      content:
        "Certain items such as digital downloads, subscriptions, or customized services may not be eligible for refunds once they have been accessed or delivered.",
    },
    {
      id: "time",
      title: "Refund Timeframe",
      icon: "clock",
      content:
        "Refund requests must be submitted within 7–14 days of purchase. Requests made after this period may not be eligible for approval.",
    },
    {
      id: "process",
      title: "Refund Process",
      icon: "money",
      content:
        "Once your refund request is reviewed and approved, the amount will be refunded to your original payment method. Processing times may vary depending on your payment provider.",
    },
    {
      id: "contact",
      title: "Contact Us",
      icon: "mail",
      content:
        "If you have any questions about our Refund Policy or need assistance, please contact our support team through our official contact page.",
    },
  ],
};