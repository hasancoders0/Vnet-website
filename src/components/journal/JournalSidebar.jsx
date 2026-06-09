"use client";

import { FaSearch } from "react-icons/fa";
import AppImage from "@/components/ui/AppImage";

export default function JournalSidebar() {
  return (
    <aside className="space-y-6">

      {/* 🔍 SEARCH */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500"
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        </div>
      </div>

      {/* 📂 CATEGORIES */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">
          Categories
        </h3>

        <ul className="space-y-3">
          {[
            ["Web Development", 24],
            ["JavaScript", 18],
            ["UI/UX Design", 12],
            ["Performance", 8],
            ["Tools & Resources", 14],
            ["Business", 10],
          ].map(([name, count], i) => (
            <li
              key={i}
              className="flex justify-between items-center text-gray-600 hover:text-purple-600 cursor-pointer text-sm"
            >
              <span>{name}</span>
              <span className="text-gray-400">({count})</span>
            </li>
          ))}
        </ul>

        <button className="mt-4 text-sm text-purple-600 hover:underline">
          View All Categories →
        </button>
      </div>

      {/* 🏷 TAGS */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">
          Popular Tags
        </h3>

        <div className="flex flex-wrap gap-2">
          {[
            "React",
            "Next.js",
            "JavaScript",
            "Tailwind CSS",
            "UI/UX",
            "Node.js",
            "TypeScript",
            "Performance",
            "SEO",
            "Web Design",
          ].map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1.5 text-xs rounded-full bg-gray-50 text-gray-600 border border-gray-100 hover:bg-purple-50 hover:text-purple-600 cursor-pointer transition"
            >
              {tag}
            </span>
          ))}
        </div>

        <button className="mt-4 text-sm text-purple-600 hover:underline">
          View All Tags →
        </button>
      </div>

      {/* 📩 SUBSCRIBE */}
      <div className="relative rounded-2xl overflow-hidden text-white p-6">

        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <AppImage
            src="/website-components/top-bg.png"
            alt="subscribe background"
            fill
            className="object-cover"
          />
        </div>

        <h3 className="font-semibold text-lg mb-2">
          Stay Updated
        </h3>

        <p className="text-sm text-white/80 mb-4">
          Subscribe to get the latest articles and resources in your inbox.
        </p>

        {/* INPUT (FIXED) */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2.5 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 bg-white border border-white/20 outline-none mb-3"
        />

        {/* BUTTON (FIXED) */}
        <button className="w-full py-2.5 rounded-lg bg-white text-purple-600 font-medium hover:bg-gray-100 transition">
          Subscribe →
        </button>

        <p className="text-xs text-white/70 mt-2 text-center">
          No spam. Unsubscribe anytime.
        </p>

      </div>

    </aside>
  );
}