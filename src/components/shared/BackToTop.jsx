"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(percent);
      setVisible(scrollTop > 300);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 24;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`
        fixed
        bottom-8
        right-8
        md:bottom-8
        md:right-8
        max-md:bottom-5
        max-md:right-4
        z-[999]
        transition-all
        duration-300
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
    >
      <div className="relative w-14 h-14">
        <svg className="absolute inset-0 -rotate-90" width="56" height="56">
          {/* Background Ring */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="rgba(109,40,217,0.12)"
            strokeWidth="3"
          />

          {/* Progress Ring */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="url(#backToTopGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />

          <defs>
            <linearGradient
              id="backToTopGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>

        <div
          className="
            absolute
            inset-[6px]
            rounded-full
            bg-white
            border
            border-purple-100
            flex
            items-center
            justify-center
            text-[#6D28D9]
            shadow-[0_8px_30px_rgba(109,40,217,0.15)]
            transition-all
            duration-300
            hover:scale-110
            hover:shadow-[0_12px_40px_rgba(109,40,217,0.25)]
          "
        >
          <FaArrowUp size={12} />
        </div>
      </div>
    </button>
  );
}
