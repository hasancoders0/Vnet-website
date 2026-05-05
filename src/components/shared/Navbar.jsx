"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

import {
  FaShoppingCart,
  FaBars,
  FaHome,
  FaCogs,
  FaBoxOpen,
  FaNewspaper,
  FaTools,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";

import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: FaHome },
    { label: "Services", href: "/services", icon: FaCogs },
    { label: "Products", href: "/products", icon: FaBoxOpen },
    { label: "Journal", href: "/journal", icon: FaNewspaper },
    { label: "Tools", href: "/tools", icon: FaTools },
    { label: "About", href: "/about", icon: FaInfoCircle },
    { label: "Contact", href: "/contact", icon: FaEnvelope },
  ];

  return (
    <>
      <header className="w-full transition-all duration-300 bg-transparent absolute z-20">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between text-white">
          {/* LOGO (Reduced Size) */}
          <Link href="/" className="flex items-center">
            <Image
              src="/website-components/logo.png"
              alt="logo"
              width={120}
              height={40}
              className="h-auto w-auto"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group flex items-center gap-2"
                >
                  <Icon className="text-[13px] opacity-80" />

                  <span
                    className={`transition ${
                      active
                        ? "text-white"
                        : "text-white/70 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* underline */}
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
            {/* CART */}
            <div className="relative hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition">
              <FaShoppingCart size={15} />

              <span className="absolute -top-1 -right-1 text-[10px] px-1.5 py-[1px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                0
              </span>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium 
              bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition shadow-lg"
            >
              Get Started
            </Link>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur border border-white/10"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <MobileMenu open={open} setOpen={setOpen} pathname={pathname} />
    </>
  );
}
