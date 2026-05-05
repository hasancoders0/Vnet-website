"use client";

import AppImage from "@/components/ui/AppImage";
import { FaStar, FaArrowRight } from "react-icons/fa";

export default function FeaturedArticle() {
  return (
    <div className="mb-12">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <FaStar className="text-purple-500 text-sm" />
        <h2 className="font-semibold text-gray-800 text-lg">
          Featured Article
        </h2>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden grid md:grid-cols-2">

        {/* IMAGE */}
        <div className="relative w-full h-[260px] md:h-full">
          <AppImage
            src="/website-components/default-image.png"
            alt="featured article"
            fill
            className="object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-7 flex flex-col justify-between">

          {/* TOP */}
          <div>

            {/* BADGE */}
            <span className="inline-block text-[11px] font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-600">
              FEATURED
            </span>

            {/* TITLE */}
            <h3 className="text-[22px] font-semibold text-gray-900 mt-4 leading-snug">
              The Future of Web Development in 2024
            </h3>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-[14px] mt-3 leading-relaxed max-w-[480px]">
              Explore the top trends, tools and technologies that are redefining how we build websites and web applications.
            </p>

            {/* AUTHOR */}
            <div className="flex items-center gap-3 mt-6">
              <AppImage
                src="/website-components/default-image.png"
                alt="author"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="text-[13px] text-gray-500">
                <p className="font-medium text-gray-800">John Doe</p>
                <p>May 12, 2024 • 8 min read</p>
              </div>
            </div>

          </div>

          {/* BUTTON */}
          <div className="mt-6">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-50 text-purple-600 text-sm font-medium hover:bg-purple-600 hover:text-white transition">
              Read Full Article
              <FaArrowRight className="text-[12px]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}