"use client";

import { useState } from "react";
import { FaSearch, FaThLarge, FaList } from "react-icons/fa";

export default function ProductFilters() {
  const [view, setView] = useState("grid");

  return (
    <div className="mb-10 bg-white rounded-2xl border border-slate-200/70 shadow-sm p-3 md:p-4">
      <div className="flex flex-wrap items-center gap-3">

        {/* SEARCH */}
        <div className="flex items-center gap-2.5 flex-1 min-w-[220px] bg-slate-50/50 border border-slate-200/70 rounded-xl px-4 py-2.5">
          <FaSearch className="text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none text-sm text-slate-800 w-full placeholder:text-slate-400"
          />
        </div>

        {/* CATEGORY */}
        <div className="relative min-w-[160px]">
          <select className="appearance-none w-full bg-slate-50/50 border border-slate-200/70 rounded-xl px-4 py-2.5 text-sm text-slate-600 outline-none cursor-pointer transition-all duration-200 hover:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-500/20 pr-10">
            <option>All Categories</option>
            <option>UI Kits</option>
            <option>Themes</option>
            <option>Templates</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>

        {/* PRICE */}
        <div className="relative min-w-[130px]">
          <select className="appearance-none w-full bg-slate-50/50 border border-slate-200/70 rounded-xl px-4 py-2.5 text-sm text-slate-600 outline-none cursor-pointer transition-all duration-200 hover:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-500/20 pr-10">
            <option>Price: All</option>
            <option>Under $25</option>
            <option>$25 - $50</option>
            <option>Over $50</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>

        {/* SORT */}
        <div className="relative min-w-[150px]">
          <select className="appearance-none w-full bg-slate-50/50 border border-slate-200/70 rounded-xl px-4 py-2.5 text-sm text-slate-600 outline-none cursor-pointer transition-all duration-200 hover:border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-500/20 pr-10">
            <option>Sort: Popular</option>
            <option>Newest First</option>
            <option>Price: Low-High</option>
            <option>Price: High-Low</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>

        {/* VIEW TOGGLES */}
        <div className="flex items-center gap-2 ml-auto border-l border-slate-100 pl-3">
          <button
            onClick={() => setView("grid")}
            type="button"
            aria-label="Grid view"
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 ${
              view === "grid"
                ? "border-blue-200/60 bg-blue-50 text-blue-600"
                : "border-slate-200/70 bg-slate-50 text-slate-500 hover:bg-slate-100"
            }`}
          >
            <FaThLarge className="text-sm" />
          </button>

          <button
            onClick={() => setView("list")}
            type="button"
            aria-label="List view"
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 ${
              view === "list"
                ? "border-blue-200/60 bg-blue-50 text-blue-600"
                : "border-slate-200/70 bg-slate-50 text-slate-500 hover:bg-slate-100"
            }`}
          >
            <FaList className="text-sm" />
          </button>
        </div>

      </div>
    </div>
  );
}