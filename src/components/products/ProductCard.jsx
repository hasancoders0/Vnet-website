import Image from "next/image";
import { FaShoppingCart, FaStar } from "react-icons/fa";

const tagStyles = {
  NEW: "bg-emerald-500",
  "TOP SELLER": "bg-orange-500",
  POPULAR: "bg-purple-500",
  "-20%": "bg-pink-500",
};

export default function ProductCard({ product }) {
  const imageSrc =
    product?.img && product.img.trim()
      ? product.img
      : "/website-components/default-image.png";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden 
      shadow-sm hover:shadow-xl transition-all duration-300">

      {/* IMAGE */}
      <div className="relative h-[180px] overflow-hidden rounded-t-2xl">

        <Image
          src={imageSrc}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
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
        <div className="flex items-center justify-between mt-1 text-xs text-gray-500">

          <span>{product.category || "UI Kits"}</span>

          <span className="flex items-center gap-1 text-gray-600">
            <FaStar className="text-yellow-400 text-[10px]" />
            {product.rating || "4.9"}
          </span>

        </div>

        {/* PRICE + CART */}
        <div className="flex items-center justify-between mt-4">

          <div>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through mr-2">
                {product.oldPrice}
              </span>
            )}

            <span className="font-semibold text-gray-900">
              {product.price}
            </span>
          </div>

          <button
            className="w-9 h-9 rounded-lg border border-gray-200 
            flex items-center justify-center text-gray-600 
            hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <FaShoppingCart size={13} />
          </button>

        </div>

      </div>
    </div>
  );
}