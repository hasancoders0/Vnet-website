"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight, FaCalendarAlt, FaTag } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Journal() {
  const sectionRef = useRef(null);

  const blogs = [
    {
      title: "The Future of Web Development in 2024",
      desc: "Explore the upcoming trends, frameworks, and technologies shaping the digital landscape this year.",
      date: "Oct 15, 2024",
      tag: "Technology",
      gradient: "from-blue-600/40 to-cyan-600/20",
      icon: "TD",
    },
    {
      title: "How to Increase E-commerce Sales Fast",
      desc: "Proven strategies and UI tweaks that can boost your online store revenue by up to 40%.",
      date: "Oct 10, 2024",
      tag: "Marketing",
      gradient: "from-purple-600/40 to-pink-600/20",
      icon: "EC",
    },
    {
      title: "Why UI/UX is Crucial for Startups",
      desc: "Learn why investing in user experience early on can save you thousands in development costs.",
      date: "Oct 05, 2024",
      tag: "Design",
      gradient: "from-orange-600/40 to-red-600/20",
      icon: "UX",
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

      tl.from(".journal-anim", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
      }).from(
        ".journal-card",
        {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          stagger: 0.12,
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6 overflow-hidden bg-[#050816]">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b1f] via-[#050816] to-[#050816]" />
        <div className="absolute top-0 left-1/4 w-[700px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[500px] bg-purple-600/[0.04] rounded-full blur-[150px]" />
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

        {/* ================= LEFT SIDE ================= */}
        <div className="w-full lg:w-[35%] shrink-0 lg:sticky lg:top-32 text-center lg:text-left">
          
          <span className="journal-anim inline-block text-[10px] px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 tracking-[0.15em] uppercase font-medium mb-5">
            LATEST ARTICLES
          </span>

          <h2 className="journal-anim text-[32px] md:text-[38px] font-bold text-white mb-4 leading-tight">
            Our <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Journal
            </span>
          </h2>

          <p className="journal-anim text-white/40 text-[15px] leading-relaxed mb-8 max-w-[340px] mx-auto lg:mx-0">
            Stay updated with the latest insights on design, development, and digital marketing.
          </p>

          <button className="journal-anim inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-[0_8px_30px_rgba(99,102,241,0.35)] hover:scale-[1.03] transition-all duration-300">
            Read All Articles <FaArrowRight className="text-xs" />
          </button>
        </div>

        {/* ================= RIGHT SIDE (CARDS GRID) ================= */}
        <div className="w-full lg:w-[65%] min-w-0">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-6">
            {blogs.map((blog, i) => (
              <div key={i} className="journal-card group relative h-full">
                {/* Gradient border on hover */}
                <div
                  className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${blog.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Card */}
                <div className="relative h-full bg-[#0a0f2e]/60 border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:bg-[#0c1235]/80 flex flex-col">
                  
                  {/* Image Area */}
                  <div className="relative w-full h-[200px] overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${blog.gradient}`} />
                    <Image
                      src="/website-components/default-image.png"
                      alt={blog.title}
                      fill
                      className="object-cover relative z-10 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-lg font-bold text-white/30">
                        {blog.icon}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0f2e] to-transparent z-20 pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1.5 text-[11px] text-white/30">
                        <FaCalendarAlt className="text-[9px]" />
                        {blog.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-blue-400/70">
                        <FaTag className="text-[9px]" />
                        {blog.tag}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-semibold text-[15px] leading-snug mb-2 group-hover:text-blue-300 transition-colors">
                      {blog.title}
                    </h3>

                    {/* Desc */}
                    <p className="text-[12px] text-white/40 leading-relaxed flex-grow mb-4">
                      {blog.desc}
                    </p>

                    {/* Link - Shows on Hover */}
                    <button className="text-[13px] text-blue-400 flex items-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-70 group-hover:translate-y-0 transition-all duration-500">
                      Read More
                      <span className="group-hover:translate-x-1 transition-transform duration-300 text-[10px]">
                        →
                      </span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}