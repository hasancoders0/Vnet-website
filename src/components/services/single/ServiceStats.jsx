"use client";

import { FaSmile, FaBriefcase, FaHeadset, FaAward } from "react-icons/fa";

const stats = [
  { label: "Experience", value: "5+ Years", icon: FaAward },
  { label: "Happy Clients", value: "100+", icon: FaSmile },
  { label: "Projects Done", value: "150+", icon: FaBriefcase },
  { label: "Support", value: "24/7", icon: FaHeadset },
];

export default function ServiceStats() {
  return (
    <div className="relative z-20 px-6 -mt-16">
      <div className="max-w-[1240px] mx-auto">
        <div
          className="
            border border-white/10 
            bg-white/5 
            backdrop-blur-xl 
            shadow-[0_10px_40px_rgba(0,0,0,0.3)]
            px-6 py-6
            rounded-t-2xl
        ">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="flex items-center gap-4 px-4 relative justify-center md:justify-start"
                >
                  {/* Divider */}
                  {i !== 0 && (
                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-white/10" />
                  )}

                  {/* Icon */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-blue-400">
                    <Icon className="text-sm" />
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="text-white font-semibold text-sm">
                      {item.value}
                    </h4>
                    <p className="text-white/60 text-xs">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
