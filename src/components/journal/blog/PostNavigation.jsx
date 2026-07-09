"use client";

import Link from "@/components/ui/AppLink";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function PostNavigation({ previous, next }) {
  if (!previous && !next) return null;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm">
      <div className="grid md:grid-cols-2 gap-4">
        {/* PREVIOUS ARTICLE */}
        {previous ? (
          <Link
            href={`/journal/${previous.slug}`}
            className="
              group
              flex flex-col
              p-5
              rounded-xl
              border border-slate-100
              hover:border-slate-200
              hover:bg-slate-50/50
              transition-all duration-200
            "
          >
            <span className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3 group-hover:text-blue-600 transition-colors">
              <FiArrowLeft className="text-sm" />
              Previous
            </span>

            <h3 className="font-semibold text-slate-800 text-[15px] leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
              {previous.title}
            </h3>
          </Link>
        ) : (
          <div />
        )}

        {/* NEXT ARTICLE */}
        {next ? (
          <Link
            href={`/journal/${next.slug}`}
            className="
              group
              flex flex-col items-end text-right
              p-5
              rounded-xl
              border border-slate-100
              hover:border-slate-200
              hover:bg-slate-50/50
              transition-all duration-200
            "
          >
            <span className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3 group-hover:text-blue-600 transition-colors">
              Next
              <FiArrowRight className="text-sm" />
            </span>

            <h3 className="font-semibold text-slate-800 text-[15px] leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
              {next.title}
            </h3>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}