"use client";

import { FaCheck } from "react-icons/fa";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
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
      <h2 className="text-[18px] font-semibold text-slate-900 mb-8 tracking-tight">
        Choose Your Package
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {(pricing || []).map((plan, i) => (
          <div
            key={i}
            className={`
              relative rounded-2xl border px-6 py-7 
              flex flex-col h-full 
              transition-all duration-300 group
              ${
                plan.highlighted
                  ? "border-blue-500 bg-blue-50/30 shadow-xl md:scale-[1.03]"
                  : "border-slate-200/70 bg-white hover:shadow-[0_25px_60px_rgba(59,130,246,0.12)] hover:-translate-y-1.5"
              }
            `}
          >
            {/* BADGE */}
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] bg-blue-600 text-white px-3.5 py-1 rounded-full shadow-md uppercase tracking-wider font-medium">
                Best Value
              </span>
            )}

            {/* CONTENT */}
            <div className="flex-grow">
              {/* NAME */}
              <h3 className="text-[15px] font-semibold text-slate-900 mb-1">
                {plan.title}
              </h3>

              {/* DESC */}
              <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">
                {plan.description}
              </p>

              {/* PRICE + DELIVERY */}
              <div className="flex items-end justify-between pb-5 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-[32px] font-bold text-slate-900 tracking-tight">
                    ${plan.price}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                    Delivery
                  </p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {plan.deliveryTime}
                  </p>
                </div>
              </div>

              {/* FEATURES */}
              <ul className="space-y-3 mt-2">
                {plan.features.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-[13px] text-slate-600"
                  >
                    {/* Custom Check Marker */}
                    <span
                      className="
                        flex-shrink-0 
                        mt-0.5 
                        w-4 h-4 
                        rounded-full 
                        bg-emerald-50 
                        border border-emerald-200/70 
                        flex items-center justify-center 
                        text-emerald-600
                      "
                    >
                      <FaCheck className="text-[8px]" />
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* BUTTON */}
            <div className="mt-8">
              <Button
                onClick={handleClick}
                variant={plan.highlighted ? "primary" : "outline"}
                rightIcon={<FiArrowRight />}
                className="w-full text-[13px] py-3"
              >
                Select Plan
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTNOTE */}
      <p className="text-[13px] text-slate-500 mt-8 text-center">
        Need a custom solution?{" "}
        <a href="/contact" className="text-blue-600 font-medium hover:underline underline-offset-2">
          Contact us
        </a>
      </p>

      {/* TOAST NOTIFICATION */}
      <div
        className="
          fixed bottom-6 right-6 z-50 
          bg-slate-900 text-white text-sm 
          px-5 py-3.5 rounded-xl shadow-2xl 
          flex items-center gap-3
          transition-all duration-300 ease-out
        "
        style={{
          transform: toast ? "translateY(0)" : "translateY(16px)",
          opacity: toast ? 1 : 0,
          pointerEvents: toast ? "auto" : "none",
        }}
      >
        <FiCheckCircle className="text-emerald-400 text-lg" />
        <span>Payment integration coming soon!</span>
      </div>
    </div>
  );
}