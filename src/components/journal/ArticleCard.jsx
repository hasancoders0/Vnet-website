"use client";

import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { FaArrowRight } from "react-icons/fa";

export default function ArticleCard({
  slug = "",
  title = "How to Build Scalable Applications with React",
  description = "Best practices and architecture tips for building scalable React applications.",
  category = "Web Development",
  date = "May 8, 2024",
  readTime = "6 min read",
  image = "/website-components/default-image.png",
}) {
  return (
    <Link href={`/journal/${slug}`}>
      <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer">

        {/* IMAGE */}
        <div className="relative w-full h-[170px] overflow-hidden">
          <AppImage
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* CONTENT */}
        <div className="p-5 pb-6 flex flex-col justify-between h-[210px]">

          {/* TOP */}
          <div>
            {/* CATEGORY */}
            <span className="inline-block text-[11px] font-medium px-3 py-1 rounded-full bg-purple-50 text-purple-600">
              {category}
            </span>

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