"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050816]/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 px-8 py-7 rounded-2xl border border-white/10 bg-white/[0.05]">
        
        {/* Clean SVG Spinner */}
        <svg 
          className="animate-spin h-10 w-10 text-slate-300" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4" 
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 00-5.373 5.373H0c4.268 0 8 3.732 8 8z" 
          />
        </svg>

        <p className="text-white/70 text-sm font-medium tracking-wide">
          Loading...
        </p>
        
      </div>
    </div>
  );
}