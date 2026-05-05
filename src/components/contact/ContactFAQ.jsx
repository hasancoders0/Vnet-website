"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactFAQ() {
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      q: "How quickly will you respond to my message?",
      a: "We typically respond within 24 hours during business days.",
    },
    {
      q: "Do you offer custom solutions for businesses?",
      a: "Yes! We specialize in custom solutions tailored to your needs.",
    },
    {
      q: "Where are you located?",
      a: "Our office is in New York, but we work with clients worldwide.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto bg-white border border-gray-200 rounded-2xl px-6 md:px-10 py-8 md:py-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                Frequently Asked Questions
              </h2>

              <button className="text-sm text-indigo-600 font-medium hover:underline">
                View All FAQs →
              </button>
            </div>

            {/* ACCORDION */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">

              {faqs.map((item, i) => (
                <div
                  key={i}
                  className={`px-5 py-4 ${
                    i !== faqs.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >

                  {/* QUESTION */}
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {item.q}
                    </p>

                    <span className="text-gray-400 text-lg leading-none">
                      {open === i ? "×" : "+"}
                    </span>
                  </button>

                  {/* ANSWER */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      open === i ? "mt-2 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.a}
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[260px] md:w-[320px] h-[260px] md:h-[320px]">
              <Image
                src="/website-components/faq-img.png"
                alt="faq"
                fill
                className="object-contain"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}