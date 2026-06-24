"use client";

import AppImage from "@/components/ui/AppImage";
import CommonBackground from "@/components/ui/CommonBackground";

export default function JournalHero() {
  return (
    <CommonBackground>
      <section className="relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 pt-24 pb-24 lg:pt-28 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* ================= LEFT ================= */}
            <div className="text-white">
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-6">
                ⭐ Our Journal
              </span>

              <h1 className="text-[44px] md:text-[60px] lg:text-[72px] font-bold leading-[0.95] tracking-tight mb-6">
                Insights, Ideas &{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.35)]">
                  Inspiration
                </span>
              </h1>

              <p className="max-w-[560px] text-lg md:text-xl text-white/75 leading-8">
                Explore our latest articles, tutorials, industry insights, and
                practical guides to help you grow your skills and build better
                digital experiences.
              </p>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[650px]">
                {/* Glow Effects */}
                <div className="absolute inset-0 bg-cyan-500/10 blur-[120px] rounded-full" />
                <div className="absolute top-10 right-10 w-40 h-40 bg-purple-500/20 blur-[100px] rounded-full" />

                <AppImage
                  src="/website-components/journal-top.png"
                  alt="Journal Hero"
                  width={650}
                  height={500}
                  priority
                  className="relative z-10 w-full h-auto object-contain animate-float"
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
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