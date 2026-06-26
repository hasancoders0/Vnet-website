"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CommonBackground from "@/components/ui/CommonBackground";
import {
  FaShieldAlt,
  FaUser,
  FaChartLine,
  FaCookie,
  FaLink,
  FaLock,
  FaUserCheck,
  FaSync,
  FaEnvelope,
  FaUndo,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaMoneyBillWave,
  FaFileContract,
  FaUserShield,
  FaBan,
  FaGavel,
  FaExclamationTriangle,
  FaDownload,
  FaCode,
  FaArchive,
  FaBalanceScale,
  FaCopyright,
  FaCopy,              // ✅ Add this
} from "react-icons/fa";


/* ================= ICON MAP ================= */
const iconMap = {
  // Privacy
  shield: FaShieldAlt,
  user: FaUser,
  chart: FaChartLine,
  cookie: FaCookie,
  link: FaLink,
  lock: FaLock,
  userCheck: FaUserCheck,
  sync: FaSync,
  mail: FaEnvelope,

  // Refund
  undo: FaUndo,
  check: FaCheckCircle,
  times: FaTimesCircle,
  clock: FaClock,
  money: FaMoneyBillWave,
  download: FaDownload,
  code: FaCode,
  archive: FaArchive,

  // Terms
  contract: FaFileContract,
  userShield: FaUserShield,
  ban: FaBan,
  gavel: FaGavel,
  warning: FaExclamationTriangle,
  scale: FaBalanceScale,
  copyright: FaCopyright,
};

export default function LegalLayout({
  title,
  badge,
  description,
  lastUpdated,
  bgImage,
  rightImage,
  sections,
}) {
  const [active, setActive] = useState(sections[0]?.id);
  const [progress, setProgress] = useState(0);

  /* ================= SCROLL ================= */
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 110;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  };

  /* ================= COPY LINK ================= */
  const copyLink = (id) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
  };

  /* ================= SCROLL DETECT ================= */
  useEffect(() => {
    const handleScroll = () => {
      let current = sections[0]?.id;

      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (!el) return;

        const top = el.offsetTop - 140;
        if (window.scrollY >= top) {
          current = s.id;
        }
      });

      setActive(current);

      // progress bar
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress((scrollTop / docHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) setTimeout(() => scrollTo(hash), 300);
  }, []);

  return (
    <main>
      {/* SCROLL PROGRESS */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 z-50 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      {/* ================= HERO ================= */}
      <CommonBackground>
        <section className="relative min-h-[460px] md:min-h-[560px] flex items-center pt-28 md:pt-32 pb-20 overflow-hidden">
          <div className="max-w-[1280px] mx-auto w-full px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* LEFT */}
            <div className="text-white max-w-[600px]">
              <span className="inline-flex items-center gap-2 text-[11px] px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.1] backdrop-blur-sm text-white/80 uppercase tracking-wider font-medium mb-8">
                {badge}
              </span>

              <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold text-white leading-[1.1] tracking-tight mb-6">
                {title}
              </h1>

              <p className="text-lg text-white/60 leading-relaxed mb-8">
                {description}
              </p>

              <p className="text-sm text-white/50">
                Last Updated: {lastUpdated}
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative w-full h-[260px] md:h-[340px]">
              <Image
                src={rightImage}
                alt={title}
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </section>
      </CommonBackground>

      {/* ================= CONTENT ================= */}
      <section className="py-16 md:py-24 px-6 bg-[#f8fafc]">
        <div className="max-w-[1280px] mx-auto">
          {/* MOBILE TABS */}
          <div className="lg:hidden mb-8 overflow-x-auto flex gap-2.5 pb-2">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                  active === item.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white border border-slate-200/70 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
            {/* SIDEBAR */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/70 shadow-sm p-5 h-fit sticky top-28">
              <p className="text-[13px] font-semibold text-slate-900 mb-4">
                On this page
              </p>

              {sections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 mb-1.5 ${
                    active === item.id
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item.title}
                </button>
              ))}

              {/* INFO CARD */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl border border-blue-200/60 bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <FaShieldAlt className="text-sm" />
                </div>
                <p className="text-[12px] text-slate-500 leading-relaxed">
                  Your data is protected with industry standards.
                </p>
              </div>
            </div>

            {/* CONTENT */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 md:p-10 space-y-10">
              {sections.map((item, i) => {
                const Icon = iconMap[item.icon];

                return (
                  <div
                    key={item.id}
                    id={item.id}
                    className="group scroll-mt-28 pb-10"
                  >
                    <div className="flex gap-4 items-start">
                      {/* ICON */}
                      <div className="w-12 h-12 rounded-2xl border border-blue-200/60 bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                        {Icon && <Icon className="text-lg" />}
                      </div>

                      {/* TEXT */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-[16px] font-semibold text-slate-900 leading-snug">
                            {i + 1}. {item.title}
                          </h3>

                          <button
                            onClick={() => copyLink(item.id)}
                            className="opacity-0 group-hover:opacity-100 transition-colors text-slate-400 hover:text-blue-600"
                            aria-label="Copy link"
                          >
                            <FaCopy size={14} />
                          </button>
                        </div>

                        <p className="text-[14px] text-slate-500 leading-[1.7] mt-2">
                          {item.content}
                        </p>
                      </div>
                    </div>

                    {i !== sections.length - 1 && (
                      <div className="mt-10 border-t border-slate-100" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
