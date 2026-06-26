"use client";

import { FaQuoteLeft } from "react-icons/fa";

export default function QuoteBlock({ block }) {
  if (!block?.quote) return null;

  return (
    <div
      className="
        relative
        rounded-2xl
        border-l-4
        border-blue-500
        bg-blue-50/40
        px-8
        py-7
      "
    >
      <FaQuoteLeft
        className="
          absolute
          top-6
          right-6
          text-blue-200
          text-4xl
        "
      />

      <p
        className="
          text-lg
          md:text-xl
          leading-9
          italic
          font-medium
          text-slate-700
          pr-10
        "
      >
        {block.quote}
      </p>
    </div>
  );
}