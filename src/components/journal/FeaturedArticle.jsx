"use client";

import AppImage from "@/components/ui/AppImage";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const fallbackArticle = {
  slug: "",
  title: "The Future of Web Development in 2024",
  description:
    "Explore the top trends, tools, and technologies that are redefining how we build websites and web applications today.",
  date: "May 12, 2024",
  readTime: "8 min read",
  image: "/website-components/author.jpg",
};

export default function FeaturedArticle({ article }) {
  const data = article || fallbackArticle;

  // Cleanly handle conditional wrapping (Link vs Div)
  const Wrapper = data.slug ? Link : "div";
  const wrapperProps = data.slug ? { href: `/journal/${data.slug}` } : {};

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">
          Featured
        </span>
        <h2 className="font-semibold text-slate-900 text-lg">
          Article
        </h2>
      </div>

      {/* Card */}
      <Wrapper
        {...wrapperProps}
        className="group block"
      >
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
            hover:shadow-[0_25px_60px_rgba(59,130,246,0.15)]
            grid 
            md:grid-cols-2
          "
        >
          {/* IMAGE */}
          <div className="relative w-full h-[260px] md:h-full min-h-[320px]">
            <AppImage
              src={data.image || "/website-components/author.jpg"}
              alt={data.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* CONTENT */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Category / Badge */}
              <span className="inline-block w-fit text-[11px] font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                Featured
              </span>

              {/* Title */}
              <h3 className="text-[22px] font-semibold text-slate-900 mt-4 leading-snug">
                {data.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-[14px] mt-3 leading-relaxed max-w-[480px] group-hover:text-slate-600 transition-colors duration-300">
                {data.description}
              </p>
            </div>

            {/* Author / Meta Footer */}
            <div className="mt-8">
              <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
                <AppImage
                  src="/website-components/author.jpg"
                  alt="VNet Team"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border border-slate-100"
                />
                <div className="text-[13px]">
                  <p className="font-medium text-slate-800 leading-tight">VNet Team</p>
                  <p className="text-slate-400 mt-0.5">
                    {data.date} · {data.readTime}
                  </p>
                </div>

                {/* Sliding Read More CTA */}
                <div className="ml-auto">
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-[13px]
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
                    Read Article
                    <FaArrowRight className="text-[11px] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}