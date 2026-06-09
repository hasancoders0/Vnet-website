"use client";

import Image from "next/image";
import { useState } from "react";

export default function Platforms() {
  const logos = [
    { src: "/website-components/wordpress.png", name: "WordPress" },
    { src: "/website-components/shopify.png", name: "Shopify" },
    { src: "/website-components/laravel.png", name: "Laravel" },
    { src: "/website-components/mongodb.png", name: "MongoDB" },
    { src: "/website-components/nodejs.png", name: "Node.js" },
    { src: "/website-components/reactjs.png", name: "React" },
    { src: "/website-components/nextjs.png", name: "Next.js" },
  ];

  return (
    <section className="relative z-20 -mt-16">

      {/* FULL WIDTH STRIP */}
      <div className="
        w-full
        border-t border-white/[0.1]
        backdrop-blur-2xl
        rounded-t-[28px]
        py-5 px-4
      ">

        <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-10 md:gap-y-0">

          {/* Label */}
          <p className="text-[12px] text-white/40 whitespace-nowrap font-medium tracking-wide uppercase">
            Platforms
          </p>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-white/[0.08]" />

          {/* Logos */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-10 md:gap-y-0">

            {logos.map((logo, i) => (
              <div
                key={i}
                className="group flex items-center transition-all duration-300 hover:scale-110"
                title={logo.name}
              >
                {/* White version (default) */}
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={80}
                  height={32}
                  className="object-contain absolute opacity-60 group-hover:opacity-0 transition-opacity duration-300"
                  style={{ filter: 'brightness(0) invert(1) opacity(0.6)' }}
                />
                {/* Original color version (on hover) */}
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={80}
                  height={32}
                  className="object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative"
                />
              </div>
            ))}

          </div>

        </div>
      </div>

    </section>
  );
}