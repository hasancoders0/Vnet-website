"use client";

import ArticleCard from "./ArticleCard";

const fallbackArticles = [
  {
    title: "How to Build Scalable Applications with React",
    description:
      "Best practices and architecture tips for building scalable React applications.",
    category: "Web Development",
    date: "May 8, 2024",
    readTime: "6 min read",
  },
  {
    title: "Next.js Features You Should Know",
    description: "A deep dive into the coolest features in modern Next.js.",
    category: "Web Development",
    date: "May 5, 2024",
    readTime: "7 min read",
  },
  {
    title: "UI/UX Design Principles for Better User Experience",
    description: "Essential design principles every designer should follow.",
    category: "UI/UX Design",
    date: "May 2, 2024",
    readTime: "5 min read",
  },
];

export default function ArticlesGrid({ articles = [] }) {
  const displayArticles = articles.length ? articles : fallbackArticles;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-semibold text-gray-800 text-lg">
          Latest Articles
        </h2>

        <button className="text-sm text-purple-600 hover:underline">
          View All Articles
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayArticles.map((item, index) => (
          <ArticleCard
            key={item.slug || index}
            slug={item.slug}
            title={item.title}
            description={item.description}
            category={item.category}
            date={item.date}
            readTime={item.readTime}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}
