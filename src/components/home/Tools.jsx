"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaBolt,
  FaSearch,
  FaCode,
  FaPalette,
  FaImage,
  FaChartLine,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Tools() {
  const sectionRef = useRef(null);

  const tools = [
    {
      title: "Speed Test",
      desc: "Analyze your website loading speed and get optimization tips.",
      icon: <FaBolt />,
      gradient: "from-yellow-500 to-orange-500",
      iconBg: "bg-yellow-500/10 border-yellow-500/20",
      iconColor: "text-yellow-400",
    },
    {
      title: "SEO Checker",
      desc: "Audit your site's SEO performance and find hidden issues.",
      icon: <FaSearch />,
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-500/10 border-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Code Minifier",
      desc: "Minify HTML, CSS, and JS files to reduce size instantly.",
      icon: <FaCode />,
      gradient: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-500/10 border-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      title: "Color Palette",
      desc: "Generate beautiful color schemes and export them easily.",
      icon: <FaPalette />,
      gradient: "from-green-500 to-emerald-500",
      iconBg: "bg-green-500/10 border-green-500/20",
      iconColor: "text-green-400",
    },
    {
      title: "Image Compressor",
      desc: "Reduce image file sizes without losing visible quality.",
      icon: <FaImage />,
      gradient: "from-red-500 to-rose-500",
      iconBg: "bg-red-500/10 border-red-500/20",
      iconColor: "text-red-400",
    },
    {
      title: "Website Analytics",
      desc: "Track visitor metrics, bounce rates, and traffic sources.",
      icon: <FaChartLine />,
      gradient: "from-indigo-500 to-blue-500",
      iconBg: "bg-indigo-500/10 border-indigo-500/20",
      iconColor: "text-indigo-400",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out", clearProps: "all" },
      });

      tl.from(".tool-anim", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
      })
        .from(
          ".tool-card",
          {
            y: 60,
            opacity: 0,
            scale: 0.95,
            duration: 0.7,
            stagger: 0.1,
          },
          "-=0.4"
        )
        .from(
          ".tools-btn-anim",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* ✅ Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/website-components/tools-background.png')",
        }}
      />

      {/* ✅ Gradient Borders */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Content */}
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="tool-anim inline-block text-[10px] px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 tracking-[0.15em] uppercase font-medium mb-5">
            🛠️ Useful Tools
          </span>

          <h2 className="tool-anim text-[28px] md:text-[36px] lg:text-[40px] font-bold text-white mb-3">
            Free Online{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Tools
            </span>
          </h2>

          <p className="tool-anim text-white/40 max-w-md mx-auto text-[14px] leading-relaxed">
            Boost your workflow with our premium suite of free developer and marketer tools.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <div key={i} className="tool-card group relative h-full backdrop-blur-md">
              {/* Hover Gradient Border */}
              <div
                className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative h-full rounded-2xl bg-[#0a0f2e]/60 border border-white/[0.06] p-6 flex flex-col transition-all duration-500 hover:-translate-y-1 hover:bg-[#0c1235]/80">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-11 h-11 flex items-center justify-center rounded-xl border ${tool.iconBg} ${tool.iconColor} text-[16px] transition-all duration-500 group-hover:scale-110`}
                  >
                    {tool.icon}
                  </div>

                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                    FREE
                  </span>
                </div>

                <h3 className="text-white font-semibold text-[16px] mb-2">
                  {tool.title}
                </h3>

                <p className="text-[13px] text-white/40 leading-relaxed mb-5 flex-grow group-hover:text-white/55 transition-colors">
                  {tool.desc}
                </p>

                <button
                  className={`text-[13px] ${tool.iconColor} flex items-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-70 group-hover:translate-y-0 transition-all duration-500`}
                >
                  Try Now
                  <span className="group-hover:translate-x-1 transition-transform duration-300 text-[10px]">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-12">
          <button className="tools-btn-anim px-6 py-2.5 rounded-full border border-white/[0.06] text-white/60 text-[13px] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.1] hover:text-white/80 transition-all duration-300">
            Explore All Tools →
          </button>
        </div>
      </div>
    </section>
  );
}