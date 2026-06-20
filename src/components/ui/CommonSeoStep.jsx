"use client";
import FormField from "@/components/ui/form/FormField";
import TagInput from "@/components/ui/TagInput";
import SeoFields from "@/components/ui/seo/SeoFields";
import SeoScorePanel from "@/components/ui/seo/SeoScorePanel";
import SeoSuggestions from "@/components/ui/seo/SeoSuggestions";
import SerpPreview from "@/components/ui/seo/SerpPreview";

import useSlugCheck from "@/hooks/useSlugCheck";

import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

// ================= CLEAN HTML =================
const stripHtml = (html = "") => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
};

export default function CommonSeoStep({
  data,
  setData,
  autoSlug,
  setAutoSlug,
  type = "item",
  basePath = "",
}) {
  const seo = data.seo || {};
  if (
  data.featuredImage &&
  !seo.metaImage
) {
  seo.metaImage = data.featuredImage;
}

  const slugStatus = useSlugCheck(seo.slug, data._id, type);

  const updateSeo = (updater) => {
    setData((prev) => {
      const currentSeo = prev.seo || {};

      const nextSeo =
        typeof updater === "function"
          ? updater(currentSeo)
          : { ...currentSeo, ...updater };

      return {
        ...prev,
        seo: nextSeo,
      };
    });
  };

  const suggestSlug = () => {
    const base = seo.slug || type;
    const random = Math.floor(Math.random() * 1000);

    updateSeo({
      slug: `${base}-${random}`,
    });
  };

  const cleanDescription = stripHtml(data.fullDescription || "");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ================= LEFT ================= */}
      <div className="lg:col-span-2 space-y-8">
        {/* HEADER */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">SEO Settings</h3>
          <p className="text-sm text-gray-400">
            Optional optimization for search engines
          </p>
        </div>

        {/* ================= SLUG + KEYWORD ================= */}
        <div className="bg-white/60 backdrop-blur rounded-2xl p-6 space-y-6 shadow-sm border border-gray-100">
          {/* SLUG */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">URL Slug</label>

            <div className="flex items-center gap-2">
              <input
                value={seo.slug || ""}
                onChange={(e) => {
                  setAutoSlug(false);

                  const formatted = e.target.value
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");

                  updateSeo({ slug: formatted });
                }}
                className="flex-1 h-11 px-4 rounded-xl bg-gray-50 border border-gray-100 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition"
              />

              <div className="w-5 flex justify-center">
                {slugStatus === "checking" && (
                  <FaSpinner className="animate-spin text-gray-400 text-sm" />
                )}
                {slugStatus === "available" && (
                  <FaCheckCircle className="text-green-500 text-sm" />
                )}
                {slugStatus === "taken" && (
                  <FaTimesCircle className="text-red-500 text-sm" />
                )}
              </div>

              <button
                type="button"
                onClick={() => setAutoSlug((p) => !p)}
                className={`px-3 py-1.5 text-xs rounded-lg transition ${
                  autoSlug
                    ? "bg-purple-100 text-purple-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {autoSlug ? "Auto" : "Manual"}
              </button>
            </div>

            <p className="text-xs text-gray-400">
              yourdomain.com{basePath ? `/${basePath}` : ""}/{seo.slug}
            </p>

            {slugStatus === "taken" && (
              <div className="flex justify-between text-xs text-red-500">
                <span>Slug already taken</span>
                <button
                  onClick={suggestSlug}
                  className="text-purple-600 hover:underline"
                >
                  Generate new
                </button>
              </div>
            )}
          </div>

          {/* KEYWORD (OPTIONAL) */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">
              Focus Keyword (Optional)
            </label>

            <input
              value={seo.focusKeyword || ""}
              onChange={(e) => updateSeo({ focusKeyword: e.target.value })}
              placeholder="Leave empty if not needed"
              className="w-full h-11 px-4 rounded-xl bg-gray-50 border border-gray-100 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition"
            />

            <p className="text-xs text-gray-400">
              Optional — improves SEO score but not required
            </p>
          </div>

          <FormField label="Tags">
            <TagInput
              value={data.tags || []}
              onChange={(tags) =>
                setData((prev) => ({
                  ...prev,
                  tags,
                }))
              }
              max={15}
            />
          </FormField>
        </div>

        {/* ================= SEO FIELDS ================= */}
        <div className="bg-white/60 backdrop-blur rounded-2xl p-6 shadow-sm border border-gray-100">
          <SeoFields
            data={seo}
            setData={updateSeo}
            titleSource={data.title || ""}
            descriptionSource={cleanDescription}
            imageSource={data.featuredImage || ""}
          />
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="space-y-4 sticky top-6 h-fit">
        <SeoScorePanel
          metaTitle={seo.metaTitle}
          metaDescription={seo.metaDescription}
          fullDescription={cleanDescription}
          slug={seo.slug}
          focusKeyword={seo.focusKeyword || ""} // SAFE
          metaImage={seo.metaImage}
        />

        <SeoSuggestions
          metaTitle={seo.metaTitle}
          metaDescription={seo.metaDescription}
          focusKeyword={seo.focusKeyword || ""} // SAFE
          setData={updateSeo}
        />

        <SerpPreview
          title={seo.metaTitle}
          description={seo.metaDescription}
          slug={seo.slug}
        />
      </div>
    </div>
  );
}
