"use client";

export default function SerpPreview({
  title = "",
  description = "",
  slug = "",
}) {
  return (
    <div className="bg-white rounded-xl p-4">

      {/* URL */}
      <p className="text-xs text-gray-500 truncate mb-1">
        https://yourdomain.com/{slug}
      </p>

      {/* TITLE */}
      <h4 className="text-[16px] text-blue-600 hover:underline cursor-pointer leading-snug font-medium">
        {title || "Your page title will appear here"}
      </h4>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 mt-1 leading-snug">
        {description ||
          "Your meta description will appear here. This helps improve click-through rate."}
      </p>
    </div>
  );
}