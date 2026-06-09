"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaThLarge,
  FaCode,
  FaGlobe,
  FaChartBar,
  FaUserTie,
  FaShoppingBag,
  FaChevronDown,
} from "react-icons/fa";

const tabs = [
  { name: "All Services", icon: FaThLarge },
  { name: "Web Development", icon: FaCode },
  { name: "Web Applications", icon: FaGlobe },
  { name: "Digital Marketing", icon: FaChartBar },
  { name: "Consultation", icon: FaUserTie },
  { name: "CMS & eCommerce", icon: FaShoppingBag },
];

export default function ServicesTabs() {
  const [active, setActive] = useState("All Services");
  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);
  const activeRef = useRef(null);

  const [slider, setSlider] = useState({ left: 0, width: 0 });

  /* ================= SLIDER ================= */
  useEffect(() => {
    const container = containerRef.current;
    const activeEl = activeRef.current;

    if (!container || !activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    setSlider({
      left: activeRect.left - containerRect.left,
      width: activeRect.width,
    });
  }, [active]);

  /* ================= HOVER GLOW ================= */
  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;

    containerRef.current.style.setProperty("--x", `${x}px`);
  };

  return (
    <section className="relative z-20 -mt-16 px-4">

      <div className="max-w-[1100px] mx-auto">

        {/* ================= DESKTOP ================= */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="hidden md:flex relative items-center gap-2 
          bg-white/70 backdrop-blur-2xl border border-white/30 
          rounded-full p-2 shadow-[0_15px_40px_rgba(0,0,0,0.15)] overflow-hidden group"
        >

          {/* 🔥 HOVER GLOW TRACK */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
            style={{
              background:
                "radial-gradient(300px at var(--x) center, rgba(139,92,246,0.15), transparent)",
            }}
          />

          {/* 🔥 ACTIVE SLIDER */}
          <span
            className="absolute top-2 bottom-2 rounded-full 
            bg-gradient-to-r from-purple-500 to-blue-500 
            transition-all duration-300 shadow-lg"
            style={{
              left: slider.left,
              width: slider.width,
            }}
          />

          {/* 🔥 ACTIVE GLOW */}
          <span
            className="absolute top-2 bottom-2 rounded-full blur-xl opacity-40
            bg-gradient-to-r from-purple-500 to-blue-500 
            transition-all duration-300"
            style={{
              left: slider.left,
              width: slider.width,
            }}
          />

          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.name;

            return (
              <button
                key={tab.name}
                ref={isActive ? activeRef : null}
                onClick={() => setActive(tab.name)}
                className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                <Icon className="text-[13px]" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden relative">

          {/* Selected */}
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-5 py-3 rounded-full 
              bg-white/90 backdrop-blur border shadow-lg text-sm font-medium"
          >
            <span className="flex items-center gap-2">
              {tabs.find((t) => t.name === active)?.icon &&
                (() => {
                  const Icon = tabs.find((t) => t.name === active).icon;
                  return <Icon className="text-sm" />;
                })()}
              {active}
            </span>

            <FaChevronDown
              className={`transition ${open ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute w-full mt-2 bg-white rounded-2xl shadow-xl border p-2 z-50">

              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = active === tab.name;

                return (
                  <button
                    key={tab.name}
                    onClick={() => {
                      setActive(tab.name);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition
                      ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    <Icon className="text-xs" />
                    {tab.name}
                  </button>
                );
              })}

            </div>
          )}
        </div>

      </div>
    </section>
  );
}