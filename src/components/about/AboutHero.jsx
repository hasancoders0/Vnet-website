"use client";

import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import CommonBackground from "@/components/ui/CommonBackground";
import { FaUsers, FaLightbulb } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const features = [
  {
    title: "Customer First",
    desc: "We put our customers at the center of everything we do, ensuring tailored solutions.",
    icon: <FaUsers className="text-base" />,
    iconStyle: "bg-blue-500/10 border-blue-400/20 text-blue-400",
  },
  {
    title: "Innovation Driven",
    desc: "We constantly explore new ideas and technologies to keep you ahead of the curve.",
    icon: <FaLightbulb className="text-base" />,
    iconStyle: "bg-orange-500/10 border-orange-400/20 text-orange-400",
  },
];

export default function AboutHero() {
  return (
    <CommonBackground>
      <section className="relative overflow-hidden pt-28 md:pt-32 pb-32 lg:pb-40">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* ================= LEFT ================= */}
          <div className="text-white">
            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center gap-2 text-sm text-white/40 mb-10">
              <Link href="/" className="hover:text-white/70 transition-colors duration-200">
                Home
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-white/80 font-medium">About Us</span>
            </nav>

            {/* Badge */}
            <span className="inline-flex items-center gap-2 text-[11px] px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.1] backdrop-blur-sm text-white/80 uppercase tracking-wider font-medium mb-8">
              <FaUsers className="w-3 h-3 text-blue-400" />
              About Us
            </span>

            {/* Title */}
            <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold text-white leading-[1.1] tracking-tight mb-6">
              We Build Digital{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Solutions
              </span>{" "}
              That Inspire
            </h1>

            {/* Description */}
            <p className="text-lg text-white/60 leading-relaxed max-w-[520px] mb-10">
              At Visionary Network, we’re passionate about helping businesses and
              creators grow in the digital world. We build modern solutions,
              powerful tools, and resources that make a real impact.
            </p>

            {/* Features */}
            <div className="space-y-5 mb-10">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-2xl border flex items-center justify-center flex-shrink-0 ${feature.iconStyle}`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-[15px]">
                      {feature.title}
                    </p>
                    <p className="text-white/50 text-sm mt-1 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/about#story"
              className="
                inline-flex items-center gap-2.5 
                px-7 py-3.5 rounded-full 
                text-sm font-semibold 
                bg-white text-slate-900 
                hover:bg-slate-100
                shadow-[0_10px_30px_rgba(0,0,0,0.2)]
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]
                hover:scale-[1.03]
                transition-all duration-300
              "
            >
              Our Story
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="relative w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[580px]">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl">
                <AppImage
                  src="/website-components/about-top-img.png"
                  alt="team working"
                  width={580}
                  height={420}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Quote Box (Dark Glassmorphic) */}
              <div className="absolute -bottom-6 left-6 right-6 bg-slate-900/90 border border-white/[0.1] backdrop-blur-xl rounded-2xl p-5 shadow-2xl">
                <p className="text-white/70 text-sm text-center leading-relaxed">
                  <span className="text-blue-400 text-lg">&ldquo;</span>
                  Our mission is to empower people and businesses with digital
                  solutions that drive growth and success.
                  <span className="text-blue-400 text-lg">&rdquo;</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </CommonBackground>
  );
}