"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function ServiceFAQ({ faq }) {
  const [active, setActive] = useState(0); // open first by default

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-[900px] mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Everything you need to know about this service. If you still have
            questions, feel free to reach out.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">

          {faq.map((item, i) => {
            const isActive = active === i;

            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300
                ${
                  isActive
                    ? "bg-white border-blue-200 shadow-md"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >

                {/* QUESTION */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-medium text-gray-900 pr-4">
                    {item.question}
                  </span>

                  <div
                    className={`transition-transform duration-300 ${
                      isActive ? "rotate-180" : ""
                    }`}
                  >
                    {isActive ? (
                      <FaMinus className="text-sm text-blue-500" />
                    ) : (
                      <FaPlus className="text-sm text-gray-400" />
                    )}
                  </div>
                </button>

                {/* ANSWER */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
                      {item.answer}
                    </p>
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