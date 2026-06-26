"use client";

import { FaTools, FaUsers, FaStar, FaShieldAlt } from "react-icons/fa";

const stats = [
  {
    icon: <FaTools className="text-base" />,
    value: "50+",
    label: "Powerful Tools",
    iconStyle: "bg-blue-50 border-blue-200/60 text-blue-600",
  },
  {
    icon: <FaUsers className="text-base" />,
    value: "10K+",
    label: "Active Users",
    iconStyle: "bg-emerald-50 border-emerald-200/60 text-emerald-600",
  },
  {
    icon: <FaStar className="text-base" />,
    value: "4.9",
    label: "Average Rating",
    iconStyle: "bg-orange-50 border-orange-200/60 text-orange-600",
  },
  {
    icon: <FaShieldAlt className="text-base" />,
    value: "100%",
    label: "Trusted & Safe",
    iconStyle: "bg-sky-50 border-sky-200/60 text-sky-600",
  },
];

export default function ToolsStats() {
  return (
    <section className="px-6 -mt-12 relative z-10">
      <div className="max-w-[1200px] mx-auto bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-6 md:p-8">
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
                  ${s.iconStyle}
                `}
              >
                {s.icon}
              </div>

              {/* Text */}
              <div className="min-w-0">
                <p className="text-xl font-bold text-slate-900 tracking-tight">
                  {s.value}
                </p>
                <p className="text-[13px] text-slate-500 mt-0.5">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}