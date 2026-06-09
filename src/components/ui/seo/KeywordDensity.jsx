"use client";

import { calculateKeywordDensity } from "@/lib/keywordAnalyzer";

export default function KeywordDensity({
  content,
  keyword,
}) {
  const density = calculateKeywordDensity(content, keyword);

  return (
    <div className="text-sm">
      <span className="text-gray-600">Keyword Density:</span>{" "}
      <span className="font-semibold">{density}%</span>

      {density < 0.5 && (
        <span className="text-red-500 ml-2">Too low</span>
      )}

      {density > 2.5 && (
        <span className="text-yellow-500 ml-2">
          Too high (keyword stuffing)
        </span>
      )}

      {density >= 0.5 && density <= 2.5 && (
        <span className="text-green-500 ml-2">Good</span>
      )}
    </div>
  );
}