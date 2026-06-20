"use client";

import { FaSmile, FaBriefcase, FaHeadset, FaAward } from "react-icons/fa";

const stats = [
  {
    label: "Experience",
    value: "5+ Years",
    icon: FaAward,
  },
  {
    label: "Happy Clients",
    value: "100+",
    icon: FaSmile,
  },
  {
    label: "Projects Done",
    value: "150+",
    icon: FaBriefcase,
  },
  {
    label: "Support",
    value: "24/7",
    icon: FaHeadset,
  },
];

export default function ServiceStats() {
  return (
    <div className="relative z-20 px-4 md:px-6 -mt-12 md:-mt-24">
      <div className="max-w-[1240px] mx-auto">
        <div
          className="
            rounded-t-2xl
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            shadow-[0_10px_40px_rgba(0,0,0,0.3)]
            px-4 md:px-6
            py-5 md:py-6
          "
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5">
            {stats.map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="
                    relative
                    flex items-center
                    gap-3
                    px-2 md:px-4
                  "
                >
                  {/* Desktop Divider */}
                  {i !== 0 && (
                    <div
                      className="
                        hidden md:block
                        absolute
                        left-0
                        top-1/2
                        -translate-y-1/2
                        h-12
                        w-px
                        bg-gradient-to-b
                        from-transparent
                        via-white/15
                        to-transparent
                      "
                    />
                  )}

                  {/* Icon */}
                  <div
                    className="
                      w-10 h-10
                      md:w-12 md:h-12
                      flex items-center justify-center
                      rounded-2xl
                      bg-white/5
                      border border-white/10
                      text-blue-400
                      flex-shrink-0
                    "
                  >
                    <Icon className="text-sm md:text-base" />
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="text-white font-semibold text-base md:text-lg leading-none mb-1">
                      {item.value}
                    </h4>

                    <p className="text-white/60 text-[11px] md:text-xs">
                      {item.label}
                    </p>
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
