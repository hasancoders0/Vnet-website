"use client";

import { FaCheckCircle } from "react-icons/fa";

export default function ServiceFeatures({ data }) {
  return (
    <div className="lg:col-span-1 pt-2">

      {/* TITLE */}
      <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
        What You Get
      </h3>

      {/* DESC */}
      <p className="text-[13px] text-gray-500 leading-relaxed mb-8 max-w-[260px]">
        We follow the best practices and latest technologies to deliver
        high-performing websites.
      </p>

      {/* LIST */}
      <div className="space-y-3">
        {data.whatYouGet.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-2 text-[13px] text-gray-700 leading-snug"
          >
            <FaCheckCircle className="text-green-500 text-[12px] mt-[2px]" />
            <span>{item}</span>
          </div>
        ))}
      </div>

    </div>
  );
}