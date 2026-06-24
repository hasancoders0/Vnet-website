"use client";

import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function PostNavigation({ previous, next }) {
  if (!previous && !next) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="grid md:grid-cols-2 gap-4">
        {/* PREVIOUS */}
        {previous ? (
          <Link
            href={`/journal/${previous.slug}`}
            className="
              group
              rounded-xl
              border
              border-gray-100
              p-5
              hover:border-purple-200
              hover:bg-purple-50/30
              transition-all
            "
          >
            <div className="flex items-center gap-2 text-sm text-purple-600 mb-3">
              <FiArrowLeft />
              Previous Article
            </div>

            <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
              {previous.title}
            </h3>
          </Link>
        ) : (
          <div />
        )}

        {/* NEXT */}
        {next ? (
          <Link
            href={`/journal/${next.slug}`}
            className="
              group
              rounded-xl
              border
              border-gray-100
              p-5
              text-right
              hover:border-purple-200
              hover:bg-purple-50/30
              transition-all
            "
          >
            <div className="flex items-center justify-end gap-2 text-sm text-purple-600 mb-3">
              Next Article
              <FiArrowRight />
            </div>

            <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
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
