"use client";

import AppImage from "@/components/ui/AppImage";
import CommonBackground from "@/components/ui/CommonBackground";
import { FaBagShopping  } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import Link from "@/components/ui/AppLink";

export default function ProductsHero() {
  return (
    <CommonBackground>
      <section className="relative overflow-hidden pt-28 md:pt-32 pb-32 lg:pb-40">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ================= LEFT ================= */}
          <div className="text-white">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 text-[11px] px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.1] backdrop-blur-sm text-white/80 uppercase tracking-wider font-medium mb-8">
              <FaBagShopping  className="w-3 h-3 text-cyan-400" />
              Premium Digital Products
            </span>

            {/* Title */}
            <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold text-white leading-[1.1] tracking-tight mb-6">
              High Quality Digital <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Products That Scale
              </span>{" "}
              Ideas
            </h1>

            {/* Description */}
            <p className="text-lg text-white/60 leading-relaxed max-w-[520px] mb-10">
              Premium themes, UI kits, templates and code resources crafted to help you build faster,
              launch quicker and scale your products with confidence.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="
                  inline-flex items-center gap-2.5 
                  px-7 py-3.5 rounded-full 
                  text-sm font-semibold 
                  bg-white text-slate-900 
                  hover:bg-slate-100
                  shadow-[0_10px_30px_rgba(255,255,255,0.15)]
                  hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)]
                  hover:scale-[1.03]
                  transition-all duration-300
                "
              >
                Browse Products
                <FiArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#how-it-works"
                className="
                  inline-flex items-center gap-2.5 
                  px-7 py-3.5 rounded-full 
                  text-sm font-medium 
                  border border-white/20 text-white/80 
                  hover:bg-white/10 hover:border-white/30 hover:text-white 
                  transition-all duration-300
                "
              >
                How It Works
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-12 pt-8 border-t border-white/10">
              <div>
                <p className="text-2xl font-bold tracking-tight text-white">500+</p>
                <p className="text-xs text-white/50 mt-0.5">Products Available</p>
              </div>

              <div>
                <p className="text-2xl font-bold tracking-tight text-white">10K+</p>
                <p className="text-xs text-white/50 mt-0.5">Downloads</p>
              </div>

              <div>
                <p className="text-2xl font-bold tracking-tight text-white">4.9★</p>
                <p className="text-xs text-white/50 mt-0.5">Average Rating</p>
              </div>

              <div>
                <p className="text-2xl font-bold tracking-tight text-white">24/7</p>
                <p className="text-xs text-white/50 mt-0.5">Support</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[580px]">
              <AppImage
                src="/website-components/products-top.png"
                alt="products illustration"
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