"use client";

import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import {
  ArrowRight,
  Play,
  BriefcaseBusiness,
  Users,
  Rocket,
  ShieldCheck,
  Layers3,
} from "lucide-react";

const heroStats = [
  {
    icon: BriefcaseBusiness,
    num: 120,
    suffix: "+",
    label: "Projects Delivered",
    color: "text-cyan-400",
  },
  {
    icon: Users,
    num: 80,
    suffix: "+",
    label: "Happy Clients",
    color: "text-violet-400",
  },
  {
    icon: Rocket,
    num: 5,
    suffix: "+",
    label: "Years Experience",
    color: "text-pink-400",
  },
  {
    icon: ShieldCheck,
    num: 100,
    suffix: "%",
    label: "Client Satisfaction",
    color: "text-emerald-400",
  },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const dividerRef = useRef(null);
  const statsRef = useRef(null);
  const statRefs = useRef([]);
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
          clearProps: "all",
        },
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
          "-=0.4",
        )
        .from(
          descRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          ".hero-btn",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
          },
          "-=0.4",
        )
        .from(
          dividerRef.current,
          {
            width: 0,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2",
        )
        .from(
          ".stat-item",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.2",
        );

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
      heroStats.forEach((item, index) => {
        const el = statRefs.current[index];

        if (!el) return;

        gsap.to(
          { value: 0 },
          {
            value: item.num,
            duration: 2,
            ease: "power2.out",
            delay: 1.2 + index * 0.1,
            onUpdate() {
              const current = Math.floor(this.targets()[0].value);

              el.textContent = `${current}${item.suffix}`;
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden text-white"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">
        <AppImage
          src="/website-components/home-hero-desktop.jpg"
          alt="bg"
          fill
          priority
          sizes="100vw"
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
            Professional services, premium templates, digital products, growth
            tools, and expert support — everything you need to launch and scale
            online.
          </p>

          {/* Buttons */}
          <div
            className="
            flex flex-col sm:flex-row gap-4
            justify-center lg:justify-start
            mb-10
          "
          >
            <Link
              href="/services"
              className="
              hero-btn
              flex items-center justify-center gap-2
              px-6 py-3 rounded-full text-sm font-medium
              bg-gradient-to-r from-purple-500 to-blue-500
              hover:-translate-y-1 transition-all
            "
            >
              Explore Services <ArrowRight className="w-4 h-4" />
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
              Get Free Consultation <Play className="w-4 h-4 fill-current" />
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
            grid grid-cols-2 lg:grid-cols-4
            gap-4 lg:gap-6
            "
          >
            {heroStats.map((item, i) => (
              <div
                key={i}
                className="
                stat-item
                flex flex-col
                items-center lg:items-start
                gap-2
                rounded-2xl
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-sm
                p-4
                "
              >
                <item.icon className={`${item.color} text-base`} />
                <p
                  ref={(el) => {
                    statRefs.current[i] = el;
                  }}
                  className="stat-number text-2xl font-bold tracking-tight"
                >
                  0{item.suffix}
                </p>
                <p className="text-xs text-white/60">{item.label}</p>
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
            backdrop-blur-lg border border-white/10
            shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          "
          >
            <p className="text-lg mb-4">Business Growth Ecosystem</p>
            <AppImage
              src="/website-components/home-hero-graph.png"
              alt="graph"
              width={300}
              height={150}
              className="mx-auto"
            />
            <p className="text-green-400 text-sm mt-4">
              Built for growth-driven businesses
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
                <AppImage
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
                <AppImage
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
              bg-white/10 backdrop-blur-xl border border-white/10
              "
          >
            <div className="flex items-center gap-3">
              <Layers3 className="w-5 h-5 text-cyan-400" />
              <p className="text-sm font-medium">
                One Platform. Endless Possibilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
