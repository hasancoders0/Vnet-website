"use client";

import { useEffect, useRef } from "react";

import TagInput from "@/components/ui/TagInput";
import CategorySelector from "@/components/ui/CategorySelector";
import ImagePicker from "@/components/ui/ImagePicker";

import FormField from "@/components/ui/form/FormField";
import Input from "@/components/ui/form/Input";
import Textarea from "@/components/ui/form/Textarea";
import RichTextEditor from "@/components/ui/form/RichTextEditor";

export default function BasicInfoStep({
  data,
  setData,
  autoSlug,
  setAutoSlug,
  errors = {},
}) {
  const initialized = useRef(false);

  const handleChange = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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
        <FormField label="Service Title" required error={errors?.title}>
          <Input
            value={data.title}
            onChange={(e) =>
              handleChange("title", e.target.value)
            }
          />
        </FormField>

        {/* SLUG */}
        <FormField label="Slug">
          <div className="flex gap-2">
            <Input
              value={data.slug}
              onChange={(e) => {
                setAutoSlug(false);
                handleChange("slug", e.target.value);
              }}
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
        </FormField>

        {/* CATEGORY */}
        <div className="md:col-span-2">
          <FormField label="Category" required error={errors?.category}>
            <CategorySelector
              value={data.category}
              onChange={(val) => handleChange("category", val)}
              type="service"
            />
          </FormField>
        </div>

        {/* BADGE */}
        <div className="md:col-span-2">
          <FormField label="Badge">
            <div className="flex gap-2 flex-wrap">
              {badgeOptions.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => handleChange("badge", b)}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    data.badge === b
                      ? "bg-purple-100 text-purple-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </FormField>
        </div>

        {/* SUBTITLE */}
        <div className="md:col-span-2">
          <FormField label="Subtitle">
            <Textarea
              value={data.subtitle}
              onChange={(e) =>
                handleChange("subtitle", e.target.value)
              }
            />
          </FormField>
        </div>

        {/* FULL DESCRIPTION */}
        <div className="md:col-span-2">
          <FormField label="Full Description" required error={errors?.fullDescription}>
            <RichTextEditor
              value={data.fullDescription}
              onChange={(val) =>
                handleChange("fullDescription", val)
              }
            />
          </FormField>
        </div>

        {/* TAGS */}
        <div className="md:col-span-2">
          <FormField label="Tags">
            <TagInput
              value={data.tags || []}
              onChange={(tags) =>
                handleChange("tags", tags)
              }
              max={15}
            />
          </FormField>
        </div>

        {/* IMAGE */}
        <div className="md:col-span-2">
          <FormField label="Featured Image" required error={errors?.featuredImage}>
            <ImagePicker
              value={data.featuredImage}
              onChange={(url) =>
                handleChange("featuredImage", url)
              }
              folder="services"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}