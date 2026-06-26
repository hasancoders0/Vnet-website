"use client";

import Link from "next/link";
import CommonBackground from "@/components/ui/CommonBackground";
import { FaPaperPlane } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export default function AboutCTA() {
  return (
    <CommonBackground>
      <section className="relative py-20 md:py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="relative z-10 bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white">

            {/* LEFT CONTENT */}
            <div className="flex items-start md:items-center gap-5">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl border border-blue-400/20 bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-400">
                <FaPaperPlane className="text-xl" />
              </div>

              <div>
                <h3 className="text-[22px] md:text-[28px] font-bold text-white leading-tight tracking-tight mb-1.5">
                  Let’s Build Something Amazing Together
                </h3>
                <p className="text-white/60 text-[14px] md:text-[15px] leading-relaxed">
                  We’re always open to new ideas and collaborations.
                </p>
              </div>
            </div>

            {/* RIGHT BUTTON */}
            <Link
              href="/contact"
              className="
                inline-flex items-center gap-2.5 
                px-7 py-3.5 rounded-full 
                text-sm font-semibold 
                bg-white text-slate-900 
                hover:bg-slate-100
                shadow-[0_10px_30px_rgba(255,255,255,0.15)]
                hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)]
                hover:scale-[1.03]
                transition-all duration-300
                flex-shrink-0
                w-full md:w-auto
                justify-center
              "
            >
              Get in Touch
              <FiArrowRight className="w-4 h-4" />
            </Link>

          </div>
        </div>
      </section>
    </CommonBackground>
  );
}