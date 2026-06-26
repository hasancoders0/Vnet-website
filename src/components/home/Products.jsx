"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight, FaGem } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

import CardSlider from "@/components/ui/CardSlider";
import ProductCard from "@/components/products/ProductCard";

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  const products = [
    { title: "WordPress Theme", price: "$49", rating: "4.9", reviews: "56", gradient: "from-blue-600/40 to-cyan-600/20", img: "" },
    { title: "Shopify Theme", price: "$59", rating: "4.8", reviews: "42", gradient: "from-green-600/40 to-emerald-600/20", img: "" },
    { title: "Dashboard UI Kit", price: "$29", rating: "4.9", reviews: "76", gradient: "from-purple-600/40 to-pink-600/20", img: "" },
    { title: "E-Commerce UI", price: "$39", rating: "4.8", reviews: "85", gradient: "from-orange-600/40 to-red-600/20", img: "" },
    { title: "React Admin Panel", price: "$49", rating: "4.7", reviews: "88", gradient: "from-cyan-600/40 to-blue-600/20", img: "" },
    { title: "Tailwind Components", price: "$19", rating: "4.9", reviews: "120", gradient: "from-teal-600/40 to-cyan-600/20", img: "" },
    { title: "SaaS Landing Page", price: "$29", rating: "4.8", reviews: "34", gradient: "from-indigo-600/40 to-blue-600/20", img: "" },
    { title: "Blog Template", price: "$19", rating: "4.9", reviews: "45", gradient: "from-pink-600/40 to-rose-600/20", img: "" },
    { title: "Portfolio UI Kit", price: "$15", rating: "4.7", reviews: "60", gradient: "from-violet-600/40 to-purple-600/20", img: "" },
    { title: "Next.js Starter", price: "$39", rating: "4.8", reviews: "52", gradient: "from-gray-600/40 to-slate-600/20", img: "" },
    { title: "Agency Template", price: "$49", rating: "4.9", reviews: "29", gradient: "from-blue-600/40 to-indigo-600/20", img: "" },
    { title: "Crypto Dashboard", price: "$59", rating: "4.8", reviews: "41", gradient: "from-yellow-600/40 to-amber-600/20", img: "" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" }, // Removed clearProps to prevent breaking React hover states!
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
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 px-6 bg-[#f8fafc]"
    >
      <div className="max-w-[1280px] mx-auto lg:grid lg:grid-cols-[380px_1fr] lg:gap-12 lg:items-center">
        
        {/* ================= LEFT SIDE ================= */}
        <div className="w-full lg:sticky lg:top-32 text-center lg:text-left mb-10 lg:mb-0">
          {/* Badge */}
          <span className="prod-anim inline-flex items-center gap-2 text-[11px] px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium uppercase tracking-wider mb-6">
            <FaGem className="w-3 h-3 text-blue-500" />
            Best Quality
          </span>

          {/* Title */}
          <h2 className="prod-anim text-[30px] md:text-[38px] font-bold text-slate-900 leading-[1.1] tracking-tight mb-4">
            Digital <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              Products
            </span>
          </h2>

          {/* Description */}
          <p className="prod-anim text-sm text-slate-500 leading-relaxed mb-8 max-w-sm mx-auto lg:mx-0">
            Premium themes, UI kits, and code resources to speed up your
            development workflow.
          </p>

          {/* CTA Button */}
          <Link
            href="/products"
            className="
              prod-anim inline-flex items-center gap-2.5 
              px-7 py-3.5 rounded-full 
              text-sm font-semibold 
              bg-slate-900 text-white 
              hover:bg-slate-800
              shadow-[0_10px_30px_rgba(0,0,0,0.15)]
              hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]
              hover:scale-[1.03]
              transition-all duration-300
            "
          >
            Browse Products 
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ================= RIGHT SIDE SLIDER ================= */}
        <div ref={sliderRef} className="min-w-0">
          <CardSlider
            items={products}
            renderItem={(product) => <ProductCard product={product} />}
            desktop={3}
            tablet={2}
            mobile={1}
            loop
            autoplay
            navigation
            pagination={false}
            centered={false}
            grabCursor
            className="px-2 lg:px-8"
          />
        </div>
      </div>
    </section>
  );
}