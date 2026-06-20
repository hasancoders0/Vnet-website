"use client";

import ImagePicker from "@/components/ui/ImagePicker";
import { autoOptimizeSEO } from "@/lib/seo";
import { SEO_CONFIG } from "@/config/seo.config";

// ================= CLEAN TEXT =================
const cleanText = (text = "") => text.replace(/<[^>]*>/g, "").trim();

export default function SeoFields({
  data,
  setData,
  titleSource = "",
  descriptionSource = "",
  imageSource = "",
}) {
  const {
    metaTitle = "",
    metaDescription = "",
    metaImage = "",
    focusKeyword = "",
  } = data;

  const cleanedDescription = cleanText(descriptionSource);


  // ================= AUTO FIX =================
  const handleAutoFix = () => {
    const optimized = autoOptimizeSEO({
      title: titleSource,
      fullDescription: cleanedDescription,
      keyword: focusKeyword,
      image: imageSource,
    });

    setData((prev) => ({
      ...prev,
      ...optimized,
    }));
  };

  // ================= LENGTH SCORE =================
  const getScore = (text, min, max) => {
    const len = text.length;

    if (len === 0) return "poor";
    if (len >= min && len <= max) return "good";
    if (len >= min - 10 && len <= max + 20) return "ok";

    return "poor";
  };

  const getColor = (score) => {
    if (score === "good") return "text-green-600";

    if (score === "ok") return "text-yellow-500";

    return "text-red-500";
  };

  const titleScore = getScore(
    metaTitle,
    SEO_CONFIG.title.min,
    SEO_CONFIG.title.max,
  );

  const descScore = getScore(
    metaDescription,
    SEO_CONFIG.description.min,
    SEO_CONFIG.description.max,
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            SEO Optimization
          </h3>

          <p className="text-sm text-gray-500">
            Optimize visibility and ranking
          </p>
        </div>

        <button
          type="button"
          onClick={handleAutoFix}
          className="px-3 py-1.5 text-xs rounded-lg bg-purple-600 text-white hover:opacity-90 transition"
        >
          Auto Fix
        </button>
      </div>

      {/* META TITLE */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Meta Title</label>

        <input
          value={metaTitle}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              metaTitle: e.target.value,
            }))
          }
          className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none text-sm"
        />

        <div className="flex justify-between text-xs">
          <span className="text-gray-400">
            {metaTitle.length}/{SEO_CONFIG.title.max}
          </span>

          <span className={getColor(titleScore)}>
            {titleScore.toUpperCase()}
          </span>
        </div>
      </div>

      {/* META DESCRIPTION */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Meta Description
        </label>

        <textarea
          value={metaDescription}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              metaDescription: e.target.value,
            }))
          }
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none text-sm resize-none"
        />

        <div className="flex justify-between text-xs">
          <span className="text-gray-400">
            {metaDescription.length}/{SEO_CONFIG.description.max}
          </span>

          <span className={getColor(descScore)}>{descScore.toUpperCase()}</span>
        </div>
      </div>

      {/* OPEN GRAPH IMAGE */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Open Graph Image
        </label>

        <ImagePicker
          value={metaImage}
          onChange={(val) =>
            setData((prev) => ({
              ...prev,
              metaImage: val,
            }))
          }
          folder="services"
        />

        <p className="text-xs text-gray-400">Recommended: 1200 × 630 px</p>
      </div>
    </div>
  );
}
