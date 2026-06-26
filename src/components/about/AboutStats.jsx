"use client";

import { FaSmile, FaCube, FaClipboardList, FaGlobe } from "react-icons/fa";

const stats = [
  {
    icon: FaSmile,
    value: "50K+",
    title: "Happy Customers",
    desc: "Trusted by users worldwide",
    iconStyle: "bg-purple-50 border-purple-200/60 text-purple-600",
  },
  {
    icon: FaCube,
    value: "120+",
    title: "Products & Tools",
    desc: "Digital products and utilities",
    iconStyle: "bg-emerald-50 border-emerald-200/60 text-emerald-600",
  },
  {
    icon: FaClipboardList,
    value: "5+",
    title: "Years of Experience",
    desc: "Delivering quality solutions",
    iconStyle: "bg-orange-50 border-orange-200/60 text-orange-600",
  },
  {
    icon: FaGlobe,
    value: "150+",
    title: "Countries Served",
    desc: "Global reach and growing",
    iconStyle: "bg-blue-50 border-blue-200/60 text-blue-600",
  },
];

export default function AboutStats() {
  return (
    <section className="px-6 -mt-12 relative z-10">
      <div className="max-w-[1200px] mx-auto bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, i) => {
            const Icon = item.icon;

            return (
              <div key={i} className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className={`
                    w-12 h-12 
                    rounded-2xl 
                    border 
                    flex items-center justify-center 
                    flex-shrink-0
                    transition-transform duration-300
                    hover:scale-110
                    ${item.iconStyle}
                  `}
                >
                  <Icon className="text-lg" />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="text-xl font-bold text-slate-900 tracking-tight">
                    {item.value}
                  </p>
                  <p className="text-[14px] font-medium text-slate-800 leading-snug">
                    {item.title}
                  </p>
                  <p className="text-[12px] text-slate-500 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}