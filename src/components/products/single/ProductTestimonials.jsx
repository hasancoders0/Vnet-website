"use client";

import { useState } from "react";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ProductTestimonials({ reviews = [] }) {
  const [index, setIndex] = useState(0);

  if (!reviews.length) return null;

  const prev = () => {
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const item = reviews[index];

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-[1000px] mx-auto px-6">

        {/* 🔥 HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-[28px] font-semibold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Real feedback from our happy customers
          </p>
        </div>

        {/* 🔥 CARD */}
        <div className="relative">

          <div className="bg-white rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 text-center transition">

            {/* ⭐ STARS */}
            <div className="flex justify-center gap-1 text-yellow-400 mb-5">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < item.rating ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>

            {/* 💬 COMMENT */}
            <p className="text-gray-700 text-[15px] leading-relaxed max-w-[600px] mx-auto mb-8">
              “{item.comment}”
            </p>

            {/* 👤 USER */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                {item.name.charAt(0)}
              </div>

              <p className="text-sm font-medium text-gray-900">
                {item.name}
              </p>

              <p className="text-xs text-gray-400">
                {item.date}
              </p>
            </div>

          </div>

          {/* 🔥 ARROWS */}
          <button
            onClick={prev}
            className="absolute -left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border rounded-full flex items-center justify-center shadow hover:bg-gray-100 transition"
          >
            <FaArrowLeft size={12} />
          </button>

          <button
            onClick={next}
            className="absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border rounded-full flex items-center justify-center shadow hover:bg-gray-100 transition"
          >
            <FaArrowRight size={12} />
          </button>

        </div>

        {/* 🔥 DOTS */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === index
                  ? "bg-purple-600 w-5"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}