"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
  FaLink as FaCopy,
} from "react-icons/fa";

/* ================= ICON MAP ================= */
const iconMap = {
  shield: FaShieldAlt,
  user: FaUser,
  chart: FaChartLine,
  cookie: FaCookie,
  link: FaLink,
  lock: FaLock,
  userCheck: FaUserCheck,
  sync: FaSync,
  mail: FaEnvelope,

  undo: FaUndo,
  check: FaCheckCircle,
  times: FaTimesCircle,
  clock: FaClock,
  money: FaMoneyBillWave,

  contract: FaFileContract,
  userShield: FaUserShield,
  ban: FaBan,
  gavel: FaGavel,
  warning: FaExclamationTriangle,
};

export default function LegalLayout({
  title,
  badge,
  description,
  lastUpdated,
  bgImage,
  rightImage, // ✅ important
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
      {/* 🔥 SCROLL PROGRESS */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-purple-500 to-blue-500 z-50"
        style={{ width: `${progress}%` }}
      />

      {/* ================= HERO ================= */}
      <section className="relative min-h-[460px] md:min-h-[560px] flex items-center overflow-hidden">

        {/* BG */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={bgImage}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="max-w-[1280px] mx-auto w-full px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div className="text-white max-w-[600px]">

            <span className="inline-block text-xs px-4 py-1.5 rounded-full bg-white/10 mb-6 backdrop-blur">
              {badge}
            </span>

            <h1 className="text-[36px] md:text-[48px] font-bold mb-4 leading-tight">
              {title}
            </h1>

            <p className="text-white/70 mb-6 leading-relaxed">
              {description}
            </p>

            <p className="text-white/60 text-sm">
              📅 Last Updated: {lastUpdated}
            </p>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full h-[260px] md:h-[340px]">

            <Image
              src={rightImage}
              alt={title}
              fill
              className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.4)]"
              priority
            />

          </div>

        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-16 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1280px] mx-auto">

          {/* MOBILE TABS */}
          <div className="lg:hidden mb-6 overflow-x-auto flex gap-2 pb-2">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition ${
                  active === item.id
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow"
                    : "bg-white border border-gray-200 text-gray-600"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* SIDEBAR */}
            <div className="hidden lg:block bg-white/70 backdrop-blur border rounded-2xl p-5 h-fit sticky top-6 shadow-md">

              <p className="text-sm font-semibold mb-4 text-gray-800">
                On this page
              </p>

              {sections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${
                    active === item.id
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.title}
                </button>
              ))}

              {/* INFO CARD */}
              <div className="mt-6 p-4 rounded-xl bg-gray-50 border text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
                  🔒
                </div>
                <p className="text-xs text-gray-600">
                  Your data is protected with industry standards.
                </p>
              </div>

            </div>

            {/* CONTENT */}
            <div className="lg:col-span-3 bg-white/90 backdrop-blur border rounded-2xl p-6 md:p-8 space-y-10 shadow-md">

              {sections.map((item, i) => {
                const Icon = iconMap[item.icon];

                return (
                  <div key={item.id} id={item.id} className="pb-6 group">

                    <div className="flex gap-4 items-start">

                      {/* ICON */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                        {Icon && (
                          <Icon className="text-purple-600 text-lg" />
                        )}
                      </div>

                      {/* TEXT */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">

                          <h3 className="font-semibold text-gray-900 text-base">
                            {i + 1}. {item.title}
                          </h3>

                          <button
                            onClick={() => copyLink(item.id)}
                            className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-purple-600"
                          >
                            <FaCopy size={14} />
                          </button>

                        </div>

                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                          {item.content}
                        </p>
                      </div>

                    </div>

                    {i !== sections.length - 1 && (
                      <div className="mt-6 border-t border-gray-200" />
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