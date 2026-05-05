"use client";

import ArticleCard from "./ArticleCard";

const articles = [
  {
    title: "How to Build Scalable Applications with React",
    description:
      "Best practices and architecture tips for building scalable React applications.",
    category: "Web Development",
    date: "May 8, 2024",
    readTime: "6 min read",
  },
  {
    title: "Next.js 14 Features You Should Know",
    description:
      "A deep dive into the coolest features added in Next.js 14.",
    category: "Web Development",
    date: "May 5, 2024",
    readTime: "7 min read",
  },
  {
    title: "10 UI/UX Design Principles for Better User Experience",
    description:
      "Essential design principles every designer should follow.",
    category: "UI/UX Design",
    date: "May 2, 2024",
    readTime: "5 min read",
  },
  {
    title: "Advanced JavaScript Concepts Explained",
    description:
      "Closures, event loop, promises and more explained in simple words.",
    category: "JavaScript",
    date: "Apr 28, 2024",
    readTime: "9 min read",
  },
  {
    title: "How to Optimize Website Performance",
    description:
      "Practical tips to improve your website speed and Core Web Vitals.",
    category: "Performance",
    date: "Apr 25, 2024",
    readTime: "6 min read",
  },
  {
    title: "Top 10 Developer Tools to Boost Productivity",
    description:
      "A list of must-have tools that every developer should use.",
    category: "Tools & Resources",
    date: "Apr 22, 2024",
    readTime: "8 min read",
  },
];

export default function ArticlesGrid() {
  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-semibold text-gray-800 text-lg">
          Latest Articles
        </h2>

        <button className="text-sm text-purple-600 hover:underline">
          View All Articles →
        </button>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((item, index) => (
          <ArticleCard
            key={index}
            title={item.title}
            description={item.description}
            category={item.category}
            date={item.date}
            readTime={item.readTime}
          />
        ))}
      </div>

    </div>
  );
}