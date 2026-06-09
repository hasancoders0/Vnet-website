"use client";

import { evaluateSEO } from "@/lib/seo/rules";

export default function SeoChecklist({
  metaTitle,
  metaDescription,
  focusKeyword,
  slug,
  fullDescription = "",
}) {
  const issues = evaluateSEO({
    title: metaTitle,
    description: metaDescription,
    keyword: focusKeyword,
    slug,
    fullDescription,
  });

  // 👉 If no issues, don't render anything (ScorePanel handles success)
  if (!issues.length) return null;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">

      {/* HEADER */}
      <h4 className="text-sm font-semibold text-gray-800">
        SEO Issues
      </h4>

      {/* ISSUE LIST */}
      <div className="space-y-1">
        {issues.map((issue, i) => (
          <p
            key={i}
            className={`text-xs flex items-center gap-2 ${
              issue.type === "error"
                ? "text-red-500"
                : "text-yellow-500"
            }`}
          >
            ⚠ {issue.text}
          </p>
        ))}
      </div>
    </div>
  );
}