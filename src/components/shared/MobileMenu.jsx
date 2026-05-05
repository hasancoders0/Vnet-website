"use client";

import Link from "next/link";
import {
  FaHome,
  FaCogs,
  FaBoxOpen,
  FaNewspaper,
  FaTools,
  FaInfoCircle,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";

export default function MobileMenu({ open, setOpen, pathname }) {
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
      {/* BACKDROP */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } bg-black/60 backdrop-blur-md`}
      />

      {/* PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-[88%] max-w-sm z-50
        transform transition-transform duration-500 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Premium gradient background */}
        <div className="h-full bg-gradient-to-br from-[#0a0f2c] via-[#0b1235] to-[#0a0a0a] backdrop-blur-2xl border-l border-white/10">

          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <span className="text-lg font-semibold text-white">Menu</span>

            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <FaTimes />
            </button>
          </div>

          {/* NAV */}
          <div className="p-6 space-y-3">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                  ${
                    active
                      ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            {/* CTA */}
            <div className="pt-6 border-t border-white/10">
              <Link
                href="/contact"
                className="block text-center px-5 py-3 rounded-xl 
                bg-gradient-to-r from-purple-500 to-blue-500 font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}