// src/components/tools/ToolsHero.jsx

import AppImage from "@/components/ui/AppImage";

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
    <section className="relative w-full overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <AppImage
          src="/website-components/top-bg.png"
          alt="background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 pt-24 pb-36 md:pb-44 grid md:grid-cols-2 gap-12 items-center">

        {/* ================= LEFT ================= */}
        <div className="text-white">

          {/* Badge */}
          <span className="inline-block text-xs px-4 py-1.5 rounded-full bg-white/10 backdrop-blur mb-6">
            Powerful Tools
          </span>

          {/* Title */}
          <h1 className="text-[38px] md:text-[52px] font-bold leading-tight">
            Powerful Tools for <br />
            Developers &{" "}
            <span className="text-blue-400">
              Creators
            </span>
          </h1>

          {/* Description */}
          <p className="text-white/70 mt-5 max-w-[520px] leading-relaxed">
            Explore our curated collection of powerful tools designed to boost
            productivity, automate workflows, and simplify development tasks.
          </p>

          {/* CATEGORY PILLS */}
          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map((item, i) => (
              <button
                key={i}
                className="px-4 py-1.5 text-xs rounded-full 
                bg-white/10 hover:bg-white/20 
                transition duration-200"
              >
                {item}
              </button>
            ))}
          </div>

        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="w-full flex justify-center md:justify-end">

          <div className="w-full max-w-[620px]">

            <AppImage
              src="/website-components/tools-top.png"
              alt="tools illustration"
              width={620}
              height={520}
              priority
              className="w-full h-auto object-contain"
            />

          </div>

        </div>

      </div>
    </section>
  );
}