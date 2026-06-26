"use client";

import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { FaArrowRight } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";

/* CATEGORY GRADIENTS */
const CATEGORY_GRADIENTS = {
  "web-development": "from-blue-600 via-indigo-600 to-cyan-500",
  "seo-marketing": "from-purple-600 via-fuchsia-600 to-pink-500",
  "tech-news": "from-orange-500 via-amber-500 to-yellow-400",
  design: "from-pink-500 via-rose-500 to-purple-500",
  business: "from-emerald-600 via-green-600 to-teal-500",
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
    <Link href={`/journal/${slug}`} className="group relative block">
      {/* Gradient border on hover - Uses the category's gradient color */}
      <div
        className={`
          absolute -inset-[1px]
          rounded-2xl
          bg-gradient-to-br
          ${gradient}
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
        `}
      />

      {/* Card */}
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border border-slate-200/70
          bg-white
          transition-all
          duration-500
          hover:-translate-y-1.5
          group-hover:bg-slate-50
        "
      >
        {/* IMAGE */}
        <div className="relative w-full h-[200px] overflow-hidden">
          {image ? (
            <AppImage
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center text-white transition-transform duration-700 group-hover:scale-110`}
            >
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
        <div className="p-4 flex flex-col flex-grow">
          {/* CATEGORY PILL */}
          <span className="w-fit rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 mb-3">
            {category?.name || category}
          </span>

          {/* TITLE */}
          <h3 className="text-[15px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-1.5">
            {title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-[13px] text-gray-500 leading-[1.65] line-clamp-2 flex-grow group-hover:text-gray-600 transition-colors duration-300">
            {description}
          </p>

          {/* FOOTER */}
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            {/* META */}
            <p className="text-[11px] text-gray-400">
              {date} · {readTime}
            </p>

            {/* READ MORE REVEAL */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                text-[12px]
                font-semibold
                text-blue-600
                opacity-0
                translate-y-2
                group-hover:opacity-100
                group-hover:translate-y-0
                transition-all
                duration-500
              "
            >
              Read More
              <FaArrowRight className="text-[11px] transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
