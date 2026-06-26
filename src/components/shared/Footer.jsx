"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONFIG } from "@/config/site";
import { footerNavigation } from "@/config/footer";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
        },
      });

      gsap.from(".footer-bottom-anim", {
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".footer-bottom-anim",
          start: "top 100%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderLinks = (links) => (
    <ul className="space-y-3">
      {links.map((link, i) => (
        <li key={i}>
          <Link
            href={link.href}
            className="text-[13px] text-white/50 hover:text-white transition-colors duration-200 relative group inline-block"
          >
            {link.title}
            <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-gradient-to-r from-blue-400 to-cyan-300 group-hover:w-full transition-all duration-300" />
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <footer
      ref={sectionRef}
      className="relative bg-[#050816] pt-20 pb-10 px-6 border-t border-white/[0.1] overflow-hidden"
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[800px] h-[400px] bg-blue-500/[0.07] blur-[150px] rounded-full" />
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500/[0.03] blur-[120px] rounded-full" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/[0.03] blur-[120px] rounded-full" />
      </div>

      {/* TOP ACCENT LINE */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />

      <div className="max-w-[1280px] mx-auto">
        {/* MAIN GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Logo + Info */}
          <div className="footer-col col-span-2 sm:col-span-2 lg:col-span-4">
            <Image
              src={SITE_CONFIG.logo.light}
              alt={SITE_CONFIG.name}
              width={120}
              height={40}
              className="h-9 w-auto mb-6 brightness-0 invert"
            />

            <p className="text-[13px] text-white/50 leading-[1.8] mb-7 max-w-[280px]">
              We help businesses grow with digital solutions that make an
              impact. Partner with us to scale your vision.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {SITE_CONFIG.socials.map((social, i) => {
                const Icon = social.icon;

                return (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="
                    w-9 h-9 rounded-xl
                    border border-white/10
                    bg-white/[0.05]
                    flex items-center justify-center
                    text-white/50
                    hover:text-white
                    hover:bg-white/[0.1]
                    hover:border-white/20
                    active:scale-95
                    transition-all duration-200
                  "
                  >
                    <Icon size={13} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company */}
          <div className="footer-col lg:col-span-2">
            <h3 className="text-[11px] font-semibold text-white/80 tracking-[0.15em] uppercase mb-6">
              Company
            </h3>
            {renderLinks(footerNavigation.company)}
          </div>

          {/* Resources */}
          <div className="footer-col lg:col-span-2">
            <h3 className="text-[11px] font-semibold text-white/80 tracking-[0.15em] uppercase mb-6">
              Resources
            </h3>
            {renderLinks(footerNavigation.resources)}
          </div>

          {/* Legal */}
          <div className="footer-col lg:col-span-2">
            <h3 className="text-[11px] font-semibold text-white/80 tracking-[0.15em] uppercase mb-6">
              Legal
            </h3>
            {renderLinks(footerNavigation.legal)}
          </div>

          {/* Join Program / CTA */}
          <div className="footer-col col-span-2 sm:col-span-2 lg:col-span-2">
            <h3 className="text-[11px] font-semibold text-white/80 tracking-[0.15em] uppercase mb-6">
              {footerNavigation.joinProgram.title}
            </h3>

            <p className="text-[13px] text-white/50 leading-[1.7] mb-5">
              {footerNavigation.joinProgram.description}
            </p>

            <Link
              href={footerNavigation.joinProgram.buttonLink}
              className="
                inline-flex items-center gap-2 
                bg-blue-600 text-white 
                px-5 py-2.5 rounded-xl 
                text-[13px] font-medium
                hover:bg-blue-700
                shadow-[0_4px_15px_rgba(37,99,235,0.3)]
                active:scale-95
                transition-all duration-200
              "
            >
              {footerNavigation.joinProgram.buttonText}
              <FiArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="footer-bottom-anim border-t border-white/[0.06] pt-7 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/40 tracking-wide">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>

          <div className="flex items-center gap-6">
            {footerNavigation.bottom.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[12px] text-white/40 hover:text-white/70 transition-colors duration-200"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
