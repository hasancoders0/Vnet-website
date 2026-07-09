"use client";

import Link from "@/components/ui/AppLink";
import { FiArrowRight, FiHome, FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] flex items-center justify-center px-6">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[180px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[160px]" />

      {/* Card Content */}
      <div className="relative z-10 w-full max-w-2xl text-center">
        
        {/* Icon */}
        <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl animate-pulse" />
          
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl">
            <FiSearch className="w-8 h-8 text-blue-400" strokeWidth={1.5} />
          </div>
        </div>

        {/* 404 Text */}
        <p className="mb-4 text-[100px] md:text-[120px] font-black leading-none tracking-tighter text-white/10 select-none">
          404
        </p>

        {/* Title */}
        <h1 className="mb-4 text-[36px] md:text-[44px] font-bold text-white leading-[1.1] tracking-tight">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mx-auto mb-10 max-w-xl text-[15px] text-white/50 leading-relaxed">
          The page you are looking for doesn't exist, has been moved,
          or is currently unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="
              inline-flex items-center gap-2.5 
              rounded-full bg-white 
              px-7 py-3.5 
              text-sm font-semibold text-slate-900 
              hover:bg-slate-100
              shadow-[0_10px_30px_rgba(255,255,255,0.15)]
              hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)]
              hover:scale-[1.03]
              transition-all duration-300
            "
          >
            <FiHome className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="
              inline-flex items-center gap-2.5 
              rounded-full 
              border border-white/10 
              bg-white/[0.05] 
              backdrop-blur-xl
              px-7 py-3.5 
              text-sm font-semibold text-white 
              hover:bg-white/[0.1]
              hover:border-white/20
              transition-all duration-300
            "
          >
            Contact Support
            <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </main>
  );
}