"use client";
import Link from "next/link";
import ArticleCard from "./ArticleCard";

export default function ArticlesGrid({
  articles = [],
  totalArticles = 0,
  page = 1,
  pageSize = 9,
  search = "",
  category = "",
  tag = "",
  sort = "newest",
}) {
  const removeFilterUrl = (type) => {
    const params = new URLSearchParams();
    if (type !== "search" && search) params.set("search", search);
    if (type !== "category" && category) params.set("category", category);
    if (type !== "tag" && tag) params.set("tag", tag);
    return params.toString()
      ? `/journal?${params.toString()}#results`
      : "/journal#results";
  };

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(start + articles.length - 1, totalArticles);
  const hasFilters = search || category || tag;

  // Array to map over for cleaner filter rendering
  const activeFilters = [
    { key: "search", value: search, label: `Search: ${search}` },
    {
      key: "category",
      value: category,
      label: `Category: ${category.replace(/-/g, " ")}`,
    },
    { key: "tag", value: tag, label: `Tag: ${tag}` },
  ].filter((f) => f.value);

  return (
    <div id="results">
      {/* Header & Sort */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Showing {start}–{end} of {totalArticles} articles
          </h2>
          {hasFilters && (
            <p className="mt-1 text-sm text-slate-500">
              Filtered by active selections
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="sort-select"
            className="text-sm text-slate-500 whitespace-nowrap"
          >
            Sort by
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => {
              const params = new URLSearchParams(window.location.search);
              params.set("sort", e.target.value);
              window.location.href = `/journal?${params.toString()}#results`;
            }}
            className="
              appearance-none
              w-full sm:w-auto
              pl-4 pr-10 py-2.5
              text-sm font-medium text-slate-700
              bg-white
              border border-slate-200/70
              rounded-xl
              outline-none
              cursor-pointer
              transition-all duration-200
              hover:border-slate-300
              focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
              bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] 
              bg-[length:16px] bg-[right_12px_center] bg-no-repeat
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
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {activeFilters.map((filter) => (
            <Link
              key={filter.key}
              href={removeFilterUrl(filter.key)}
              className="
                group inline-flex items-center gap-1.5 
                px-3 py-1.5 
                rounded-full 
                bg-slate-100 text-slate-700 
                text-xs font-medium
                border border-slate-200/60
                hover:bg-slate-200 hover:border-slate-300
                transition-colors duration-200
              "
            >
              {filter.label}
              <span className="text-slate-400 group-hover:text-slate-600 transition-colors">
                ✕
              </span>
            </Link>
          ))}

          <Link
            href="/journal#results"
            className="ml-1 text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors duration-200"
          >
            Clear all
          </Link>
        </div>
      )}

      {/* Grid or Empty State */}
      {!articles.length ? (
        <div className="bg-white rounded-2xl border border-slate-200/70 p-12 md:p-16 text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
            📄
          </div>
          <h3 className="text-xl font-semibold text-slate-900">
            No Articles Found
          </h3>
          <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            We couldn&apos;t find any articles matching your current filters.
            Try adjusting your search.
          </p>

          <div className="mt-6 space-y-2.5 text-left max-w-xs mx-auto text-sm text-slate-600">
            <p className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
              Remove some active filters
            </p>
            <p className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
              Search with a different keyword
            </p>
          </div>

          <Link
            href="/journal#results"
            className="
              inline-flex items-center mt-8 
              px-6 py-2.5 
              rounded-xl 
              bg-slate-900 text-white text-sm font-medium
              hover:bg-slate-800
              shadow-sm hover:shadow-md
              transition-all duration-300
            "
          >
            Browse All Articles
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
