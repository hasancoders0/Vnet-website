"use client";

import Link from "next/link";

export default function Pagination({ page, totalPages, baseQuery = "" }) {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const buildUrl = (newPage) => {
    const params = new URLSearchParams(baseQuery);

    params.set("page", newPage);

    return `?${params.toString()}#results`;
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 text-sm">
      {" "}
      <p className="text-gray-400">
        Page {page} of {totalPages}{" "}
      </p>
      <div className="flex items-center gap-2">
        <Link
          href={buildUrl(Math.max(page - 1, 1))}
          className={`px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 ${
            page === 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Prev
        </Link>

        {pages.map((p) => (
          <Link
            key={p}
            href={buildUrl(p)}
            className={`px-3 py-1.5 rounded-lg text-sm transition ${
              p === page
                ? "bg-purple-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {p}
          </Link>
        ))}

        <Link
          href={buildUrl(Math.min(page + 1, totalPages))}
          className={`px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 ${
            page === totalPages ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
