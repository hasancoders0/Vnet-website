"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  FaArrowRight,
  FaPlay,
  FaBriefcase,
  FaUsers,
  FaRocket,
  FaUserTie,
} from "react-icons/fa";

export default function Hero() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const dividerRef = useRef(null);
  const statsRef = useRef(null);
  const cardMainRef = useRef(null);
  const cardTopRef = useRef(null);
  const cardRightRef = useRef(null);
  const cardBottomRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { 
          ease: "power3.out",
          clearProps: "all" // <--- PREVENTS GETTING STUCK INVISIBLE
        } 
      });

      tl.from(badgeRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          titleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          "-=0.4"
        )
        .from(
          descRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        // Changed from btnsRef.current.children to explicit class
        .from(
          ".hero-btn",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
          },
          "-=0.4"
        )
        .from(
          dividerRef.current,
          {
            width: 0,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2"
        )
        .from(
          ".stat-item",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.2"
        );

      // Number counter animation
      document.querySelectorAll(".stat-number").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target"));
        const suffix = el.getAttribute("data-suffix") || "";
        gsap.fromTo(
          el,
          { innerText: "0" },
          {
            innerText: target,
            duration: 1.8,
            ease: "power2.out",
            snap: { innerText: 1 },
            delay: 1.2,
            onUpdate: function () {
              el.textContent = Math.ceil(parseFloat(el.textContent)) + suffix;
            },
          }
        );
      });

      // Right side cards
      gsap.from(cardMainRef.current, {
        x: -60,
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.from(cardTopRef.current, {
        x: 50,
        y: -40,
        opacity: 0,
        scale: 0.85,
        rotation: -3,
        duration: 1,
        ease: "power3.out",
        delay: 0.9,
      });

      gsap.from(cardRightRef.current, {
        x: 60,
        y: 20,
        opacity: 0,
        scale: 0.85,
        rotation: 2,
        duration: 1,
        ease: "power3.out",
        delay: 1.1,
      });

      gsap.from(cardBottomRef.current, {
        x: 40,
        y: 30,
        opacity: 0,
        scale: 0.85,
        duration: 1,
        ease: "power3.out",
        delay: 1.3,
      });

      gsap.from(scrollRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.8,
        delay: 1.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden text-white"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/website-components/home-hero-desktop.png"
          alt="bg"
          fill
          priority
          className="
            object-cover 
            object-[75%_0%] 
            sm:object-center
          "
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div
        className="
        max-w-[1400px] mx-auto px-6
        pt-32 sm:pt-36 lg:pt-40
        pb-20
        grid lg:grid-cols-2 gap-12 items-center
      "
      >
        {/* ================= LEFT ================= */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="
            inline-flex items-center gap-2 px-4 py-1 mb-6 sm:mb-8
            rounded-full border border-white/20 backdrop-blur-md
            text-xs sm:text-sm
          "
          >
            ✦ We Build Your Vision
          </div>

          {/* Heading */}
          <h1
            ref={titleRef}
            className="
            font-bold leading-tight
            text-[34px] sm:text-[42px] md:text-[52px] lg:text-[64px]
            mb-6
          "
          >
            We Create Digital <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Experiences
            </span>{" "}
            That Drive Real Growth.
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className="
            text-white/70
            text-sm sm:text-base
            max-w-xl mx-auto lg:mx-0
            mb-8
          "
          >
            From stunning websites to powerful web applications, digital marketing
            to consultation — we deliver results that help your business scale
            faster.
          </p>

          {/* Buttons */}
          <div className="
            flex flex-col sm:flex-row gap-4
            justify-center lg:justify-start
            mb-10
          ">
            <Link
              href="/services"
              className="
                hero-btn
                flex items-center justify-center gap-2
                px-6 py-3 rounded-full text-sm font-medium
                bg-gradient-to-r from-purple-500 to-blue-500
                hover:scale-105 transition
              "
            >
              Explore Services <FaArrowRight />
            </Link>
            <Link
              href="/contact"
              className="
                hero-btn
                flex items-center justify-center gap-2
                px-6 py-3 rounded-full text-sm font-medium
                border border-white/20 hover:bg-white/10 transition
              "
            >
              View Our Work <FaPlay />
            </Link>
          </div>

          {/* Divider */}
          <div
            ref={dividerRef}
            className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-8 hidden lg:block"
          />

          {/* Stats */}
          <div
            ref={statsRef}
            className="
            grid grid-cols-2 sm:grid-cols-4
            gap-6 sm:gap-10
            text-center lg:text-left
          "
          >
            {[
              { icon: FaBriefcase, num: 120, suffix: "+", label: "Projects Completed", color: "text-blue-400" },
              { icon: FaUsers, num: 80, suffix: "+", label: "Happy Clients", color: "text-purple-400" },
              { icon: FaRocket, num: 5, suffix: "+", label: "Years Experience", color: "text-pink-400" },
              { icon: FaUserTie, num: 10, suffix: "+", label: "Expert Members", color: "text-green-400" },
            ].map((item, i) => (
              <div
                key={i}
                className="stat-item flex flex-col items-center lg:items-start gap-1.5"
              >
                <item.icon className={`${item.color} text-base`} />
                <p
                  className="stat-number text-lg font-semibold"
                  data-target={item.num}
                  data-suffix={item.suffix}
                >
                  0{item.suffix}
                </p>
                <p className="text-[11px] text-white/50 leading-tight">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div
          className="
          relative 
          hidden lg:flex 
          items-center justify-center 
          h-[600px]
        "
        >
          {/* MAIN CARD */}
          <div
            ref={cardMainRef}
            className="
            absolute left-10 top-24 w-[360px] p-6 rounded-2xl
            backdrop-blur-2xl border border-white/10
            shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          "
          >
            <p className="text-lg mb-4">Business Analytics</p>
            <Image
              src="/website-components/home-hero-graph.png"
              alt="graph"
              width={300}
              height={150}
              className="mx-auto"
            />
            <p className="text-green-400 text-sm mt-4">
              +25.6% Growth this month
            </p>
          </div>

          {/* TOP CARD */}
          <div
            ref={cardTopRef}
            className="
            absolute right-16 top-2 w-[240px] p-4 rounded-xl
            bg-white/10 backdrop-blur-xl border border-white/10
          "
          >
            <p className="text-sm mb-2">98% Satisfaction</p>
            <div className="w-full h-2 bg-white/20 rounded-full">
              <div className="w-[98%] h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
            </div>
            <div className="flex -space-x-2 mt-3">
              {["user4.jpg", "user5.jpg"].map((img, i) => (
                <Image
                  key={i}
                  src={`/website-components/${img}`}
                  alt="user"
                  width={28}
                  height={28}
                  className="rounded-full border border-black"
                />
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div
            ref={cardRightRef}
            className="
            absolute right-2 top-[230px] w-[220px] p-5 rounded-xl
            bg-white/10 backdrop-blur-xl border border-white/10
          "
          >
            <p className="text-sm">Projects Completed</p>
            <p className="text-2xl font-bold mb-3">120+</p>
            <div className="flex -space-x-2">
              {["user1.jpg", "user2.jpg", "user3.jpg"].map((img, i) => (
                <Image
                  key={i}
                  src={`/website-components/${img}`}
                  alt="user"
                  width={28}
                  height={28}
                  className="rounded-full border border-black"
                />
              ))}
            </div>
          </div>

          {/* BOTTOM CARD */}
          <div
            ref={cardBottomRef}
            className="
            absolute bottom-2 right-16 w-[260px] p-4 rounded-xl
            bg-white/10 backdrop-blur-xl border border-white/10 text-sm
          "
          >
            ✨ We turn ideas into powerful digital solutions
          </div>
        </div>
      </div>

      {/* ================= SCROLL ================= */}
      <div
        ref={scrollRef}
        className="
        absolute bottom-20 left-1/2 -translate-x-1/2
        flex flex-col items-center gap-2
        text-xs text-white/60
      "
      >
        <div className="w-5 h-9 border border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
        </div>
        Scroll
      </div>
    </section>
  );
}