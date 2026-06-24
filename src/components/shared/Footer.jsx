"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaArrowUp,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";

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

  const socials = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
  ];

  return (
    <>
      <footer
        ref={sectionRef}
        className="relative bg-[#050816] pt-20 pb-10 px-6 border-t border-white/[0.06] overflow-hidden"
      >
        {/* ──────── BACKGROUND ──────── */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1100px] h-[500px] bg-gradient-to-r from-blue-600/[0.06] via-purple-600/[0.06] to-cyan-500/[0.04] blur-[160px] rounded-full" />
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-500/[0.02] blur-[120px] rounded-full" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/[0.02] blur-[120px] rounded-full" />
        </div>

        {/* ──────── SUBTLE TOP LINE ──────── */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />

        <div className="max-w-[1400px] mx-auto">
          {/* ════════ MAIN GRID ════════ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-6 mb-16">
            {/* ── Logo + Info ── */}
            <div className="footer-col lg:col-span-4">
              <Image
                src="/website-components/logo.png"
                alt="logo"
                width={120}
                height={40}
                className="h-auto w-auto"
              />

              <p className="text-[13px] text-white/40 leading-[1.8] mb-7 max-w-[280px]">
                We help businesses grow with digital solutions that make an
                impact. Partner with us to scale your vision.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-2.5">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg border border-white/[0.06] bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
                  >
                    <social.icon size={13} />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Company ── */}
            <div className="footer-col lg:col-span-2">
              <h3 className="text-[11px] font-semibold text-white/80 tracking-[0.15em] uppercase mb-6">
                Company
              </h3>
              <ul className="space-y-3.5">
                {[
                  { title: "About Us", href: "/about" },
                  { title: "Our Services", href: "/services" },
                  { title: "Careers", href: "/careers" },
                  { title: "Contact Us", href: "/contact" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/35 hover:text-white/80 transition-colors duration-300 relative group inline-block"
                    >
                      {link.title}
                      <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Resources ── */}
            <div className="footer-col lg:col-span-2">
              <h3 className="text-[11px] font-semibold text-white/80 tracking-[0.15em] uppercase mb-6">
                Resources
              </h3>
              <ul className="space-y-3.5">
                {[
                  { title: "Journal", href: "/journal" },
                  { title: "Tools", href: "/tools" },
                  { title: "Help Center", href: "/support" },
                  { title: "Support", href: "/support" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/35 hover:text-white/80 transition-colors duration-300 relative group inline-block"
                    >
                      {link.title}
                      <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Legal ── */}
            <div className="footer-col lg:col-span-2">
              <h3 className="text-[11px] font-semibold text-white/80 tracking-[0.15em] uppercase mb-6">
                Legal
              </h3>
              <ul className="space-y-3.5">
                {[
                  { title: "Privacy Policy", href: "/privacy" },
                  { title: "Refund Policy", href: "/refund-policy" },
                  { title: "Terms & Conditions", href: "/terms" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/35 hover:text-white/80 transition-colors duration-300 relative group inline-block"
                    >
                      {link.title}
                      <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Join Program ── */}
            <div className="footer-col lg:col-span-2">
              <h3 className="text-[11px] font-semibold text-white/80 tracking-[0.15em] uppercase mb-6">
                Join Program
              </h3>

              <p className="text-[13px] text-white/35 leading-[1.7] mb-5">
                Become part of our issue tracking & growth program.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2.5 rounded-lg text-[13px] font-medium hover:shadow-[0_8px_30px_rgba(99,102,241,0.35)] hover:scale-[1.03] transition-all duration-300"
              >
                Join Now <FaArrowRight size={10} />
              </Link>
            </div>
          </div>

          {/* ════════ BOTTOM BAR ════════ */}
          <div className="footer-bottom-anim border-t border-white/[0.06] pt-7 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-white/25 tracking-wide">
              © {new Date().getFullYear()} Visionary Network. All rights
              reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-[11px] text-white/25 hover:text-white/50 transition-colors duration-300"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-[11px] text-white/25 hover:text-white/50 transition-colors duration-300"
              >
                Terms
              </Link>
              <Link
                href="/sitemap"
                className="text-[11px] text-white/25 hover:text-white/50 transition-colors duration-300"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
