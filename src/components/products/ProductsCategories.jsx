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
import { FiArrowRight } from "react-icons/fi";

const categories = [
  { id: "all", label: "All Products", icon: <FaBox className="text-sm" />, iconStyle: "bg-blue-50 border-blue-200/60 text-blue-600" },
  { id: "wordpress", label: "WordPress Themes", icon: <FaWordpress className="text-sm" />, iconStyle: "bg-sky-50 border-sky-200/60 text-sky-600" },
  { id: "shopify", label: "Shopify Themes", icon: <FaShoppingBag className="text-sm" />, iconStyle: "bg-emerald-50 border-emerald-200/60 text-emerald-600" },
  { id: "ui", label: "UI Kits", icon: <FaCube className="text-sm" />, iconStyle: "bg-purple-50 border-purple-200/60 text-purple-600" },
  { id: "dashboard", label: "Dashboards", icon: <FaChartBar className="text-sm" />, iconStyle: "bg-orange-50 border-orange-200/60 text-orange-600" },
  { id: "code", label: "Code Snippets", icon: <FaCode className="text-sm" />, iconStyle: "bg-slate-100 border-slate-200/70 text-slate-600" },
  { id: "ecommerce", label: "E-Commerce", icon: <FaStore className="text-sm" />, iconStyle: "bg-pink-50 border-pink-200/60 text-pink-600" },
];

export default function ProductsCategories({ onChange }) {
  const [active, setActive] = useState("all");

  const handleClick = (id) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <section className="relative z-10 -mt-12">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-5 md:p-6">
          <div className="flex items-center justify-between gap-6">
            
            {/* CATEGORY LIST */}
            <div className="flex items-center gap-2.5 md:gap-3.5 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`
                    flex flex-col items-center gap-2 min-w-[90px] 
                    px-2 py-1 rounded-xl 
                    transition-all duration-200
                    group
                    ${
                      active === item.id
                        ? "bg-blue-50/50"
                        : "hover:bg-slate-50/50"
                    }
                  `}
                >
                  {/* Icon Container */}
                  <div
                    className={`
                      w-11 h-11 
                      rounded-2xl 
                      border 
                      flex items-center justify-center 
                      transition-transform duration-300
                      group-hover:scale-110
                      ${active === item.id ? item.iconStyle : "bg-slate-50 border-slate-200/70 text-slate-400 group-hover:text-slate-600"}
                    `}
                  >
                    {item.icon}
                  </div>

                  {/* Label */}
                  <span className={`
                    whitespace-nowrap 
                    text-[12px] font-medium 
                    transition-colors duration-200
                    ${active === item.id ? "text-blue-600" : "text-slate-500"}
                  `}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* VIEW ALL BUTTON */}
            <a
              href="/products"
              className="hidden md:inline-flex items-center gap-2 text-[13px] font-medium text-blue-600 hover:text-blue-700 transition-colors group flex-shrink-0"
            >
              View All Categories
              <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}