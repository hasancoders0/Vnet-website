"use client";

import CategorySelector from "@/components/ui/CategorySelector";
import ImagePicker from "@/components/ui/ImagePicker";

import FormField from "@/components/ui/form/FormField";
import Input from "@/components/ui/form/Input";
import Textarea from "@/components/ui/form/Textarea";
import RichTextEditor from "@/components/ui/form/RichTextEditor";

import { useCallback } from "react";

export default function BasicInfoStep({ data, setData, errors = {} }) {
  // ================= SAFE UPDATE =================
  const updateField = useCallback(
    (key, value) => {
      setData((prev) => {
        if (prev[key] === value) return prev;

        return {
          ...prev,
          [key]: value,
        };
      });
    },
    [setData],
  );

  const badgeOptions = ["Popular", "New", "Featured"];

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Basic Information
        </h3>
        <p className="text-sm text-gray-500">Core details about your service</p>
      </div>

      {/* ================= SECTION: CORE ================= */}
      <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-6 space-y-6">
        <h4 className="text-sm font-semibold text-gray-800">Core Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TITLE */}
          <div className="space-y-1">
            <FormField label="Service Title" required error={errors?.title}>
              <Input
                value={data.title || ""}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="e.g. Advanced SaaS Web Application Development"
                className={`${
                  errors?.title ? "border-red-300 focus:ring-red-500" : ""
                }`}
              />
            </FormField>
          </div>

          {/* CATEGORY */}
          <div className="space-y-1">
            <FormField label="Category" required error={errors?.category}>
              <CategorySelector
                value={data.category || ""}
                onChange={(val) => updateField("category", val)}
                type="service"
              />
            </FormField>
          </div>
        </div>

        {/* BADGE */}
        <div>
          <FormField label="Badge">
            <div className="flex gap-2 flex-wrap">
              {badgeOptions.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => updateField("badge", b)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition
                    ${
                      data.badge === b
                        ? "bg-purple-600 text-white shadow-sm"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {b}
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-1">
              Highlight your service (optional)
            </p>
          </FormField>
        </div>
      </div>

      {/* ================= SECTION: DESCRIPTION ================= */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-6">
        <h4 className="text-sm font-semibold text-gray-800">Description</h4>

        {/* SUBTITLE */}
        <FormField label="Subtitle">
          <Textarea
            value={data.subtitle || ""}
            onChange={(e) => updateField("subtitle", e.target.value)}
            placeholder="Short supporting text..."
          />
          <p className="text-xs text-gray-400">
            Appears below the title in listings
          </p>
        </FormField>

        {/* FULL DESCRIPTION */}
        <FormField
          label="Full Description"
          required
          error={errors?.fullDescription}
        >
          <RichTextEditor
            value={data.fullDescription || ""}
            onChange={(val) => updateField("fullDescription", val)}
          />

          {errors?.fullDescription && (
            <p className="text-xs text-red-500 mt-1">
              {errors.fullDescription}
            </p>
          )}
        </FormField>
      </div>

      {/* ================= SECTION: IMAGE ================= */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
        <h4 className="text-sm font-semibold text-gray-800">Media</h4>

        <FormField
          label="Featured Image"
          required
          error={errors?.featuredImage}
        >
          <ImagePicker
            value={data.featuredImage}
            onChange={(url) => {
              handleChange("featuredImage", url);

              setData((prev) => ({
                ...prev,
                seo: {
                  ...prev.seo,
                  metaImage: prev.seo?.metaImage || url,
                },
              }));
            }}
            folder="blogs"
          />
        </FormField>

        <p className="text-xs text-gray-400">Recommended size: 1200 × 800px</p>
      </div>
    </div>
  );
}
