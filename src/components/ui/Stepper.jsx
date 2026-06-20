"use client";

import { FaCheck } from "react-icons/fa";

export default function Stepper({
steps = [],
current = 0,
}) {


return ( <div className="space-y-5">
<div className="flex items-center justify-between"> <div> <p className="text-xs uppercase tracking-wide text-gray-400">
Progress </p>

      <h3 className="text-sm font-semibold text-gray-800">
        Step {current + 1} of {steps.length}
      </h3>
    </div>
  </div>

  {/* DESKTOP */}
  <div className="hidden md:flex items-center justify-between relative">
    {steps.map((step, i) => {
      const isActive = i === current;
      const isCompleted = i < current;

      return (
        <div
          key={i}
          className="flex-1 flex flex-col items-center relative"
        >
          {/* LINE */}
          {i !== steps.length - 1 && (
            <div className="absolute top-5 left-1/2 w-full h-[2px] bg-gray-200 z-0" />
          )}

          {/* ACTIVE LINE */}
          {i !== steps.length - 1 &&
            isCompleted && (
              <div className="absolute top-5 left-1/2 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-600 z-0" />
            )}

          {/* STEP */}
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

          {/* LABEL */}
          <span
            className={`mt-3 text-xs font-medium text-center px-1
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

  {/* MOBILE */}
  <div className="md:hidden">
    <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold">
        {current + 1}
      </div>

      <div>
        <p className="text-xs text-gray-400">
          Current Step
        </p>

        <h4 className="text-sm font-semibold text-gray-800">
          {steps[current]}
        </h4>
      </div>
    </div>
  </div>
</div>


);
}
