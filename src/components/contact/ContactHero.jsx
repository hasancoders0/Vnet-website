"use client";

import AppImage from "@/components/ui/AppImage";
import { FaBolt, FaShieldAlt, FaUserFriends } from "react-icons/fa";

export default function ContactHero() {
  return (
    <section className="relative w-full overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <AppImage
          src="/website-components/top-bg.png"
          alt="background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 pt-24 pb-36 grid md:grid-cols-2 gap-12 items-center">

        {/* ================= LEFT ================= */}
        <div className="text-white">

          {/* Badge */}
          <span className="inline-block text-xs px-4 py-1.5 rounded-full bg-white/10 backdrop-blur mb-6">
            Contact Us
          </span>

          {/* Title */}
          <h1 className="text-[38px] md:text-[52px] font-bold leading-tight">
            Let’s Talk About <br />
            Your <span className="text-blue-400">Next Project</span>
          </h1>

          {/* Description */}
          <p className="text-white/70 mt-5 max-w-[520px] leading-relaxed">
            Have a question or want to work together? We’d love to hear from you.
            Send us a message and we’ll respond as soon as possible.
          </p>

          {/* FEATURES */}
          <div className="flex flex-wrap gap-8 mt-10">

            {/* Item */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <FaBolt className="text-purple-400 text-sm" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Quick Response</p>
                <p className="text-white/50 text-xs">We reply within 24 hours</p>
              </div>
            </div>

            {/* Item */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <FaShieldAlt className="text-blue-400 text-sm" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Trusted Support</p>
                <p className="text-white/50 text-xs">Your data is safe with us</p>
              </div>
            </div>

            {/* Item */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <FaUserFriends className="text-indigo-400 text-sm" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Real People</p>
                <p className="text-white/50 text-xs">Talk to our friendly team</p>
              </div>
            </div>

          </div>

        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="w-full flex justify-center md:justify-end">

          <div className="w-full max-w-[560px]">

            <AppImage
              src="/website-components/contact-top.png"
              alt="contact illustration"
              width={560}
              height={480}
              priority
              className="w-full h-auto object-contain"
            />

          </div>

        </div>

      </div>
    </section>
  );
}