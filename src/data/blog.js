export const blogPosts = [
  {
    slug: "future-of-web-development-2024",
    title: "The Future of Web Development in 2024",
    description:
      "Explore the top trends, tools and technologies shaping modern web development.",
    category: "Web Development",
    date: "May 12, 2024",
    readTime: "8 min read",
    views: "2.4K views",
    image: "/website-components/default-image.png",

    author: {
      name: "John Doe",
      image: "/website-components/default-image.png",
    },

    // ✅ MAIN CONTENT (CMS STYLE)
    content: [
      {
        type: "paragraph",
        text: "Web development is constantly evolving. As we move through 2024, new technologies, frameworks, and tools are shaping modern applications.",
      },
      {
        type: "paragraph",
        text: "In this article, we'll explore the key trends that are defining the future of web development.",
      },

      {
        type: "heading",
        id: "modern-frameworks",
        text: "1. The Rise of Modern Frameworks",
      },
      {
        type: "paragraph",
        text: "Frameworks like Next.js, Remix, and SvelteKit are leading the way in 2024.",
      },
      {
        type: "highlight",
        variant: "purple",
        text: "Modern frameworks are changing how we build the web.",
      },

      {
        type: "heading",
        id: "ai-tools",
        text: "2. AI-Powered Development Tools",
      },
      {
        type: "paragraph",
        text: "AI tools like GitHub Copilot and ChatGPT boost productivity.",
      },
      {
        type: "highlight",
        variant: "green",
        text: "Developers using AI will outperform those who don’t.",
      },

      {
        type: "heading",
        id: "performance",
        text: "3. Performance & Core Web Vitals",
      },
      {
        type: "list",
        items: [
          "Focus on LCP, FID, CLS",
          "Optimize images and scripts",
          "Use Lighthouse tools",
        ],
      },
    ],
  },
];