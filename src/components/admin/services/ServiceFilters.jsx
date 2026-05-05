"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaPlus } from "react-icons/fa";

export default function ServiceFilters({ onSearch, onFilterChange }) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  // SEARCH
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch?.(value);
  };

  // FILTER
  const applyFilters = () => {
    onFilterChange?.({ category, status });
  };

  // NAVIGATE
  const goToCreate = () => {
    router.push("/administrator/services/create");
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm">

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

        {/* LEFT SIDE */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>All Categories</option>
            <option>Development</option>
            <option>Marketing</option>
            <option>Design</option>
          </select>

          {/* STATUS */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          {/* APPLY BUTTON */}
          <button
            onClick={applyFilters}
            className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm hover:bg-gray-100 transition"
          >
            Apply
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">

          {/* SEARCH */}
          <div className="flex items-center bg-gray-100 px-3 py-2.5 rounded-lg w-full sm:w-[220px]">
            <FaSearch className="text-gray-400 mr-2 text-sm" />
            <input
              value={search}
              onChange={handleSearch}
              placeholder="Search services..."
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={goToCreate}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition shadow-sm"
          >
            <FaPlus />
            Add Service
          </button>
        </div>
      </div>
    </div>
  );
}