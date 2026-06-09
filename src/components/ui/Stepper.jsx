"use client";

import { FaCheck } from "react-icons/fa";

export default function Stepper({
  steps = [],
  current = 0,
}) {
  return (
    <div className="w-full">

      <div className="flex items-center justify-between relative">

        {steps.map((step, i) => {
          const isActive = i === current;
          const isCompleted = i < current;

          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center relative"
            >

              {/* ===== LINE (BACKGROUND) ===== */}
              {i !== steps.length - 1 && (
                <div className="absolute top-4 left-1/2 w-full h-[3px] bg-gray-200 z-0" />
              )}

              {/* ===== LINE (PROGRESS) ===== */}
              {i !== steps.length - 1 && isCompleted && (
                <div className="absolute top-4 left-1/2 w-full h-[3px] bg-gradient-to-r from-blue-500 to-purple-600 z-0" />
              )}

              {/* ===== CIRCLE ===== */}
              <div
                className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-all
                ${
                  isCompleted
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : isActive
                    ? "bg-white border-2 border-purple-500 text-purple-600 shadow-sm"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? (
                  <FaCheck className="text-xs" />
                ) : (
                  i + 1
                )}
              </div>

              {/* ===== LABEL ===== */}
              <span
                className={`mt-3 text-xs sm:text-sm font-medium text-center transition
                ${
                  isActive
                    ? "text-purple-600"
                    : isCompleted
                    ? "text-gray-700"
                    : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}