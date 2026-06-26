"use client";

import AppImage from "@/components/ui/AppImage";
import CommonBackground from "@/components/ui/CommonBackground";
import { FaBolt } from "react-icons/fa";

const categories = [
  "All Tools",
  "Development",
  "SEO",
  "Design",
  "Productivity",
  "Security",
  "AI Tools",
  "Utilities",
];

export default function ToolsHero() {
  return (
    <CommonBackground>
      <section className="relative overflow-hidden pt-28 md:pt-32 pb-32 lg:pb-40">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ================= LEFT ================= */}
          <div className="text-white">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 text-[11px] px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.1] backdrop-blur-sm text-white/80 uppercase tracking-wider font-medium mb-8">
              <FaBolt className="w-3 h-3 text-cyan-400" />
              Powerful Tools
            </span>

            {/* Title */}
            <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold text-white leading-[1.1] tracking-tight mb-6">
              Powerful Tools for <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Developers & Creators
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-white/60 leading-relaxed max-w-[520px] mb-10">
              Explore our curated collection of powerful tools designed to boost
              productivity, automate workflows, and simplify development tasks.
            </p>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2.5">
              {categories.map((item, i) => (
                <button
                  key={i}
                  className="
                    px-4 py-2 
                    text-[12px] rounded-full 
                    text-white/70 font-medium 
                    bg-white/[0.05] 
                    border border-white/[0.1] 
                    hover:bg-white/[0.1] 
                    hover:border-white/20 
                    hover:text-white/90
                    transition-colors duration-200
                  "
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[580px]">
              <AppImage
                src="/website-components/tools-top.png"
                alt="tools illustration"
                width={580}
                height={480}
                priority
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

        </div>
      </section>
    </CommonBackground>
  );
}