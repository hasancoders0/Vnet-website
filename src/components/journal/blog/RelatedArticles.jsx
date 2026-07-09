"use client";

import Link from "@/components/ui/AppLink";
import { FiArrowRight } from "react-icons/fi";
import ArticleCard from "../ArticleCard";

export default function RelatedArticles({ articles = [] }) {
  if (!articles.length) return null;

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/70 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Related Articles
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Continue reading with more insights and guides.
          </p>
        </div>

        <Link
          href="/journal"
          className="
            inline-flex items-center gap-2 
            text-sm font-medium text-blue-600 
            hover:text-blue-700 
            transition-colors group
            whitespace-nowrap
          "
        >
          View All
          <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Articles Grid */}
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