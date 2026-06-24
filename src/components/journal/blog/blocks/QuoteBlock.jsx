"use client";

import { FaQuoteLeft } from "react-icons/fa";

export default function QuoteBlock({ block }) {
  if (!block?.quote) return null;

  return (
    <div
      className="
        relative
        rounded-3xl
        border-l-4
        border-purple-500
        bg-purple-50
        px-8
        py-8
      "
    >
      <FaQuoteLeft
        className="
          absolute
          top-6
          right-6
          text-purple-200
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
          text-slate-800
          pr-10
          mb-0
        "
      >
        {block.quote}
      </p>
    </div>
  );
}
