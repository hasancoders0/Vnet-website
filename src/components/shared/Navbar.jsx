"use client";

import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { navigation } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";
import { FaBars } from "react-icons/fa";

import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-slate-950/20">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between text-white">
          {/* ✅ FIXED LOGO */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-auto">
              <AppImage
                src={SITE_CONFIG.logo.light}
                alt={SITE_CONFIG.name}
                width={140}
                height={40}
                priority
                quality={90}
                className="h-10 w-auto object-contain"
              />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group"
                >
                  <span
                    className={`transition ${
                      active
                        ? "text-white"
                        : "text-white/70 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>

                  <span
                    className={`absolute left-0 -bottom-2 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* CTA */}
            <Link
              href="/contact"
              className="
                hidden lg:inline-flex items-center
                px-5 py-2.5 rounded-full
                text-sm font-medium
                bg-gradient-to-r from-purple-500 to-blue-500
                hover:-translate-y-0.5
                transition-all
                shadow-lg
                "
            >
              Get Started
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur border border-white/10"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} setOpen={setOpen} pathname={pathname} />
    </>
  );
}
