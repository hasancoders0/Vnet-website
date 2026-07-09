"use client";

import { useState } from "react";
import Link from "@/components/ui/AppLink";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";

export default function JournalSidebar({
  categories = [],
  tags = [],
  search = "",
  activeCategory = "",
  activeTag = "",
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [keyword, setKeyword] = useState(search);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    const value = keyword.trim();

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`/journal?${params.toString()}#results`);
  };

  const buildUrl = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    return `/journal?${params.toString()}#results`;
  };

  return (
    <aside className="space-y-5">
      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search articles..."
            className="
              w-full 
              pl-4 pr-11 py-3 
              rounded-xl 
              border border-slate-200/70 
              bg-slate-50/50 
              text-sm text-slate-800 
              placeholder:text-slate-400 
              outline-none 
              transition-all duration-200
              focus:bg-white 
              focus:border-slate-300 
              focus:ring-2 focus:ring-blue-500/20
            "
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors duration-200"
          >
            <FaSearch className="text-sm" />
          </button>
        </form>
      </div>

      {/* CATEGORIES */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4 text-[15px]">
          Categories
        </h3>

        <ul className="space-y-1">
          {categories.map((category) => {
            const Icon = FaIcons[category.icon] || FaIcons.FaFolder;
            const isActive = activeCategory === category.slug;

            return (
              <li key={category.slug}>
                <Link
                  href={buildUrl("category", category.slug)}
                  className={`
                    flex items-center justify-between rounded-xl px-3 py-2.5 
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`text-xs ${isActive ? "text-blue-500" : "text-slate-400"}`}
                    />
                    <span className="text-sm">{category.name}</span>
                  </div>

                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {category.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* TAGS */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4 text-[15px]">
          Popular Tags
        </h3>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isActive = activeTag === tag.name;

            return (
              <Link
                key={tag.name}
                href={buildUrl("tag", tag.name)}
                className={`
                  px-3 py-1.5 text-xs rounded-full border transition-all duration-200
                  ${
                    isActive
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }
                `}
              >
                {tag.name} ({tag.count})
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
