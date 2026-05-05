"use client";

import { useEffect, useState } from "react";

export default function BasicInfoStep({
  data,
  setData,
  autoSlug,
  setAutoSlug,
}) {
  const [autoMeta, setAutoMeta] = useState(true);
  const [tagInput, setTagInput] = useState("");

  const handleChange = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ================= AUTO META (FIXED LOOP) =================
  useEffect(() => {
    if (!autoMeta) return;

    setData((prev) => {
      const newTitle = prev.title || "";
      const newDesc = prev.shortDescription || "";

      // ✅ Prevent infinite loop
      if (
        prev.metaTitle === newTitle &&
        prev.metaDescription === newDesc
      ) {
        return prev;
      }

      return {
        ...prev,
        metaTitle: newTitle,
        metaDescription: newDesc,
      };
    });
  }, [data.title, data.shortDescription, autoMeta, setData]);

  // ================= TAG SYSTEM (FIXED) =================
  const addTag = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const value = tagInput.trim();
    if (!value) return;

    setData((prev) => {
      const currentTags = prev.tags || [];

      if (currentTags.includes(value)) return prev;
      if (currentTags.length >= 15) return prev;

      return {
        ...prev,
        tags: [...currentTags, value],
      };
    });

    setTagInput("");
  };

  const removeTag = (index) => {
    setData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const badgeOptions = ["Popular", "New", "Featured"];

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Basic Information
        </h3>
        <p className="text-sm text-gray-500">
          Provide core details about your service
        </p>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* TITLE */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Service Title
          </label>
          <input
            value={data.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="h-11 px-4 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* SLUG */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Slug
          </label>

          <div className="flex gap-2">
            <input
              value={data.slug}
              onChange={(e) => {
                setAutoSlug(false);
                handleChange("slug", e.target.value);
              }}
              className="flex-1 h-11 px-4 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <button
              onClick={() => setAutoSlug(!autoSlug)}
              className={`h-11 px-4 rounded-lg text-xs ${
                autoSlug
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Auto
            </button>
          </div>
        </div>

        {/* BADGE */}
        <div className="flex flex-col gap-3 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Badge
          </label>

          <div className="flex gap-2 flex-wrap">
            {badgeOptions.map((b) => (
              <button
                key={b}
                onClick={() => handleChange("badge", b)}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  data.badge === b
                    ? "bg-purple-100 text-purple-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* SUBTITLE */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Subtitle
          </label>
          <textarea
            value={data.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            rows={2}
            className="px-4 py-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* SHORT DESCRIPTION */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Short Description
          </label>
          <textarea
            value={data.shortDescription}
            onChange={(e) =>
              handleChange("shortDescription", e.target.value)
            }
            rows={2}
            className="px-4 py-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* FULL DESCRIPTION */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Full Description
          </label>
          <textarea
            value={data.fullDescription}
            onChange={(e) =>
              handleChange("fullDescription", e.target.value)
            }
            rows={5}
            className="px-4 py-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* ================= TAGS ================= */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Tags
          </label>

          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            placeholder="Press Enter to add tag (max 15)"
            className="h-11 px-4 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <div className="flex flex-wrap gap-2 mt-2">
            {data.tags?.map((tag, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-600 text-xs"
              >
                {tag}
                <button onClick={() => removeTag(i)}>✕</button>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400">
            {data.tags?.length || 0}/15 tags
          </p>
        </div>

        {/* ================= IMAGE ================= */}
        <div className="flex flex-col gap-3 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Image Source
          </label>

          <div className="flex gap-2">
            <button
              onClick={() => handleChange("imageType", "url")}
              className={`px-4 h-10 rounded-lg text-sm ${
                data.imageType === "url"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              URL
            </button>

            <button
              onClick={() => handleChange("imageType", "upload")}
              className={`px-4 h-10 rounded-lg text-sm ${
                data.imageType === "upload"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Upload
            </button>
          </div>
        </div>

        {data.imageType === "url" && (
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Hero Image URL
            </label>
            <input
              value={data.heroImage}
              onChange={(e) =>
                handleChange("heroImage", e.target.value)
              }
              className="h-11 px-4 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        )}

        {data.imageType === "upload" && (
          <div className="md:col-span-2 border-2 border-dashed rounded-xl p-6 text-center text-gray-400 text-sm">
            Upload UI coming next
          </div>
        )}
      </div>

      {/* ================= SEO ================= */}
      <div className="border-t pt-6 space-y-5">

        <div className="flex justify-between items-center">
          <h4 className="text-sm font-semibold text-gray-800">
            SEO Settings
          </h4>

          <button
            onClick={() => setAutoMeta(!autoMeta)}
            className={`text-xs px-3 py-1 rounded ${
              autoMeta
                ? "bg-purple-100 text-purple-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Auto
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">
            Meta Title
          </label>
          <input
            value={data.metaTitle}
            onChange={(e) => {
              setAutoMeta(false);
              handleChange("metaTitle", e.target.value);
            }}
            className="h-11 px-4 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">
            Meta Description
          </label>
          <textarea
            value={data.metaDescription}
            onChange={(e) => {
              setAutoMeta(false);
              handleChange("metaDescription", e.target.value);
            }}
            rows={3}
            className="px-4 py-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
}