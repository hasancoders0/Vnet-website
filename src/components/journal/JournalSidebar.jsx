"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import { useSearchParams } from "next/navigation";
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

    const value = keyword.trim();

    if (!value) {
      router.push("/journal");
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

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
    <aside className="space-y-6">
      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
          >
            <FaSearch className="text-sm" />
          </button>
        </form>
      </div>

      {/* CATEGORIES */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>

        <ul className="space-y-2">
          {categories.map((category) => {
            const Icon = FaIcons[category.icon] || FaIcons.FaFolder;

            const active = activeCategory === category.slug;

            return (
              <li key={category.slug}>
                <Link
                  href={buildUrl("category", category.slug)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 transition ${
                    active
                      ? "bg-purple-50 text-purple-600"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="text-xs" />

                    <span className="text-sm">{category.name}</span>
                  </div>

                  <span className="text-xs opacity-70">{category.count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* TAGS */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Popular Tags</h3>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.name}
              href={buildUrl("tag", tag.name)}
              className={`px-3 py-1.5 text-xs rounded-full border transition ${
                activeTag === tag.name
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-gray-50 text-gray-600 border-gray-100 hover:bg-purple-50 hover:text-purple-600"
              }`}
            >
              {tag.name} ({tag.count})
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
