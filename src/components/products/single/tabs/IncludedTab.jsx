import { FaCheckCircle } from "react-icons/fa";

export default function IncludedTab({ product }) {
  if (!product?.included?.length) return null;

  return (
    <div className="space-y-8">

      {/* 🔥 TITLE */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          What’s Included
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Everything you need to get started with this product
        </p>
      </div>

      {/* 🔥 GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {product.included.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition"
          >

            {/* ICON */}
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              <FaCheckCircle size={14} />
            </div>

            {/* TEXT */}
            <div>
              <p className="text-sm font-medium text-gray-900">
                {item}
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}