"use client";

import { useState } from "react";
import {
  FaBox,
  FaWordpress,
  FaShoppingBag,
  FaCube,
  FaChartBar,
  FaCode,
  FaStore,
} from "react-icons/fa";

const categories = [
  { id: "all", label: "All Products", icon: FaBox },
  { id: "wordpress", label: "WordPress Themes", icon: FaWordpress },
  { id: "shopify", label: "Shopify Themes", icon: FaShoppingBag },
  { id: "ui", label: "UI Kits", icon: FaCube },
  { id: "dashboard", label: "Dashboard Templates", icon: FaChartBar },
  { id: "code", label: "Code Snippets", icon: FaCode },
  { id: "ecommerce", label: "E-Commerce", icon: FaStore },
];

export default function ProductsCategories({ onChange }) {
  const [active, setActive] = useState("all");

  const handleClick = (id) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <section className="relative z-10 -mt-16">
      <div className="max-w-[1240px] mx-auto px-6">

        <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 px-6 py-5 flex items-center justify-between">

          {/* 🔥 LEFT: CATEGORY LIST */}
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">

            {categories.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`flex flex-col items-center gap-2 min-w-[90px] text-xs transition ${
                    active === item.id
                      ? "text-purple-600"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >

                  {/* ICON */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-xl border transition ${
                      active === item.id
                        ? "bg-purple-50 border-purple-200 text-purple-600"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <Icon size={14} />
                  </div>

                  {/* LABEL */}
                  <span className="whitespace-nowrap">
                    {item.label}
                  </span>

                </button>
              );
            })}

          </div>

          {/* 🔥 RIGHT BUTTON */}
          <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition">
            <FaBox size={12} />
            View All Categories
          </button>

        </div>

      </div>
    </section>
  );
}