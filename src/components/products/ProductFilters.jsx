"use client";

import { FaSearch, FaThLarge, FaList } from "react-icons/fa";

export default function ProductFilters() {
  return (
    <div className="mb-10">

      <div className="flex flex-wrap items-center gap-3 bg-white 
        border border-gray-200 rounded-2xl px-3 py-3 shadow-sm">

        {/* 🔍 SEARCH */}
        <div className="flex items-center gap-2 flex-1 min-w-[220px] bg-gray-50 rounded-xl px-4 py-2">
          <FaSearch className="text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
          />
        </div>

        {/* 📂 CATEGORY */}
        <select className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600">
          <option>All Categories</option>
        </select>

        {/* 💰 PRICE */}
        <select className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600">
          <option>Price: All</option>
        </select>

        {/* 🔽 SORT */}
        <select className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600">
          <option>Sort: Popular</option>
        </select>

        {/* 🔲 VIEW TOGGLE */}
        <div className="flex items-center gap-2 ml-auto">

          <button className="w-10 h-10 rounded-xl border border-purple-200 
            bg-purple-50 flex items-center justify-center text-purple-600">
            <FaThLarge />
          </button>

          <button className="w-10 h-10 rounded-xl border border-gray-200 
            flex items-center justify-center text-gray-500 hover:bg-gray-100 transition">
            <FaList />
          </button>

        </div>

      </div>

    </div>
  );
}