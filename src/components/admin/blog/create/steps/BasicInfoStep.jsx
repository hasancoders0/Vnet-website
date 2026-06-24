"use client";

import CategorySelector from "@/components/ui/CategorySelector";
import ImagePicker from "@/components/ui/ImagePicker";

import FormField from "@/components/ui/form/FormField";
import Input from "@/components/ui/form/Input";
import Textarea from "@/components/ui/form/Textarea";

export default function BasicInfoStep({ data, setData, errors = {} }) {
  const handleChange = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900">
          Blog Information
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Core details about your blog post
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT SIDE */}
        <div className="xl:col-span-7">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                Basic Details
              </h4>

              <p className="mt-1 text-xs text-gray-500">
                Main information about this article
              </p>
            </div>

            {/* TITLE */}
            <FormField label="Blog Title" required error={errors?.title}>
              <Input
                value={data.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. The Ultimate Guide to Modern Website Development"
              />
            </FormField>

            {/* CATEGORY */}
            <FormField label="Category" required error={errors?.category}>
              <CategorySelector
                value={data.category}
                onChange={(val) => handleChange("category", val)}
                type="blog"
              />
            </FormField>

            {/* SUBTITLE */}
            <FormField label="Subtitle">
              <Textarea
                rows={3}
                value={data.subtitle || ""}
                onChange={(e) => handleChange("subtitle", e.target.value)}
                placeholder="Optional supporting headline..."
              />
            </FormField>

            {/* DESCRIPTION */}
            <FormField
              label="Short Description"
              required
              error={errors?.shortDescription}
            >
              <Textarea
                rows={5}
                value={data.shortDescription || ""}
                onChange={(e) =>
                  handleChange("shortDescription", e.target.value)
                }
                placeholder="Short summary for listings, SEO and previews..."
              />
            </FormField>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="xl:col-span-5">
          <div className="sticky top-24">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900">
                  Featured Image
                </h4>

                <p className="mt-1 text-xs text-gray-500">
                  Main image shown in blog listings and article pages
                </p>
              </div>

              <FormField
                label="Upload Image"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
