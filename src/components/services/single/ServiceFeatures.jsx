"use client";

import { FaCheck } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";

export default function ServiceFeatures({ data }) {
  return (
    <div className="lg:col-span-1 pt-2">
      {/* TITLE */}
      <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
        What You Get
      </h3>

      {/* DESC */}
      <p className="text-sm text-slate-500 leading-relaxed mb-7">
        {data.whatYouGetDescription}
      </p>

      {/* LIST */}
      <ul className="space-y-1.5">
        {(data.whatYouGet || []).map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            {/* Custom Check Marker */}
            <span
              className="
                flex-shrink-0
                mt-0.5
                w-5 h-5
                rounded-full
                bg-emerald-50
                border border-emerald-200/70
                flex items-center justify-center
                text-emerald-600
              "
            >
              <FaCheck className="text-[8px]" />
            </span>

            {/* TEXT */}
            <span className="text-[14px] text-slate-600 leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* SUPPORT BOX */}
      <div className="mt-8 rounded-2xl border border-slate-200/70 bg-slate-50/50 p-5">
        <h4 className="text-[15px] font-semibold text-slate-900 mb-4">
          Support Included
        </h4>

        <div className="space-y-3">
          {/* Duration */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Duration</span>
            <span className="text-sm font-medium text-slate-800">
              {data.support?.duration}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200/60" />

          {/* Support Type */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Support Type</span>
            
            <div className="relative group flex items-center">
              <button
                type="button"
                className="
                  flex items-center justify-center
                  w-6 h-6
                  rounded-full
                  border border-slate-300
                  text-slate-400
                  hover:text-blue-600
                  hover:border-blue-400
                  transition-colors duration-200
                "
              >
                <FiInfo className="text-xs" />
              </button>

              {/* Tooltip (Positioned above to prevent clipping) */}
              <div
                className="
                  absolute
                  right-0
                  bottom-full
                  mb-2
                  w-64
                  rounded-xl
                  bg-slate-900
                  text-slate-200
                  text-xs
                  leading-relaxed
                  p-3.5
                  shadow-xl
                  opacity-0
                  invisible
                  group-hover:opacity-100
                  group-hover:visible
                  transition-all
                  duration-200
                  z-50
                "
              >
                {data.support?.type}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}