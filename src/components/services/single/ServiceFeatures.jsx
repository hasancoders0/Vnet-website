"use client";

import { FaCheckCircle } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";

export default function ServiceFeatures({ data }) {
  return (
    <div className="lg:col-span-1 pt-2">
      {/* TITLE */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">What You Get</h3>

      {/* DESC */}
      <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-sm">
        {data.whatYouGetDescription}
      </p>

      {/* LIST */}
      <div className="space-y-2">
        {(data.whatYouGet || []).map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            {/* ICON */}
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-green-50">
              <FaCheckCircle className="text-green-500 text-xs" />
            </div>

            {/* TEXT */}
            <span className="text-sm text-gray-700 leading-relaxed">
              {item}
            </span>
          </div>
        ))}
      </div>
      {/* SUPPORT */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Support Included
        </h4>

        <div className="space-y-2">
          {/* Duration */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500">Duration</span>

            <span className="text-sm font-medium text-gray-900">
              {data.support?.duration}
            </span>
          </div>

          {/* Support Type */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500">Support Type</span>

            <div className="relative group">
              <button
                type="button"
                className="
            flex items-center justify-center
            w-5 h-5
            rounded-full
            border border-gray-300
            text-gray-500
            hover:text-blue-600
            hover:border-blue-300
            transition-colors
          "
              >
                <FiInfo className="text-xs" />
              </button>

              {/* Tooltip */}
              <div
                className="
            absolute
            right-0
            top-full
            mt-2
            w-64
            rounded-xl
            bg-gray-900
            text-white
            text-xs
            p-3
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
