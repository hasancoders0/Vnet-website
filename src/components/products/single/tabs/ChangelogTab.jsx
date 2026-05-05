export default function ChangelogTab({ product }) {
  if (!product?.changelog?.length) {
    return (
      <p className="text-sm text-gray-500">
        No changelog available yet.
      </p>
    );
  }

  return (
    <div className="space-y-8">

      {product.changelog.map((item, i) => (
        <div key={i} className="relative pl-6">

          {/* 🔵 TIMELINE DOT */}
          <span className="absolute left-0 top-2 w-3 h-3 bg-purple-500 rounded-full" />

          {/* 🔹 CONTENT */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-3">

              <span className="text-sm font-semibold text-purple-600">
                v{item.version}
              </span>

              <span className="text-xs text-gray-400">
                {item.date}
              </span>

            </div>

            {/* CHANGES */}
            <ul className="space-y-2">
              {item.changes.map((change, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-600 flex gap-2"
                >
                  <span className="text-purple-500 mt-[2px]">•</span>
                  {change}
                </li>
              ))}
            </ul>

          </div>

        </div>
      ))}

    </div>
  );
}