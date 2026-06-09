"use client";

import AppImage from "@/components/ui/AppImage";

export default function ProductsHero() {
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
            Premium Digital Products
          </span>

          {/* Title */}
          <h1 className="text-[38px] md:text-[52px] font-bold leading-tight">
            High Quality Digital <br />
            Products That{" "}
            <span className="text-blue-400">
              Scale
            </span>{" "}
            Ideas
          </h1>

          {/* Description */}
          <p className="text-white/70 mt-5 max-w-[520px] leading-relaxed">
            Premium themes, UI kits, templates and code resources crafted to help you build faster,
            launch quicker and scale your products with confidence.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">

            <button className="px-6 py-3 rounded-full text-sm font-medium 
              bg-gradient-to-r from-purple-500 to-blue-500 
              hover:scale-105 transition shadow-lg">
              Browse All Products →
            </button>

            <button className="px-6 py-3 rounded-full text-sm font-medium 
              border border-white/30 hover:bg-white/10 transition">
              How It Works
            </button>

          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-10 text-sm text-white/80">

            <div>
              <p className="font-semibold text-white">500+</p>
              <p className="text-white/60 text-xs">Products Available</p>
            </div>

            <div>
              <p className="font-semibold text-white">10K+</p>
              <p className="text-white/60 text-xs">Downloads</p>
            </div>

            <div>
              <p className="font-semibold text-white">4.9★</p>
              <p className="text-white/60 text-xs">Average Rating</p>
            </div>

            <div>
              <p className="font-semibold text-white">24/7</p>
              <p className="text-white/60 text-xs">Support</p>
            </div>

          </div>

        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="w-full flex justify-center md:justify-end">

          <div className="w-full max-w-[620px]">

            <AppImage
              src="/website-components/products-top.png"
              alt="products illustration"
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