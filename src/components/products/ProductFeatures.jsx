"use client";

import {
  FaBolt,
  FaShieldAlt,
  FaSyncAlt,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBolt className="text-base" />,
    title: "Instant Access",
    desc: "Get your products instantly after purchase.",
    iconStyle: "bg-blue-50 border-blue-200/60 text-blue-600",
  },
  {
    icon: <FaShieldAlt className="text-base" />,
    title: "Secure Payment",
    desc: "100% secure payments through trusted gateways.",
    iconStyle: "bg-emerald-50 border-emerald-200/60 text-emerald-600",
  },
  {
    icon: <FaSyncAlt className="text-base" />,
    title: "Regular Updates",
    desc: "Free lifetime updates on all digital products.",
    iconStyle: "bg-orange-50 border-orange-200/60 text-orange-600",
  },
  {
    icon: <FaHeadset className="text-base" />,
    title: "Dedicated Support",
    desc: "We’re here to help you anytime you need.",
    iconStyle: "bg-sky-50 border-sky-200/60 text-sky-600",
  },
];

export default function ProductFeatures() {
  return (
    <section className="px-6 pb-20">
      <div className="max-w-[1200px] mx-auto bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {features.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-6 lg:p-8 hover:bg-slate-50/50 transition-colors duration-200"
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