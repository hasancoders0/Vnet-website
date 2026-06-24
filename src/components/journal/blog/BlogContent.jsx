"use client";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import AppImage from "@/components/ui/AppImage";
import { FaCheckCircle } from "react-icons/fa";
import SectionRenderer from "./SectionRenderer";
import RelatedArticles from "./RelatedArticles";
import PostNavigation from "./PostNavigation";
import * as FaIcons from "react-icons/fa";

export default function BlogContent({
  post,
  relatedPosts = [],
  adjacentPosts = {},
}) {
  const CategoryIcon = post.category?.icon && FaIcons[post.category.icon];
  return (
    <div className="space-y-8">
      {/* 🔗 BREADCRUMB */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>

        <span>›</span>

        <Link href="/journal" className="hover:text-white transition-colors">
          Journal
        </Link>

        <span>›</span>

        <span className="text-white font-medium">{post.title}</span>
      </div>

      {/* HEADER CARD */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        {/* BADGE */}
        <span className="inline-block text-[11px] font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-600 mb-4">
          FEATURED
        </span>

        {/* CATEGORY */}
        {post.category && (
          <div className="flex items-center gap-2 text-sm text-purple-600 font-medium mb-2">
            {CategoryIcon && <CategoryIcon className="text-sm" />}

            <span>{post.category.name}</span>
          </div>
        )}

        {/* TITLE */}
        <h1 className="text-[34px] md:text-[42px] font-bold text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-[15px] leading-relaxed max-w-[700px] mb-6">
          {post.description}
        </p>

        {/* AUTHOR */}
        <div className="flex items-center gap-4">
          <AppImage
            src={post.author?.image}
            alt={post.author?.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-800">{post.author?.name}</p>
            <p>
              {post.date} • {post.readTime} • {post.views}
            </p>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative w-full h-[320px] rounded-2xl overflow-hidden mt-6">
          <AppImage
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="space-y-8">
        {(post.sections || []).map((section, index) => (
          <SectionRenderer key={section.id || index} section={section} />
        ))}

        {/* HELPFUL */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">Was this article helpful?</p>

            <button className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-100 transition">
              👍 Yes
            </button>

            <button className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-100 transition">
              👎 No
            </button>
          </div>
        </div>
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
