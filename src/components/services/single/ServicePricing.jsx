"use client";

import { FaCheckCircle } from "react-icons/fa";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function ServicePricing({ pricing }) {
  const [toast, setToast] = useState(false);

  const handleClick = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <div className="lg:col-span-3 relative">

      {/* TITLE */}
      <h2 className="text-[18px] font-semibold text-gray-900 mb-8">
        Choose Your Package
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {(pricing || []).map((plan, i) => (
          <div
            key={i}
            className={`relative rounded-2xl border px-6 py-7 flex flex-col h-full transition-all duration-300 group
            ${
              plan.highlighted
                ? "border-blue-500 shadow-xl bg-white scale-[1.02]"
                : "border-gray-200 bg-white hover:shadow-lg hover:-translate-y-1"
            }`}
          >

            {/* BADGE */}
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full shadow">
                Best Value
              </span>
            )}

            {/* CONTENT */}
            <div className="flex-grow">

              {/* NAME */}
              <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
                {plan.name}
              </h3>

              {/* DESC */}
              <p className="text-[12px] text-gray-500 mb-5 leading-relaxed">
                {plan.description}
              </p>

              {/* PRICE */}
              <div className="mb-5">
                <span className="text-[28px] font-bold text-gray-900">
                  ${plan.price}
                </span>
              </div>

              {/* FEATURES */}
              <div className="space-y-2.5 mb-6">
                {plan.features.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-[12px] text-gray-700"
                  >
                    <FaCheckCircle className="text-green-500 text-[10px] mt-[2px]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ BUTTON (NOW ALWAYS AT BOTTOM) */}
            <Button
              onClick={handleClick}
              variant={plan.highlighted ? "primary" : "outline"}
              className={`w-full text-[13px] py-2.5 transition-all duration-300
              ${
                plan.highlighted
                  ? "shadow-lg hover:shadow-xl"
                  : "hover:bg-gray-100"
              }`}
            >
              Select Plan
            </Button>

          </div>
        ))}

      </div>

      {/* FOOTNOTE */}
      <p className="text-[12px] text-gray-500 mt-8">
        Need a custom solution?{" "}
        <span className="text-blue-500 cursor-pointer hover:underline">
          Contact us
        </span>
      </p>

      {/* ✅ TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-black text-white text-sm px-5 py-3 rounded-lg shadow-xl animate-fadeIn">
          🚀 We are launching payment integration soon!
        </div>
      )}
    </div>
  );
}
