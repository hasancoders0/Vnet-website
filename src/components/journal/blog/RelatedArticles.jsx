"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import ArticleCard from "../ArticleCard";

export default function RelatedArticles({
  articles = [],
}) {
  if (!articles.length) return null;

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Related Articles
          </h2>

          <p className="text-gray-600 mt-2">
            Continue reading more insights and guides.
          </p>
        </div>

        <Link
          href="/journal"
          className="hidden sm:inline-flex items-center gap-2 text-purple-600 font-medium group"
        >
          View All

          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.slice(0, 2).map((article) => (
          <ArticleCard
            key={article.slug}
            slug={article.slug}
            title={article.title}
            description={article.description}
            category={article.category}
            date={article.date}
            readTime={article.readTime}
            image={article.image}
          />
        ))}
      </div>
    </div>
  );
}