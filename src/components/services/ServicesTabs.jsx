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

  /* ================= SLIDER CALCULATION ================= */
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

  /* ================= SUBTLE GLOW FOLLOW ================= */
  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    containerRef.current.style.setProperty("--x", `${x}px`);
  };

  // Get active icon safely for mobile
  const ActiveIcon = tabs.find((t) => t.name === active)?.icon || FaThLarge;

  return (
    <section className="relative z-20 -mt-16 px-4">
      <div className="max-w-[1100px] mx-auto">

        {/* ================= DESKTOP TABS ================= */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="
            hidden md:flex relative items-center gap-1.5 
            bg-white/80 backdrop-blur-xl border border-white/50 
            rounded-full p-1.5 
            shadow-[0_10px_35px_rgba(0,0,0,0.08)]
            group
          "
        >
          {/* Subtle Hover Glow Track */}
          <div
            className="
              pointer-events-none absolute inset-0 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
            "
            style={{
              background:
                "radial-gradient(300px circle at var(--x) center, rgba(59,130,246,0.08), transparent)",
            }}
          />

          {/* Active Background Slider */}
          <span
            className="
              absolute top-1.5 bottom-1.5 rounded-full 
              bg-blue-600 text-white
              transition-all duration-300 ease-out
              shadow-[0_4px_15px_rgba(37,99,235,0.3)]
            "
            style={{
              left: slider.left,
              width: slider.width,
            }}
          />

          {/* Tab Buttons */}
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.name;

            return (
              <button
                key={tab.name}
                ref={isActive ? activeRef : null}
                onClick={() => setActive(tab.name)}
                className={`
                  relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full 
                  text-[13px] font-medium transition-colors duration-200
                  ${isActive ? "text-white" : "text-slate-500 hover:text-slate-800"}
                `}
              >
                <Icon className="text-xs" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* ================= MOBILE DROPDOWN ================= */}
        <div className="md:hidden relative">
          {/* Trigger Button */}
          <button
            onClick={() => setOpen(!open)}
            className="
              w-full flex items-center justify-between 
              px-4 py-3.5 rounded-xl 
              bg-white border border-slate-200/70 
              shadow-sm text-sm font-medium text-slate-700
              transition-all duration-200
              hover:border-slate-300
            "
          >
            <span className="flex items-center gap-2.5">
              <ActiveIcon className="text-blue-600 text-sm" />
              {active}
            </span>

            <FaChevronDown
              className={`text-slate-400 text-xs transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown List */}
          <div
            className={`
              absolute w-full mt-2 
              bg-white border border-slate-200/70 rounded-2xl shadow-xl 
              p-2 z-50 overflow-hidden
              transition-all duration-300 origin-top
              ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
            `}
          >
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
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors duration-200
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-slate-600 hover:bg-slate-50"
                    }
                  `}
                >
                  <Icon className={`text-xs ${isActive ? "text-blue-500" : "text-slate-400"}`} />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}