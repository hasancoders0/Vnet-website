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
        py-6
      "
    >
      <FaQuoteLeft
        className="
          absolute
          top-5
          right-5
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
          text-slate-800
          font-medium
          pr-10
        "
      >
        {block.quote}
      </p>

      {block.author && (
        <div className="mt-4 text-sm text-slate-500">
          — {block.author}
        </div>
      )}
    </div>
  );
}