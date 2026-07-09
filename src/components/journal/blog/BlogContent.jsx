"use client";

import Link from "@/components/ui/AppLink";
import AppImage from "@/components/ui/AppImage";
import * as FaIcons from "react-icons/fa";
import SectionRenderer from "./SectionRenderer";
import RelatedArticles from "./RelatedArticles";
import PostNavigation from "./PostNavigation";

export default function BlogContent({
  post,
  relatedPosts = [],
  adjacentPosts = {},
}) {
  const CategoryIcon = post.category?.icon && FaIcons[post.category.icon];

  return (
    <div className="space-y-10">
      {/* BREADCRUMB */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <Link
          href="/"
          className="hover:text-slate-700 transition-colors duration-200"
        >
          Home
        </Link>
        <span className="text-slate-300">/</span>
        <Link
          href="/journal"
          className="hover:text-slate-700 transition-colors duration-200"
        >
          Journal
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-700 font-medium truncate max-w-[250px]">
          {post.title}
        </span>
      </nav>

      {/* HEADER CARD */}
      <div className="bg-white rounded-2xl p-8 md:p-10 border border-slate-200/70">
        {/* BADGE & CATEGORY */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">
            Featured
          </span>

          {post.category && (
            <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
              {CategoryIcon && <CategoryIcon className="text-xs" />}
              <span>{post.category.name}</span>
            </div>
          )}
        </div>

        {/* TITLE */}
        <h1 className="text-[32px] md:text-[42px] font-bold text-slate-900 leading-tight tracking-tight mb-4">
          {post.title}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-slate-500 text-[16px] leading-relaxed max-w-[720px] mb-8">
          {post.description}
        </p>

        {/* AUTHOR & META */}
        <div className="flex items-center gap-4 border-t border-slate-100 pt-6 mb-8">
          <AppImage
            src={post.author?.image}
            alt={post.author?.name}
            width={44}
            height={44}
            className="w-11 h-11 rounded-full object-cover border border-slate-100"
          />
          <div>
            <p className="text-sm font-semibold text-slate-800 leading-tight">
              {post.author?.name}
            </p>
            <p className="text-[13px] text-slate-400 mt-0.5">
              {post.date} · {post.readTime} · {post.views} views
            </p>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden bg-slate-100">
          <AppImage
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* CONTENT SECTIONS */}
      <div className="space-y-8">
        {(post.sections || []).map((section, index) => (
          <SectionRenderer key={section.id || index} section={section} />
        ))}

        {/* HELPFUL SECTION */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/70">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm font-medium text-slate-700">
              Was this article helpful?
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="
                  px-5 py-2.5 rounded-xl 
                  border border-slate-200 
                  text-sm font-medium text-slate-600 
                  bg-white
                  hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800
                  active:scale-95
                  transition-all duration-200
                "
              >
                Yes 👍
              </button>
              <button
                type="button"
                className="
                  px-5 py-2.5 rounded-xl 
                  border border-slate-200 
                  text-sm font-medium text-slate-600 
                  bg-white
                  hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800
                  active:scale-95
                  transition-all duration-200
                "
              >
                No 👎
              </button>
            </div>
          </div>
        </div>

        {/* POST NAVIGATION */}
        <PostNavigation
          previous={adjacentPosts.previous}
          next={adjacentPosts.next}
        />

        {/* RELATED ARTICLES */}
        <RelatedArticles articles={relatedPosts} />
      </div>
    </div>
  );
}
