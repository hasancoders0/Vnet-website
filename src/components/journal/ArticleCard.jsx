"use client";

import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { FaArrowRight } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";

/* CATEGORY GRADIENTS */
const CATEGORY_GRADIENTS = {
  "web-development":
    "from-blue-600 via-indigo-600 to-cyan-500",

  "seo-marketing":
    "from-purple-600 via-fuchsia-600 to-pink-500",

  "tech-news":
    "from-orange-500 via-amber-500 to-yellow-400",

  design:
    "from-pink-500 via-rose-500 to-purple-500",

  business:
    "from-emerald-600 via-green-600 to-teal-500",
};

export default function ArticleCard({
  slug = "",
  title = "How to Build Scalable Applications with React",
  description = "Best practices and architecture tips for building scalable React applications.",
  category = "Web Development",
  date = "May 8, 2024",
  readTime = "6 min read",
  image = "",
}) {
  const CategoryIcon =
    category?.icon && FaIcons[category.icon] ? FaIcons[category.icon] : null;
  const gradient =
  CATEGORY_GRADIENTS[category?.slug] ||
  "from-[#4f46e5] via-[#7c3aed] to-[#06b6d4]";
  return (
    <Link href={`/journal/${slug}`}>
      <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer">
        {/* IMAGE */}
        <div className="relative w-full h-[170px] overflow-hidden">
          {image ? (
            <AppImage
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center text-white`}>
              {CategoryIcon && (
                <CategoryIcon className="text-4xl mb-3 opacity-90" />
              )}

              <h3 className="text-lg font-semibold px-4 text-center">
                {category?.name || "Journal"}
              </h3>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-5 pb-6 flex flex-col justify-between h-[210px]">
          {/* TOP */}
          <div>
            {/* CATEGORY */}
            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full bg-purple-50 text-purple-600">
              {CategoryIcon && <CategoryIcon className="text-[10px]" />}

              <span>{category?.name || category}</span>
            </div>

            {/* TITLE */}
            <h3 className="mt-3 text-[16px] font-semibold text-gray-900 leading-snug">
              {title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-[13px] text-gray-600 mt-2 leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between mt-5">
            {/* META */}
            <p className="text-[12px] text-gray-500">
              {date} • {readTime}
            </p>

            {/* ARROW */}
            <div className="w-9 h-9 rounded-full border border-purple-200 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition">
              <FaArrowRight className="text-[12px]" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
