"use client";

import { FaCheck } from "react-icons/fa";

export default function ListBlock({ block }) {
  if (!block?.items?.length) return null;

  return (
    <ul className="list-none space-y-4">
      {block.items.map((item, index) => (
        <li key={index} className="flex items-start gap-3.5">
          {/* Custom Modern Check Marker */}
          <span
            className="
              mt-1
              flex-shrink-0
              w-5
              h-5
              rounded-full
              bg-emerald-50
              border
              border-emerald-200/70
              flex
              items-center
              justify-center
              text-emerald-600
            "
          >
            <FaCheck className="text-[9px]" />
          </span>

          {/* List Text */}
          <span className="text-slate-600 leading-7">
            {typeof item === "string" ? item : item?.text || ""}
          </span>
        </li>
      ))}
    </ul>
  );
}