"use client";

import AppImage from "@/components/ui/AppImage";

export default function ServicesHero() {
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
            Our Services
          </span>

          {/* Title */}
          <h1 className="text-[38px] md:text-[52px] font-bold leading-tight">
            Digital Solutions <br />
            That{" "}
            <span className="text-blue-400">
              Drive
            </span>{" "}
            Results
          </h1>

          {/* Description */}
          <p className="text-white/70 mt-5 max-w-[520px] leading-relaxed">
            From powerful websites to strategic marketing and expert consultation —
            we provide end-to-end digital services to help your business grow in
            the digital world.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">

            <button className="px-6 py-3 rounded-full text-sm font-medium 
              bg-gradient-to-r from-purple-500 to-blue-500 
              hover:scale-105 transition shadow-lg">
              Explore All Services →
            </button>

            <button className="px-6 py-3 rounded-full text-sm font-medium 
              border border-white/30 hover:bg-white/10 transition">
              Schedule a Call
            </button>

          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-10 text-sm text-white/80">

            <div>
              <p className="font-semibold text-white">100+</p>
              <p className="text-white/60 text-xs">Projects Delivered</p>
            </div>

            <div>
              <p className="font-semibold text-white">5+</p>
              <p className="text-white/60 text-xs">Years Experience</p>
            </div>

            <div>
              <p className="font-semibold text-white">98%</p>
              <p className="text-white/60 text-xs">Client Satisfaction</p>
            </div>

            <div>
              <p className="font-semibold text-white">24/7</p>
              <p className="text-white/60 text-xs">Support Available</p>
            </div>

          </div>

        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="w-full flex justify-center md:justify-end">

          <div className="w-full max-w-[620px]">

            <AppImage
              src="/website-components/services-right-img.png"
              alt="services illustration"
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