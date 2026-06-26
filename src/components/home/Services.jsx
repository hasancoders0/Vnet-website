"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Monitor,
  Code2,
  TrendingUp,
  MessageSquare,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const cardsRef = useRef(null);
  const btnRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeCard, setActiveCard] = useState(null);

  const services = [
    {
      title: "Website Development",
      desc: "Modern, responsive websites that represent your brand and drive results.",
      icon: <Monitor />,
      gradient: "from-blue-500 to-cyan-400",
      iconBg: "bg-blue-500/10 border-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Web Application",
      desc: "Scalable and secure web applications tailored to your business needs.",
      icon: <Code2 />,
      gradient: "from-purple-500 to-pink-400",
      iconBg: "bg-purple-500/10 border-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      title: "Digital Marketing",
      desc: "SEO, social media, ads, and content strategies that get real results.",
      icon: <TrendingUp />,
      gradient: "from-green-500 to-emerald-400",
      iconBg: "bg-green-500/10 border-green-500/20",
      iconColor: "text-green-400",
    },
    {
      title: "Consultation",
      desc: "Expert advice and strategic guidance to take your business forward.",
      icon: <MessageSquare />,
      gradient: "from-orange-500 to-red-400",
      iconBg: "bg-orange-500/10 border-orange-500/20",
      iconColor: "text-orange-400",
    },
    {
      title: "Shopify & WordPress",
      desc: "Custom Shopify stores and WordPress solutions that convert.",
      icon: <ShoppingBag />,
      gradient: "from-pink-500 to-purple-500",
      iconBg: "bg-pink-500/10 border-pink-500/20",
      iconColor: "text-pink-400",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container entrance
      gsap.from(sectionRef.current.querySelector(".service-container"), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Badge
      gsap.from(badgeRef.current, {
        y: -15,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: badgeRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // Title
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      // Subtitle
      gsap.from(subRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      // Cards stagger
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 50,
          opacity: 0,
          scale: 0.92,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }

      if (window.matchMedia("(max-width: 1023px)").matches) {
        cardRefs.current.forEach((card, index) => {
          if (!card) return;

          const trigger = ScrollTrigger.create({
            trigger: card,
            start: "top 55%",
            end: "bottom 45%",
            onEnter: () => setActiveCard(index),
            onEnterBack: () => setActiveCard(index),
          });

          return () => ctx.revert();
        });
      }

      // Button
      gsap.from(btnRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: btnRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-14 pb-20 px-6 overflow-hidden"
    >
      {/* BACKGROUND - Only Image */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/website-components/servicebg.jpg')",
          }}
        />
      </div>

      {/* MAIN CONTAINER */}
      <div className="service-container relative max-w-[1280px] mx-auto rounded-[32px] border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl px-5 md:px-8 lg:px-10 py-12 lg:py-14">
        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-2 text-[10px] px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 tracking-[0.15em] uppercase font-medium"
          >
            <Sparkles className="w-3 h-3 text-violet-400" />
            What We Do
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-center text-[28px] md:text-[36px] lg:text-[40px] font-bold text-white mb-2.5"
        >
          Our{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Services
          </span>
        </h2>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="text-center text-white/40 max-w-md mx-auto mb-12 text-[14px] leading-relaxed"
        >
          End-to-end digital services to help your business grow.
        </p>

        {/* CARDS GRID */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3.5"
        >
          {services.map((service, i) => (
            <Link
              key={i}
              href="/services"
              ref={(el) => (cardRefs.current[i] = el)}
              className="group relative block"
            >
              {/* Gradient border on hover */}
              <div
                className={`
                  absolute -inset-[1px] 
                  rounded-2xl bg-gradient-to-br 
                  ${service.gradient} ${
                    activeCard === i
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }                 transition-opacity 
                  duration-500`}
              />

              {/* Card */}
              <div
                className={`relative h-full rounded-2xl border border-white/[0.06] p-5 flex flex-col transition-all duration-500

                    ${
                      activeCard === i
                        ? "bg-[#0c1235]/80 shadow-[0_0_50px_rgba(168,85,247,0.25)] -translate-y-1"
                        : "bg-[#0a0f2e]/60"
                    }

                    hover:-translate-y-1.5
                    hover:bg-[#0c1235]/80
                `}
              >
                {/* ICON */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-xl mb-4 border ${service.iconBg} ${service.iconColor} text-[15px] transition-all duration-500 group-hover:scale-110`}
                >
                  {service.icon}
                </div>

                {/* TITLE */}
                <h3 className="text-white font-semibold text-[14px] mb-1.5">
                  {service.title}
                </h3>

                {/* DESC */}
                <p className="text-[12px] text-white/40 mb-5 leading-[1.6] flex-grow group-hover:text-white/55 transition-colors">
                  {service.desc}
                </p>

                <div
                  className={`text-[12px] ${service.iconColor} flex items-center gap-1.5 
                  ${
                    activeCard === i
                      ? "opacity-70 translate-y-0"
                      : "opacity-0 translate-y-2 group-hover:opacity-70 group-hover:translate-y-0"
                  }
                  transition-all duration-500`}
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-10">
          <div ref={btnRef}>
            <Link
              href="/services"
              className="px-6 py-2.5 rounded-full border border-white/[0.08] text-white/60 text-[13px] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.15] hover:text-white/80 transition-all duration-300 inline-flex items-center gap-2"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
