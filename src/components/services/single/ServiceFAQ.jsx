"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function ServiceFAQ({ faq = [] }) {
  const [active, setActive] = useState(0);

  const toggle = (index) => {
    setActive((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-[900px] mx-auto px-5 md:px-6">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">
            FAQ
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Everything you need to know about this service. If you still have
            questions, feel free to contact us.
          </p>
        </div>

        {/* FAQ ITEMS */}
        <div className="space-y-4">
          {faq.map((item, index) => {
            const isActive = active === index;

            return (
              <div
                key={index}
                className={`
                  rounded-3xl
                  border
                  overflow-hidden
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "bg-white border-blue-200 shadow-md"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }
                `}
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggle(index)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    gap-4
                    px-5
                    md:px-6
                    py-5
                    md:py-6
                    text-left
                  "
                >
                  <h3
                    className={`
                      text-base
                      md:text-lg
                      font-semibold
                      leading-7
                      transition-colors
                      ${isActive ? "text-slate-900" : "text-slate-800"}
                    `}
                  >
                    {item.question}
                  </h3>

                  <div
                    className={`
                      w-8 h-8
                      md:w-9 md:h-9
                      rounded-full
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "bg-slate-100 text-slate-500"
                      }
                    `}
                  >
                    {isActive ? (
                      <FaMinus className="text-[10px] md:text-xs" />
                    ) : (
                      <FaPlus className="text-[10px] md:text-xs" />
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
                      <div className="border-t border-slate-100 pt-4 md:pt-5">
                        <p className="text-sm md:text-base text-slate-600 leading-6 md:leading-7">
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
