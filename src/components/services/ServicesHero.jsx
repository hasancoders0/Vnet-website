"use client";

import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { FiArrowRight } from "react-icons/fi";

const stats = [
  { value: "100+", label: "Projects Delivered" },
  { value: "5+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Available" },
];

export default function ServicesHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* BACKGROUND */}
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

      <div className="max-w-[1280px] mx-auto px-6 pt-24 pb-24 lg:pt-32 lg:pb-32 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* ================= LEFT ================= */}
        <div className="text-white">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 text-[11px] px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.1] backdrop-blur-sm text-white/80 uppercase tracking-wider font-medium mb-8">
            Our Services
          </span>

          {/* Title */}
          <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] tracking-tight">
            Digital Solutions
            <br />
            That{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Drive
            </span>{" "}
            Results
          </h1>

          {/* Description */}
          <p className="text-white/60 mt-5 max-w-[520px] text-lg leading-relaxed">
            From powerful websites to strategic marketing and expert consultation —
            we provide end-to-end digital services to help your business grow in
            the digital world.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/#services"
              className="
                inline-flex items-center gap-2.5 
                px-7 py-3.5 rounded-full 
                text-sm font-semibold 
                bg-white text-slate-900 
                hover:bg-slate-100
                shadow-[0_10px_30px_rgba(0,0,0,0.2)]
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]
                transition-all duration-300
              "
            >
              Explore Services
              <FiArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="
                inline-flex items-center 
                px-7 py-3.5 rounded-full 
                text-sm font-medium 
                border border-white/20 text-white 
                hover:bg-white/10 hover:border-white/30
                transition-all duration-300
              "
            >
              Schedule a Call
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-12 pt-8 border-t border-white/10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-white/50 mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="w-full flex justify-center md:justify-end">
          <div className="w-full max-w-[580px]">
            <AppImage
              src="/website-components/services-right-img.png"
              alt="services illustration"
              width={580}
              height={480}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}