"use client";

import CategorySelector from "@/components/ui/CategorySelector";
import ImagePicker from "@/components/ui/ImagePicker";

import FormField from "@/components/ui/form/FormField";
import Input from "@/components/ui/form/Input";
import Textarea from "@/components/ui/form/Textarea";

export default function BasicInfoStep({
  data,
  setData,
  errors = {},
}) {
  const handleChange = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Blog Information
        </h3>
        <p className="text-sm text-gray-500">
          Core details about your blog post
        </p>
      </div>

      {/* ================= CORE SECTION ================= */}
      <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-6 space-y-6">

        <h4 className="text-sm font-semibold text-gray-800">
          Basic Details
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* TITLE */}
          <FormField
            label="Blog Title"
            required
            error={errors?.title}
          >
            <Input
              value={data.title || ""}
              onChange={(e) =>
                handleChange("title", e.target.value)
              }
              placeholder="e.g. How to Build a SaaS Website"
            />
          </FormField>

          {/* CATEGORY */}
          <FormField
            label="Category"
            required
            error={errors?.category}
          >
            <CategorySelector
              value={data.category}
              onChange={(val) =>
                handleChange("category", val)
              }
              type="blog"
            />
          </FormField>

        </div>

        {/* SUBTITLE */}
        <FormField label="Subtitle">
          <Textarea
            value={data.subtitle || ""}
            onChange={(e) =>
              handleChange("subtitle", e.target.value)
            }
            placeholder="Optional short supporting text..."
          />
        </FormField>

        {/* SHORT DESCRIPTION */}
        <FormField
          label="Short Description"
          required
          error={errors?.shortDescription}
        >
          <Textarea
            value={data.shortDescription || ""}
            onChange={(e) =>
              handleChange("shortDescription", e.target.value)
            }
            placeholder="Brief summary..."
          />
        </FormField>

      </div>


      {/* ================= IMAGE ================= */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">

        <h4 className="text-sm font-semibold text-gray-800">
          Featured Image
        </h4>

        <FormField
          label="Upload Image"
          required
          error={errors?.featuredImage}
        >
          <ImagePicker
            value={data.featuredImage}
            onChange={(url) =>
              handleChange("featuredImage", url)
            }
            folder="blogs"
          />
        </FormField>

      </div>

    </div>
  );
}