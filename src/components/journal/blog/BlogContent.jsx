"use client";

import AppImage from "@/components/ui/AppImage";
import { FaCheckCircle } from "react-icons/fa";

export default function BlogContent({ post }) {
  return (
    <div className="space-y-8">

      {/* 🔗 BREADCRUMB */}
      <p className="text-sm text-white/70">
        Home <span className="mx-2">›</span> Journal{" "}
        <span className="mx-2">›</span>
        <span className="text-white/90">{post.title}</span>
      </p>

      {/* HEADER CARD */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">

        {/* BADGE */}
        <span className="inline-block text-[11px] font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-600 mb-4">
          FEATURED
        </span>

        {/* CATEGORY */}
        <p className="text-sm text-purple-600 font-medium mb-2">
          {post.category}
        </p>

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
            <p className="font-medium text-gray-800">
              {post.author?.name}
            </p>
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

      {/* 🧠 CONTENT */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6 text-gray-700 text-[15px] leading-relaxed">

        {post.content?.map((block, index) => {

          switch (block.type) {

            case "heading":
              return (
                <h2
                  key={index}
                  id={block.id}
                  className="text-[20px] font-semibold text-gray-900 mt-4"
                >
                  {block.text}
                </h2>
              );

            case "paragraph":
              return <p key={index}>{block.text}</p>;

            case "highlight":
              return (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-xl text-sm ${
                    block.variant === "green"
                      ? "bg-green-50 text-green-700"
                      : "bg-purple-50 text-purple-700"
                  }`}
                >
                  <FaCheckCircle className="mt-1 text-base" />
                  <span>{block.text}</span>
                </div>
              );

            case "list":
              return (
                <ul key={index} className="space-y-2">
                  {block.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );

            default:
              return null;
          }
        })}

        {/* HELPFUL */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Was this article helpful?
          </p>

          <button className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-100 transition">
            👍 Yes
          </button>

          <button className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-100 transition">
            👎 No
          </button>
        </div>

      </div>

    </div>
  );
}