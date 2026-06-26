"use client";

import { FiZap } from "react-icons/fi";

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050816] px-4">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/[0.07] blur-[180px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.05] blur-[150px] rounded-full" />

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-lg bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] rounded-2xl p-10 md:p-16 text-center shadow-2xl">
        
        {/* Animated Icon */}
        <div className="relative w-20 h-20 mx-auto mb-8 flex items-center justify-center">
          {/* Pulsing Glow Ring */}
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
          
          {/* Icon Container */}
          <div className="relative w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400">
            <FiZap className="w-8 h-8" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-[36px] md:text-[44px] font-bold text-white leading-[1.1] tracking-tight mb-4">
          Coming Soon
        </h1>

        {/* Subtext */}
        <p className="text-slate-400 text-[15px] leading-relaxed max-w-sm mx-auto">
          We are building something awesome. Stay tuned!
        </p>
      </div>
    </div>
  );
}