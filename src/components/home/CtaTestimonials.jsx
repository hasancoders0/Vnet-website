"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar, FaQuoteLeft, FaArrowRight, FaPlay } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function CtaTestimonials() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechNova",
      text: "Visionary Network completely transformed our online presence. The website they built is not only stunning but drives real conversions. Highly recommend their team!",
      avatar: "user1.jpg",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Founder, ShopEase",
      text: "The Shopify store they developed for us increased our sales by 40% in just three months. Their attention to detail and marketing strategies are top-notch.",
      avatar: "user2.jpg",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Marketing Head, Growthly",
      text: "Working with them on our digital marketing campaign was a game-changer. They understand modern SEO and delivered results far beyond our expectations.",
      avatar: "user3.jpg",
      rating: 5,
    },
    {
      name: "Michael Smith",
      role: "CTO, DataFlow",
      text: "The custom web application they built is robust, scalable, and perfectly tailored to our business needs. Their developers are truly experts in their field.",
      avatar: "user4.jpg",
      rating: 4,
    },
  ];

  // GSAP Animations
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

      tl.from(".cta-left-anim", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
      }).from(
        ".testimonial-right-anim",
        {
          x: 60,
          opacity: 0,
          duration: 0.9,
        },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* ================= BACKGROUND ================= */}
        <div className="absolute inset-0 -z-10">
        <Image
            src="/website-components/cta-testimonals-background.png"
            alt="cta background"
            fill
            priority
            className="object-cover object-center"
        />
        </div>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

        {/* ============ LEFT SIDE (CTA) ============ */}
        <div className="w-full lg:w-[40%] shrink-0 lg:sticky lg:top-32 text-center lg:text-left">

          {/* Badge */}
          <span className="cta-left-anim inline-block text-[10px] px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 tracking-[0.2em] uppercase font-medium mb-6">
            ✦ Ready to start?
          </span>

          {/* Heading */}
          <h2 className="cta-left-anim text-[32px] md:text-[40px] font-bold text-white mb-5 leading-tight tracking-tight">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text">
              Amazing
            </span>{" "}
            Together.
          </h2>

          {/* Description */}
          <p className="cta-left-anim text-white/45 text-[15px] max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed">
            Have a project in mind? Let&apos;s discuss how we can help you achieve your digital goals and scale your business faster.
          </p>

          {/* Buttons */}
          <div className="cta-left-anim flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-[15px] font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-[0_10px_40px_rgba(99,102,241,0.4)] hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Contact Us Today <FaArrowRight className="text-xs" />
            </Link>

            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-[15px] font-medium border border-white/[0.15] hover:bg-white/[0.08] text-white/80 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto"
            >
              <FaPlay className="text-[10px]" /> View Our Work
            </Link>
          </div>
        </div>

        {/* ============ RIGHT SIDE (TESTIMONIAL SLIDER) ============ */}
        <div className="w-full lg:w-[60%] min-w-0 testimonial-right-anim">

          {/* Slider Container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              ref={trackRef}
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className="bg-[#0a0f2e]/60 border border-white/[0.06] rounded-2xl p-8 md:p-10 backdrop-blur-xl h-full flex flex-col">

                    {/* Quote Icon */}
                    <div className="mb-6 text-blue-400/30">
                      <FaQuoteLeft className="text-3xl" />
                    </div>

                    {/* Review Text */}
                    <p className="text-[15px] text-white/70 leading-relaxed flex-grow mb-8">
                      &ldquo;{review.text}&rdquo;
                    </p>

                    {/* Bottom Section */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="relative w-12 h-12 rounded-full bg-blue-500/20 overflow-hidden border border-white/10">
                          <Image
                            src={`/website-components/${review.avatar}`}
                            alt={review.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-[14px]">
                            {review.name}
                          </h4>
                          <p className="text-white/40 text-[12px]">
                            {review.role}
                          </p>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="hidden sm:flex items-center gap-1">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={`text-[12px] ${
                              index < review.rating
                                ? "text-yellow-400"
                                : "text-white/10"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Pagination */}
          <div className="flex items-center justify-center lg:justify-start gap-2.5 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === i
                    ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                    : "w-2.5 bg-white/15 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}