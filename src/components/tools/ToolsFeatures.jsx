"use client";

import {
  FaSmile,
  FaBolt,
  FaShieldAlt,
  FaSyncAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaSmile className="text-base" />,
    title: "Easy to Use",
    desc: "Simple, intuitive and user-friendly tools with zero learning curve.",
    iconStyle: "bg-blue-50 border-blue-200/60 text-blue-600",
  },
  {
    icon: <FaBolt className="text-base" />,
    title: "Fast & Reliable",
    desc: "Blazing fast performance and uptime you can always count on.",
    iconStyle: "bg-emerald-50 border-emerald-200/60 text-emerald-600",
  },
  {
    icon: <FaShieldAlt className="text-base" />,
    title: "Secure & Private",
    desc: "Your data is 100% secure, encrypted, and never stored.",
    iconStyle: "bg-orange-50 border-orange-200/60 text-orange-600",
  },
  {
    icon: <FaSyncAlt className="text-base" />,
    title: "Always Updated",
    desc: "Regular updates with new features and continuous improvements.",
    iconStyle: "bg-sky-50 border-sky-200/60 text-sky-600",
  },
];

export default function ToolsFeatures() {
  return (
    <section className="px-6 pb-20">
      <div className="max-w-[1200px] mx-auto bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, i) => (
            <div
              key={i}
              className={`
                flex items-start gap-4 
                p-6 md:p-8 
                transition-colors duration-200
                hover:bg-slate-50/50
                ${
                  i !== features.length - 1 ? "border-b border-slate-100" : ""
                }
                ${
                  i === 1 ? "sm:border-b-0 sm:border-r border-slate-100" : ""
                }
                ${
                  i === 3 ? "sm:border-l border-slate-100" : ""
                }
              `}
            >
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
                {item.icon}
              </div>

              {/* Text */}
              <div>
                <h4 className="text-[15px] font-semibold text-slate-900 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[13px] text-slate-500 mt-1.5 leading-[1.65]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}