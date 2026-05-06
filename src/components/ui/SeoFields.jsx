"use client";

import { useEffect, useState, useRef } from "react";
import ImagePicker from "@/components/ui/ImagePicker";
import SeoPreview from "@/components/ui/SeoPreview";

export default function SeoFields({
  data,
  setData,
  titleSource = "",
  descriptionSource = "",
  imageSource = "",
}) {
  const [auto, setAuto] = useState(true);
  const initialized = useRef(false);

  // ================= AUTO GENERATE (RUN ONCE ONLY) =================
  useEffect(() => {
    if (!auto || initialized.current) return;

    setData((prev) => ({
      ...prev,
      metaTitle: prev.metaTitle || titleSource || "",
      metaDescription:
        prev.metaDescription ||
        descriptionSource?.slice(0, 160) ||
        "",
      metaImage: prev.metaImage || imageSource || "",
    }));

    initialized.current = true;
  }, [auto, titleSource, descriptionSource, imageSource, setData]);

  // ================= SEO SCORE =================
  const calculateSEOScore = () => {
    let score = 0;

    const title = data.metaTitle || "";
    const desc = data.metaDescription || "";
    const slug = data.slug || "";
    const image = data.metaImage || "";
    const keyword = data.title || "";

    if (title.length >= 50 && title.length <= 60) score += 20;
    if (desc.length >= 120 && desc.length <= 160) score += 20;

    if (keyword && title.toLowerCase().includes(keyword.toLowerCase()))
      score += 15;

    if (keyword && desc.toLowerCase().includes(keyword.toLowerCase()))
      score += 15;

    if (image) score += 10;
    if (slug) score += 10;
    if (title.length > 0) score += 10;

    return score;
  };

  const seoScore = calculateSEOScore();

  const scoreColor =
    seoScore >= 80
      ? "text-green-600"
      : seoScore >= 50
      ? "text-yellow-500"
      : "text-red-500";

  const barColor =
    seoScore >= 80
      ? "bg-green-500"
      : seoScore >= 50
      ? "bg-yellow-400"
      : "bg-red-500";

  // ================= LENGTH QUALITY =================
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

  const titleScore = getScore(data.metaTitle || "", 50, 60);
  const descScore = getScore(data.metaDescription || "", 120, 160);

  return (
    <div className="space-y-6 border-t pt-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            SEO Settings
          </h3>
          <p className="text-sm text-gray-500">
            Optimize how your page appears in search engines
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAuto((p) => !p)}
          className={`px-3 py-1.5 text-xs rounded-lg transition ${
            auto
              ? "bg-purple-100 text-purple-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {auto ? "Auto" : "Manual"}
        </button>
      </div>

      {/* SEO SCORE */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">SEO Score</span>
          <span className={`font-semibold ${scoreColor}`}>
            {seoScore}/100
          </span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${barColor}`}
            style={{ width: `${seoScore}%` }}
          />
        </div>
      </div>

      {/* META TITLE */}
      <div className="space-y-1">
        <label className="text-sm text-gray-600">Meta Title</label>

        <input
          value={data.metaTitle || ""}
          onChange={(e) => {
            const value = e.target.value;

            setAuto(false);

            setData((prev) => ({
              ...prev,
              metaTitle: value,
            }));
          }}
          className="w-full h-11 px-4 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <div className="flex justify-between text-xs">
          <span className="text-gray-400">
            {(data.metaTitle || "").length}/60
          </span>
          <span className={getColor(titleScore)}>
            {titleScore.toUpperCase()}
          </span>
        </div>
      </div>

      {/* META DESCRIPTION */}
      <div className="space-y-1">
        <label className="text-sm text-gray-600">
          Meta Description
        </label>

        <textarea
          value={data.metaDescription || ""}
          onChange={(e) => {
            const value = e.target.value;

            setAuto(false);

            setData((prev) => ({
              ...prev,
              metaDescription: value,
            }));
          }}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none"
        />

        <div className="flex justify-between text-xs">
          <span className="text-gray-400">
            {(data.metaDescription || "").length}/160
          </span>
          <span className={getColor(descScore)}>
            {descScore.toUpperCase()}
          </span>
        </div>
      </div>

      {/* META IMAGE */}
      <div className="space-y-2">
        <label className="text-sm text-gray-600">
          Open Graph Image
        </label>

        <ImagePicker
          value={data.metaImage}
          onChange={(val) =>
            setData((prev) => ({
              ...prev,
              metaImage: val,
            }))
          }
          folder="services"
        />

        <p className="text-xs text-gray-400">
          Recommended: 1200 × 630 px
        </p>
      </div>

      {/* GOOGLE PREVIEW */}
      <div className="space-y-2">
        <label className="text-sm text-gray-600">
          Search Preview
        </label>

        <SeoPreview
          title={data.metaTitle}
          description={data.metaDescription}
          url={`yourdomain.com/${data.slug || "your-page"}`}
        />
      </div>

    </div>
  );
}