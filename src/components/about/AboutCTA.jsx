"use client";

import Image from "next/image";
import Link from "next/link";
import { FaPaperPlane } from "react-icons/fa";

export default function AboutCTA() {
  return (
    <section className="px-6 pb-20">
      <div className="max-w-[1200px] mx-auto relative rounded-2xl overflow-hidden">

        {/* BACKGROUND IMAGE ONLY */}
        <Image
          src="/website-components/about-cta-bg.png"
          alt="cta background"
          fill
          priority
          className="object-cover object-center"
        />

        {/* CONTENT */}
        <div className="relative z-10 px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <FaPaperPlane />
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Let’s Build Something Amazing Together
              </h3>
              <p className="text-white/70 text-sm">
                We’re always open to new ideas and collaborations.
              </p>
            </div>

          </div>

          {/* RIGHT BUTTON */}
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full bg-white text-gray-900 text-sm font-medium hover:scale-105 transition"
          >
            Get in Touch →
          </Link>

        </div>

      </div>
    </section>
  );
}