import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

const tagStyles = {
  NEW: "bg-emerald-500",
  "TOP SELLER": "bg-orange-500",
  POPULAR: "bg-purple-500",
  "-20%": "bg-pink-500",
};

export default function ProductCard({ product, compact = false }) {
  const imageSrc =
    product?.img && product.img.trim()
      ? product.img
      : "/website-components/default-image.png";

  return (
    <div className="group relative block">
      {/* Gradient border on hover */}
      <div
        className={`
          absolute -inset-[1px]
          rounded-2xl
          bg-gradient-to-br
          ${product.gradient || "from-blue-500 via-indigo-500 to-purple-500"}
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
        `}
      />

      {/* Card */}
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border border-slate-200/70
          bg-white
          transition-all
          duration-500
          hover:-translate-y-1.5
          group-hover:bg-slate-50
        "
      >
        {/* IMAGE */}
        <div className="relative h-[210px] overflow-hidden">
          <Image
            src={imageSrc}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* TAG */}
          {product.tag && (
            <span
              className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-md text-white font-medium 
                ${tagStyles[product.tag] || "bg-gray-500"}`}
            >
              {product.tag}
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-4">
          {/* TITLE */}
          <h3 className="text-[15px] font-semibold text-gray-800 leading-snug line-clamp-2">
            {product.title}
          </h3>

          {/* CATEGORY + RATING */}
          <div className="flex items-center justify-between mt-2.5 text-xs">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
              {product.category || "UI Kits"}
            </span>

            <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700">
              <FaStar className="text-[10px]" />
              {product.rating}
            </span>
          </div>

          {/* PRICE + VIEW DETAILS */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <div>
              {product.oldPrice && (
                <span className="text-xs text-gray-400 line-through mr-2">
                  {product.oldPrice}
                </span>
              )}

              <span className="text-xl font-bold tracking-tight text-slate-900">
                {product.price}
              </span>
            </div>

            <button
              className="
                inline-flex
                items-center
                gap-2
                text-[12px]
                font-semibold
                text-blue-600
                opacity-60
                translate-y-2
                group-hover:opacity-100
                group-hover:translate-y-0
                transition-all
                duration-500
              "
            >
              View Details
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}