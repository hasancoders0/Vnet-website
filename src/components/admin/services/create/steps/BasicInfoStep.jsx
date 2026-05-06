"use client";

import { useEffect, useState, useRef } from "react";
import TagInput from "@/components/ui/TagInput";
import CategorySelector from "@/components/ui/CategorySelector";
import ImagePicker from "@/components/ui/ImagePicker";

export default function BasicInfoStep({
  data,
  setData,
  autoSlug,
  setAutoSlug,
}) {
  const initialized = useRef(false);

  const handleChange = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ================= SAFE AUTO META (ONLY IMAGE SYNC) =================
  // We no longer manage SEO here, but we keep image sync safe
  useEffect(() => {
    if (initialized.current) return;

    setData((prev) => ({
      ...prev,
      metaImage: prev.metaImage || prev.featuredImage || "",
    }));

    initialized.current = true;
  }, [setData]);

  const badgeOptions = ["Popular", "New", "Featured"];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Basic Information
        </h3>
        <p className="text-sm text-gray-500">
          Provide core details about your service
        </p>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TITLE */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Service Title
          </label>
          <input
            value={data.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            className="h-11 px-4 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* SLUG */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Slug</label>

          <div className="flex gap-2">
            <input
              value={data.slug || ""}
              onChange={(e) => {
                setAutoSlug(false);
                handleChange("slug", e.target.value);
              }}
              className="flex-1 h-11 px-4 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setAutoSlug(!autoSlug)}
              className={`px-4 rounded-lg text-xs ${
                autoSlug
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Auto
            </button>
          </div>
        </div>
        {/* CATEGORY */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <CategorySelector
            value={data.category}
            onChange={(val) =>
              setData((prev) => ({
                ...prev,
                category: val,
              }))
            }
            type="service"
          />
        </div>
        {/* BADGE */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <label className="text-sm font-medium text-gray-700">Badge</label>

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
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Subtitle</label>
          <textarea
            value={data.subtitle || ""}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            rows={2}
            className="px-4 py-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* SHORT DESCRIPTION */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Short Description
          </label>
          <textarea
            value={data.shortDescription || ""}
            onChange={(e) => handleChange("shortDescription", e.target.value)}
            rows={2}
            className="px-4 py-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* FULL DESCRIPTION */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Full Description
          </label>
          <textarea
            value={data.fullDescription || ""}
            onChange={(e) => handleChange("fullDescription", e.target.value)}
            rows={5}
            className="px-4 py-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* TAGS */}
        <div className="md:col-span-2">
          <TagInput
            value={data.tags || []}
            onChange={(tags) => handleChange("tags", tags)}
            max={15}
          />
        </div>

        {/* FEATURED IMAGE */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Featured Image
          </label>

          <ImagePicker
            value={data.featuredImage}
            onChange={(url) => handleChange("featuredImage", url)}
            folder="services"
          />
        </div>
      </div>
    </div>
  );
}
