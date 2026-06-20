"use client";

import AppImage from "@/components/ui/AppImage";
import { FaUserFriends, FaRocket } from "react-icons/fa";

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden">

      {/*  BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <AppImage
          src="/website-components/tools-background.png"
          alt="about background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 pt-24 pb-36 md:pb-44 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ================= LEFT ================= */}
        <div className="text-white">

          {/* Breadcrumb */}
          <p className="text-white/60 text-sm mb-4">
            Home <span className="mx-2">›</span> About Us
          </p>

          {/* Badge */}
          <span className="inline-block text-xs px-4 py-1.5 rounded-full bg-white/10 backdrop-blur mb-5">
            ABOUT US
          </span>

          {/* Title */}
          <h1 className="text-[38px] md:text-[52px] font-bold leading-tight mb-6">
            We Build Digital{" "}
            <span className="text-blue-400">
              Solutions
            </span>{" "}
            That Inspire
          </h1>

          {/* Description */}
          <p className="text-white/70 max-w-[520px] mb-10 leading-relaxed">
            At Visionary Network, we’re passionate about helping businesses and
            creators grow in the digital world. We build modern solutions,
            powerful tools, and resources that make a real impact.
          </p>

          {/* FEATURES */}
          <div className="space-y-6">

            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-blue-500/20 flex items-center justify-center">
                <FaUserFriends className="text-blue-400 text-sm" />
              </div>

              <div>
                <p className="font-semibold text-white">
                  Customer First
                </p>
                <p className="text-white/60 text-sm mt-1">
                  We put our customers at the center of everything we do.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-purple-500/20 flex items-center justify-center">
                <FaRocket className="text-purple-400 text-sm" />
              </div>

              <div>
                <p className="font-semibold text-white">
                  Innovation Driven
                </p>
                <p className="text-white/60 text-sm mt-1">
                  We constantly explore new ideas and technologies.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="relative w-full flex justify-center lg:justify-end">

          {/* IMAGE CARD */}
          <div className="relative w-full max-w-[600px] rounded-2xl overflow-hidden shadow-2xl">

            <AppImage
              src="/website-components/about-top-img.png"
              alt="team working"
              width={600}
              height={420}
              priority
              className="w-full h-auto object-cover"
            />

          </div>

          {/* QUOTE BOX */}
          <div className="absolute -bottom-10 left-6 right-6 bg-white rounded-xl p-6 shadow-xl">

            <p className="text-gray-700 text-sm text-center leading-relaxed">
              <span className="text-blue-500 text-lg">“</span>
              Our mission is to empower people and businesses with digital
              solutions that drive growth and success.
              <span className="text-blue-500 text-lg">”</span>
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}