"use client";

import { generateSeoSuggestions } from "@/lib/seo/suggestions";

export default function SeoSuggestions({
  metaTitle,
  metaDescription,
  focusKeyword,
  setData,
}) {
  const suggestions = generateSeoSuggestions({
    title: metaTitle,
    description: metaDescription,
    keyword: focusKeyword,
  });

  if (!suggestions.length) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
      <h4 className="text-sm font-semibold text-gray-800">
        AI SEO Suggestions
      </h4>

      {suggestions.map((s, i) => (
        <div
          key={i}
          className="p-3 rounded-lg border border-gray-100 bg-gray-50"
        >
          <p className="text-xs text-gray-500 mb-1">
            {s.label}
          </p>

          <p className="text-sm text-gray-800 mb-2 line-clamp-2">
            {s.value}
          </p>

          <button
            type="button"
            onClick={() => {
              setData((prev) => ({
                ...prev,
                ...(s.type === "title" && {
                  metaTitle: s.value,
                }),
                ...(s.type === "description" && {
                  metaDescription: s.value,
                }),
              }));
            }}
            className="text-xs text-purple-600 hover:underline"
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  );
}