"use client";

import SeoFields from "@/components/ui/SeoFields";

export default function SeoStep({ data, setData }) {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          SEO Settings
        </h3>
        <p className="text-sm text-gray-500">
          Optimize how your service appears on search engines
        </p>
      </div>

      {/* ✅ DIRECT PASS (IMPORTANT) */}
      <SeoFields
        data={data}
        setData={setData}
        titleSource={data.title}
        descriptionSource={data.shortDescription}
        imageSource={data.featuredImage}
      />
    </div>
  );
}