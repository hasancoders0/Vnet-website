"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const faqs = [
  {
    q: "How quickly will you respond to my message?",
    a: "We typically respond within 24 hours during business days. For urgent inquiries, you can also reach out to us via live chat.",
  },
  {
    q: "Do you offer custom solutions for businesses?",
    a: "Yes! We specialize in custom solutions tailored exactly to your specific business needs and goals.",
  },
  {
    q: "Where are you located?",
    a: "Our primary office is in New York, but we work with clients worldwide thanks to our remote-first approach.",
  },
];

export default function ContactFAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-16 md:py-24 px-6 bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 md:p-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT - ACCORDION */}
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>

              <Link
                href="/faq"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-blue-600 hover:text-blue-700 transition-colors group"
              >
                View All FAQs
                <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Accordion Container */}
            <div className="rounded-2xl border border-slate-200/70 overflow-hidden">
              {faqs.map((item, i) => {
                const isActive = activeIndex === i;

                return (
                  <div key={i} className={`${i !== faqs.length - 1 ? "border-b border-slate-100" : ""}`}>
                    {/* Question Button */}
                    <button
                      onClick={() => setActiveIndex(isActive ? null : i)}
                      className="w-full flex items-center justify-between py-5 px-6 text-left"
                    >
                      <span className="text-[14px] font-medium text-slate-800 pr-4">
                        {item.q}
                      </span>

                      {/* Toggle Icon */}
                      <div
                        className={`
                          w-8 h-8 rounded-xl border flex items-center justify-center flex-shrink-0
                          transition-all duration-300
                          ${
                            isActive
                              ? "bg-blue-50 border-blue-200/60 text-blue-600 rotate-0"
                              : "bg-slate-50 border-slate-200/70 text-slate-400 rotate-180"
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

                    {/* Answer (Smooth Grid Animation) */}
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
                        <p className="text-[13px] text-slate-500 leading-[1.7] px-6 pb-5">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT - IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[280px] md:w-[320px] aspect-square bg-slate-100 rounded-2xl overflow-hidden">
              <Image
                src="/website-components/faq-img.png"
                alt="faq illustration"
                fill
                className="object-contain p-8"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}