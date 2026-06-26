"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar, FaQuoteLeft, FaRocket } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import CardSlider from "@/components/ui/CardSlider";

gsap.registerPlugin(ScrollTrigger);

export default function CtaTestimonials() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

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
        defaults: { ease: "power3.out" },
      });

      tl.from(".cta-left-anim", {
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
        "-=0.5",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 px-6 bg-[#f8fafc]"
    >
      {/* 
        CSS Fix: On large screens, we pull the pagination out of the right column 
        and absolutely position it to the bottom-left of the grid to sit under the CTA. 
      */}
      <style>{`
  @media (min-width: 1024px) {
    .custom-testi-pagination .swiper-pagination {
      position: absolute;
      bottom: -40px;
      left: 0;
      right: 0;
      width: fit-content;
      margin: 0 auto;
      display: flex;
      justify-content: center;
    }
  }
`}</style>

      {/* MAIN LAYOUT - pb-12 gives space for the absolutely positioned dots */}
      <div className="max-w-[1280px] mx-auto relative lg:grid lg:grid-cols-[700px_480px] lg:gap-20 lg:items-center pb-12">
        {/* ============ LEFT SIDE (CTA) ============ */}
        <div
          ref={sliderRef}
          className="w-full max-w-[820px] min-w-0 testimonial-right-anim"
        >
          <CardSlider
            items={reviews}
            className="custom-testi-pagination" // Target class for our CSS fix
            renderItem={(review) => (
              <div className="bg-white border border-slate-200/70 shadow-sm rounded-2xl p-8 md:p-10 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="mb-6 text-slate-200">
                  <FaQuoteLeft className="text-3xl" />
                </div>

                {/* Review Text */}
                <p className="text-[15px] text-slate-600 leading-[1.7] flex-grow mb-8">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Bottom Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative w-12 h-12 rounded-full bg-slate-100 overflow-hidden border border-slate-200/70">
                      <Image
                        src={`/website-components/${review.avatar}`}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-semibold text-[14px]">
                        {review.name}
                      </h4>
                      <p className="text-slate-500 text-[12px] mt-0.5">
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
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            desktop={1}
            tablet={1}
            mobile={1}
            loop
            autoplay
            navigation={false}
            pagination={true}
            grabCursor
          />
        </div>

        {/* ============ RIGHT SIDE (SWIPER SLIDER) ============ */}
        <div className="w-full lg:sticky lg:top-32 text-center lg:text-left mb-10 lg:mb-0">
          {/* Badge */}
          <span className="cta-left-anim inline-flex items-center gap-2 text-[11px] px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium uppercase tracking-wider mb-6">
            <FaRocket className="w-3 h-3 text-blue-500" />
            Ready to start?
          </span>

          {/* Heading */}
          <h2 className="cta-left-anim text-[30px] md:text-[38px] font-bold text-slate-900 mb-5 leading-[1.1] tracking-tight">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              Amazing
            </span>{" "}
            Together.
          </h2>

          {/* Description */}
          <p className="cta-left-anim text-sm text-slate-500 max-w-sm mx-auto lg:mx-0 mb-8 leading-relaxed">
            Have a project in mind? Let&apos;s discuss how we can help you
            achieve your digital goals and scale your business faster.
          </p>

          {/* Single CTA Button */}
          <div className="cta-left-anim flex justify-center lg:justify-start">
            <Link
              href="/contact"
              className="
                inline-flex items-center justify-center gap-2.5 
                px-8 py-3.5 rounded-full 
                text-sm font-semibold 
                bg-slate-900 text-white 
                hover:bg-slate-800
                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]
                hover:scale-[1.03]
                transition-all duration-300
                w-full sm:w-auto
              "
            >
              Contact Us Today
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
