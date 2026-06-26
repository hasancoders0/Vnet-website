"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function ServiceFAQ({ faq = [] }) {
  const [active, setActive] = useState(0);

  const toggle = (index) => {
    setActive((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 md:py-24 bg-[#f8fafc]">
      <div className="max-w-[900px] mx-auto px-5 md:px-6">
        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="text-[11px] px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium uppercase tracking-wider mb-4 inline-block">
            FAQ
          </span>

          <h2 className="text-[30px] md:text-[38px] font-bold text-slate-900 tracking-tight mb-3">
            Frequently Asked Questions
          </h2>

          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Everything you need to know about this service. Can&apos;t find the
            answer? Feel free to contact us.
          </p>
        </div>

        {/* FAQ ITEMS */}
        <div className="space-y-3">
          {faq.map((item, index) => {
            const isActive = active === index;

            return (
              <div
                key={index}
                className={`
                  rounded-2xl
                  border
                  bg-white
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                      : "border-slate-200/70 hover:border-slate-300"
                  }
                `}
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-5 text-left"
                >
                  <h3
                    className={`text-[15px] md:text-[16px] font-semibold leading-snug transition-colors ${
                      isActive ? "text-slate-900" : "text-slate-700"
                    }`}
                  >
                    {item.question}
                  </h3>

                  {/* TOGGLE ICON */}
                  <div
                    className={`
                      w-8 h-8
                      rounded-xl
                      flex items-center justify-center
                      flex-shrink-0
                      border
                      transition-all duration-300
                      ${
                        isActive
                          ? "bg-blue-50 border-blue-200/60 text-blue-600"
                          : "bg-slate-50 border-slate-200/70 text-slate-400"
                      }
                    `}
                  >
                    {isActive ? (
                      <FaMinus className="text-[10px]" />
                    ) : (
                      <FaPlus className="text-[10px]" />
                    )}
                  </div>
                </button>

                {/* ANSWER */}
                <div
                  className={`
                    grid
                    transition-all
                    duration-300
                    ease-in-out
                    ${
                      isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      <div className="border-t border-slate-100 pt-4">
                        <p className="text-[14px] text-slate-500 leading-[1.7]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}