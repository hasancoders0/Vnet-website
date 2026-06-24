"use client";
import Link from "next/link";
import ArticleCard from "./ArticleCard";

export default function ArticlesGrid({
  articles = [],
  totalArticles = 0,
  featuredCount = 0,
  page = 1,
  pageSize = 9,
  search = "",
  category = "",
  tag = "",
  sort = "newest",
}) {
  const removeFilterUrl = (type) => {
    const params = new URLSearchParams();

    if (type !== "search" && search) {
      params.set("search", search);
    }

    if (type !== "category" && category) {
      params.set("category", category);
    }

    if (type !== "tag" && tag) {
      params.set("tag", tag);
    }

    return params.toString()
      ? `/journal?${params.toString()}#results`
      : "/journal#results";
  };
  const start = (page - 1) * pageSize + 1;

  const end = Math.min(start + articles.length - 1, totalArticles);
  return (
    <div id="results">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-semibold text-gray-800 text-lg">
            Showing {start}-{end} of {totalArticles} Articles
          </h2>

          {(search || category || tag) && (
            <p className="text-sm text-gray-500 mt-1">
              Showing filtered results
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 whitespace-nowrap">
            Sort By
          </span>

          <select
            value={sort}
            onChange={(e) => {
              const params = new URLSearchParams(window.location.search);

              params.set("sort", e.target.value);

              window.location.href = `/journal?${params.toString()}#results`;
            }}
            className="
    px-4 py-2
    text-sm
    border border-gray-200
    rounded-xl
    bg-white
    text-gray-700
    outline-none
    focus:ring-2
    focus:ring-purple-500
  "
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">Title (A → Z)</option>
            <option value="za">Title (Z → A)</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {search && (
          <Link
            href={removeFilterUrl("search")}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm hover:bg-blue-100"
          >
            Search: {search}
            <span>✕</span>
          </Link>
        )}

        {category && (
          <Link
            href={removeFilterUrl("category")}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm hover:bg-purple-100"
          >
            Category: {category.replace(/-/g, " ")}
            <span>✕</span>
          </Link>
        )}

        {tag && (
          <Link
            href={removeFilterUrl("tag")}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm hover:bg-green-100"
          >
            Tag: {tag}
            <span>✕</span>
          </Link>
        )}

        {(search || category || tag) && (
          <Link
            href="/journal#results"
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Clear All Filters
          </Link>
        )}
      </div>

      {!articles.length ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-900">
            No Articles Found
          </h3>

          <p className="mt-3 text-gray-500">
            We couldn't find any articles matching your filters.
          </p>

          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p>✓ Remove some filters</p>
            <p>✓ Search another keyword</p>
            <p>✓ Browse all available articles</p>
          </div>

          <Link
            href="/journal#results"
            className="inline-flex items-center mt-8 px-5 py-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Browse All Articles
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item) => (
            <ArticleCard
              key={item.slug}
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
      )}
    </div>
  );
}
