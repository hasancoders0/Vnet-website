"use client";

import AppImage from "@/components/ui/AppImage";
import { FaArrowRight } from "react-icons/fa";

export default function JournalHero() {
  return (
    <section className="relative w-full overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <AppImage
          src="/website-components/tools-background.png"
          alt="journal background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 pt-24 pb-32 md:pb-40 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ================= LEFT ================= */}
        <div className="text-white">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 text-xs px-4 py-1.5 rounded-full bg-white/10 backdrop-blur mb-5 border border-white/10">
            ⭐ Our Journal
          </span>

          {/* Title */}
          <h1 className="text-[38px] md:text-[56px] font-bold leading-tight mb-6">
            Insights, Ideas &{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Inspiration
            </span>
          </h1>

          {/* Description */}
          <p className="text-white/70 max-w-[520px] mb-8 leading-relaxed">
            Explore our latest articles, tutorials and industry insights to help
            you grow your skills and build better digital experiences.
          </p>

          {/* CTA + USERS */}
          <div className="flex flex-wrap items-center gap-5">

            {/* Button */}
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white flex items-center gap-2 shadow-lg hover:opacity-90 transition">
              Explore Articles <FaArrowRight />
            </button>

            {/* Users */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <AppImage
                    key={i}
                    src="/website-components/default-image.png"
                    alt="user"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full border border-white object-cover"
                  />
                ))}
              </div>
              <span className="text-sm text-white/70">
                Join 5,000+ readers
              </span>
            </div>

          </div>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="relative w-full flex justify-center lg:justify-end">

          {/* Figma Image */}
          <div className="relative w-full max-w-[650px]">

            <AppImage
              src="/website-components/journal-top.png"
              alt="journal hero"
              width={650}
              height={500}
              priority
              className="w-full h-auto object-contain animate-float"
            />

          </div>

        </div>

      </div>

      {/* FLOAT ANIMATION STYLE */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

    </section>
  );
}