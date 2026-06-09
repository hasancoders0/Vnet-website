"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaStar,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const cardRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [slideWidth, setSlideWidth] = useState(0);

  const products = [
    {
      title: "WordPress Theme",
      price: "$49",
      rating: "4.9",
      reviews: "56",
      gradient: "from-blue-600/40 to-cyan-600/20",
      icon: "WP",
    },
    {
      title: "Shopify Theme",
      price: "$59",
      rating: "4.8",
      reviews: "42",
      gradient: "from-green-600/40 to-emerald-600/20",
      icon: "SH",
    },
    {
      title: "Dashboard UI Kit",
      price: "$29",
      rating: "4.9",
      reviews: "76",
      gradient: "from-purple-600/40 to-pink-600/20",
      icon: "UI",
    },
    {
      title: "E-Commerce UI",
      price: "$39",
      rating: "4.8",
      reviews: "85",
      gradient: "from-orange-600/40 to-red-600/20",
      icon: "EC",
    },
    {
      title: "React Admin Panel",
      price: "$49",
      rating: "4.7",
      reviews: "88",
      gradient: "from-cyan-600/40 to-blue-600/20",
      icon: "RA",
    },
    {
      title: "Tailwind Components",
      price: "$19",
      rating: "4.9",
      reviews: "120",
      gradient: "from-teal-600/40 to-cyan-600/20",
      icon: "TC",
    },
    {
      title: "SaaS Landing Page",
      price: "$29",
      rating: "4.8",
      reviews: "34",
      gradient: "from-indigo-600/40 to-blue-600/20",
      icon: "SL",
    },
    {
      title: "Blog Template",
      price: "$19",
      rating: "4.9",
      reviews: "45",
      gradient: "from-pink-600/40 to-rose-600/20",
      icon: "BT",
    },
    {
      title: "Portfolio UI Kit",
      price: "$15",
      rating: "4.7",
      reviews: "60",
      gradient: "from-violet-600/40 to-purple-600/20",
      icon: "PK",
    },
    {
      title: "Next.js Starter",
      price: "$39",
      rating: "4.8",
      reviews: "52",
      gradient: "from-gray-600/40 to-slate-600/20",
      icon: "NJ",
    },
    {
      title: "Agency Template",
      price: "$49",
      rating: "4.9",
      reviews: "29",
      gradient: "from-blue-600/40 to-indigo-600/20",
      icon: "AT",
    },
    {
      title: "Crypto Dashboard",
      price: "$59",
      rating: "4.8",
      reviews: "41",
      gradient: "from-yellow-600/40 to-amber-600/20",
      icon: "CD",
    },
  ];

  const updateSliderMetrics = () => {
    if (window.innerWidth >= 1024) setItemsPerView(3);
    else if (window.innerWidth >= 768) setItemsPerView(2);
    else setItemsPerView(1);

    if (trackRef.current && cardRef.current) {
      const style = window.getComputedStyle(trackRef.current);
      const gap = parseFloat(style.gap) || 24;
      setSlideWidth(cardRef.current.offsetWidth + gap);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(updateSliderMetrics);
    };

    handleResize(); // initial
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(0, products.length - itemsPerView);

    if (currentIndex > maxIndex) {
      requestAnimationFrame(() => {
        setCurrentIndex(maxIndex);
      });
    }
  }, [itemsPerView, currentIndex, products.length]);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrentIndex((prev) =>
      Math.min(prev + 1, products.length - itemsPerView),
    );

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

      tl.from(".prod-anim", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
      }).from(
        sliderRef.current,
        {
          x: 60,
          opacity: 0,
          duration: 0.9,
        },
        "-=0.6",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-6 isolate">
      {/* ✅ FIXED BACKGROUND (ONLY CHANGE) */}
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* base gradient (stronger visibility) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070d25] via-[#050816] to-[#070d25]" />

        {/* top blend */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#050816] to-transparent" />

        {/* bottom blend */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050816] to-transparent" />

        {/* glow (increase visibility) */}
        <div className="absolute top-[-100px] left-1/4 w-[700px] h-[500px] bg-purple-600/[0.06] rounded-full blur-[160px]" />
        <div className="absolute bottom-[-100px] right-1/4 w-[600px] h-[500px] bg-blue-600/[0.06] rounded-full blur-[160px]" />
      </div>
      {/* ================= ORIGINAL CONTENT (UNCHANGED) ================= */}
      {/* EVERYTHING BELOW IS EXACTLY YOUR ORIGINAL CODE */}

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-[35%] shrink-0 lg:sticky lg:top-32 text-center lg:text-left">
          <span className="prod-anim inline-block text-[10px] px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 tracking-[0.15em] uppercase font-medium mb-5">
            BEST QUALITY
          </span>

          <h2 className="prod-anim text-[32px] md:text-[38px] font-bold text-white mb-4 leading-tight">
            Digital <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Products
            </span>
          </h2>

          <p className="prod-anim text-white/40 text-[15px] leading-relaxed mb-8 max-w-[340px] mx-auto lg:mx-0">
            Premium themes, UI kits, and code resources to speed up your
            projects.
          </p>

          <button className="prod-anim inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-[0_8px_30px_rgba(99,102,241,0.35)] hover:scale-[1.03] transition-all duration-300">
            Browse Products <FaArrowRight className="text-xs" />
          </button>
        </div>

        {/* RIGHT SIDE SLIDER */}
        <div ref={sliderRef} className="w-full lg:w-[65%] min-w-0">
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * slideWidth}px)`,
              }}
            >
              {products.map((product, i) => (
                <div
                  key={i}
                  ref={i === 0 ? cardRef : null}
                  className="flex-shrink-0 group w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div className="h-full bg-[#0a0f2e]/60 border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[0.12] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                    <div className="relative w-full h-[280px] sm:h-[300px] overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`}
                      />

                      <Image
                        src="/website-components/default-image.png"
                        alt={product.title}
                        fill
                        className="object-cover relative z-10 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />

                      <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-2xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] flex items-center justify-center mx-auto mb-2">
                            <span className="text-xl font-bold text-white/30">
                              {product.icon}
                            </span>
                          </div>
                          <p className="text-[10px] text-white/25">Preview</p>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0f2e] to-transparent z-20" />
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-white font-semibold text-[15px] leading-tight">
                          {product.title}
                        </h3>
                        <p className="text-[20px] font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text whitespace-nowrap">
                          {product.price}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <FaStar className="text-yellow-400 text-[11px]" />
                        <span className="text-[13px] text-white/60 font-medium">
                          {product.rating}
                        </span>
                        <span className="text-[11px] text-white/20">/</span>
                        <span className="text-[11px] text-white/30">
                          {product.reviews} reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NAV */}
          <div className="flex items-center gap-3 mt-8 justify-end">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-9 h-9 rounded-full border border-white/[0.1] bg-white/[0.03] flex items-center justify-center text-white/50 hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <FaChevronLeft className="text-[10px]" />
            </button>

            <div className="text-[11px] text-white/30 font-medium min-w-[50px] text-center tabular-nums">
              {currentIndex + 1} / {products.length - itemsPerView + 1}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === products.length - itemsPerView}
              className="w-9 h-9 rounded-full border border-white/[0.1] bg-white/[0.03] flex items-center justify-center text-white/50 hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <FaChevronRight className="text-[10px]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
