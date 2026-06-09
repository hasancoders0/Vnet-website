"use client";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 text-sm">

      {/* INFO */}
      <p className="text-gray-400">
        Page {page} of {totalPages}
      </p>

      {/* BUTTONS */}
      <div className="flex items-center gap-2">

        {/* PREV */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>

        {/* NUMBERS */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1.5 rounded-lg text-sm transition
              ${
                p === page
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {p}
          </button>
        ))}

        {/* NEXT */}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>

      </div>
    </div>
  );
}