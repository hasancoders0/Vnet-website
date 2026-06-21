"use client";

import { FaCheckCircle } from "react-icons/fa";

export default function ListBlock({ block }) {
  if (!block?.items?.length) return null;

  return (
    <ul className="space-y-3">
      {block.items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-3"
        >
          <FaCheckCircle
            className="
              text-green-500
              text-sm
              mt-1
              flex-shrink-0
            "
          />

          <span className="text-slate-700 leading-7">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}