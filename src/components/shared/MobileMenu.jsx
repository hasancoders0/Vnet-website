"use client";

import Link from "@/components/ui/AppLink";
import { useEffect } from "react";
import { navigation } from "@/config/navigation";
import { FiX } from "react-icons/fi";

export default function MobileMenu({ open, setOpen, pathname }) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Close on Escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setOpen]);

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm z-50 
        transform transition-transform duration-500 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="h-full bg-slate-950 border-l border-white/[0.1] backdrop-blur-xl flex flex-col">
          
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <span className="text-[15px] font-semibold text-white tracking-tight">
              Menu
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="
                w-10 h-10 flex items-center justify-center 
                rounded-xl 
                border border-white/10 
                bg-white/[0.05] 
                text-white/60 
                hover:text-white hover:bg-white/[0.1] 
                active:scale-95
                transition-all duration-200
              "
            >
              <FiX className="text-lg" />
            </button>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
            {navigation.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    flex items-center gap-3.5 px-4 py-3 rounded-xl border transition-all duration-200
                    ${
                      active
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20 font-medium"
                        : "border-transparent text-slate-400 hover:text-white hover:bg-white/[0.05]"
                    }
                  `}
                >
                  <Icon className="text-[18px] w-5 text-center" />
                  <span className="text-[15px]">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA BUTTON */}
          <div className="p-5 border-t border-white/[0.06]">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="
                flex items-center justify-center gap-2 
                w-full px-5 py-3.5 rounded-xl 
                bg-blue-600 text-white text-[14px] font-medium
                hover:bg-blue-700 
                active:scale-[0.98]
                shadow-[0_4px_15px_rgba(37,99,235,0.3)]
                transition-all duration-200
              "
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}