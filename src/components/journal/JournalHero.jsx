"use client";

import AppImage from "@/components/ui/AppImage";
import CommonBackground from "@/components/ui/CommonBackground";
import { FaBookOpen } from "react-icons/fa";

export default function JournalHero() {
  return (
    <CommonBackground>
      <section className="relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 pt-24 pb-24 lg:pt-32 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* ================= LEFT ================= */}
            <div className="text-white">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 text-[13px] font-medium rounded-full bg-white/[0.07] border border-white/[0.1] backdrop-blur-sm mb-8 text-white/80">
                <FaBookOpen className="w-3.5 h-3.5 text-cyan-400" />
                Our Journal
              </span>

              <h1 className="text-[40px] md:text-[56px] lg:text-[68px] font-bold leading-[1.1] tracking-tight mb-6">
                Insights, Ideas &{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                  Inspiration
                </span>
              </h1>

              <p className="max-w-[520px] text-lg text-white/60 leading-relaxed">
                Explore our latest articles, tutorials, industry insights, and
                practical guides to help you grow your skills and build better
                digital experiences.
              </p>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[600px]">
                {/* Glow Effects - Using -z-10 to ensure they stay behind the image cleanly */}
                <div className="absolute inset-0 bg-cyan-500/15 blur-[120px] rounded-full -z-10" />
                <div className="absolute top-10 right-10 w-40 h-40 bg-purple-500/20 blur-[100px] rounded-full -z-10" />

                <AppImage
                  src="/website-components/journal-top.png"
                  alt="Journal Hero"
                  width={600}
                  height={460}
                  priority
                  className="relative z-10 w-full h-auto object-contain animate-float"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Standard style tag (avoids potential styled-jsx quirks in App Router) */}
        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </section>
    </CommonBackground>
  );
}