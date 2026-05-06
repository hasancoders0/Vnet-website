"use client";

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyText = "No data found",
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* HEADER */}
      <div className="grid px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-50"
        style={{
          gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
        }}
      >
        {columns.map((col, i) => (
          <div key={i} className={col.className || ""}>
            {col.label}
          </div>
        ))}
      </div>

      {/* BODY */}
      <div className="divide-y divide-gray-100">

        {/* LOADING */}
        {loading && (
          <div className="p-6 text-center text-sm text-gray-400">
            Loading...
          </div>
        )}

        {/* EMPTY */}
        {!loading && data.length === 0 && (
          <div className="p-6 text-center text-sm text-gray-400">
            {emptyText}
          </div>
        )}

        {/* ROWS */}
        {!loading &&
          data.map((row, rowIndex) => (
            <div
              key={row._id || rowIndex}
              className="grid px-6 py-4 items-center text-sm hover:bg-gray-50 transition"
              style={{
                gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
              }}
            >
              {columns.map((col, colIndex) => {
                const value = row[col.accessor];

                return (
                  <div key={colIndex} className={col.className || ""}>
                    {col.render
                      ? col.render(value, row)
                      : value}
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
}