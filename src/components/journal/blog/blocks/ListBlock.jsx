"use client";

import { FaCheckCircle } from "react-icons/fa";

export default function ListBlock({ block }) {
  if (!block?.items?.length) return null;

  return (
    <div className="my-8">
      <ul className="space-y-4">
        {block.items.map((item, index) => (
          <li key={index} className="flex items-start gap-4">
            <FaCheckCircle
              className="
                mt-1
                text-green-500
                text-base
                flex-shrink-0
              "
            />

            <span
              className="
                text-slate-700
                leading-7
              "
            >
              {typeof item === "string" ? item : item?.text || ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
