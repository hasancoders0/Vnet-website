"use client";

export default function SeoPreview({
  title = "",
  description = "",
  url = "yourdomain.com/page",
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white">

      <p className="text-xs text-gray-500 truncate mb-1">
        https://{url}
      </p>

      <h4 className="text-blue-600 text-base font-medium line-clamp-2 hover:underline">
        {title || "Your page title will appear here"}
      </h4>

      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
        {description ||
          "Your meta description will appear here."}
      </p>
    </div>
  );
}