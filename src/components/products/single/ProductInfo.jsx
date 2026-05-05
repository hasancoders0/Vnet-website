"use client";

import { useState } from "react";
import { FaStar, FaCheck, FaBolt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

export default function ProductInfo({ product, reviews = [], avgRating = 0 }) {
  const [qty, setQty] = useState(1);

  // 🔥 Calculate discount dynamically
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100,
        )
      : 0;

  return (
    <div className="text-white max-w-[480px]">
      {/* 🔥 BADGE */}
      {product.badge && (
        <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 text-xs rounded-full mb-4">
          🏆 {product.badge}
        </span>
      )}

      {/* TITLE */}
      <h1 className="text-[34px] md:text-[38px] font-bold leading-tight mb-3">
        {product.title}
      </h1>

      {/* DESCRIPTION */}
      <p className="text-white/70 text-sm leading-relaxed mb-5">
        {product.description}
      </p>

      {/* ⭐ RATING (FROM REVIEWS) */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex text-yellow-400 text-sm">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>

        <span className="text-white/60 text-sm">
          {avgRating.toFixed(1)} ({reviews.length} reviews)
        </span>
      </div>

      {/* 💰 PRICE */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-[36px] font-bold text-white">
          ${product.price}
        </span>

        {product.oldPrice && (
          <span className="text-white/40 line-through text-lg">
            ${product.oldPrice}
          </span>
        )}

        {discount > 0 && (
          <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* 🔢 QUANTITY */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-3 py-2 text-white/80 hover:bg-white/10"
          >
            -
          </button>

          <span className="px-4 text-white">{qty}</span>

          <button
            onClick={() => setQty(qty + 1)}
            className="px-3 py-2 text-white/80 hover:bg-white/10"
          >
            +
          </button>
        </div>

        <p className="text-sm text-white/60">
          Total:{" "}
          <span className="text-white font-medium">${product.price * qty}</span>
        </p>
      </div>

      {/* ⭐ FEATURES (FROM JSON) */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 text-sm text-white/80">
        {product.highlights.map((item, i) => (
          <p key={i} className="flex items-center gap-2">
            <FaCheck className="text-purple-400 text-xs" />
            {item}
          </p>
        ))}
      </div>

      {/* 🔘 BUTTONS */}
      <div className="space-y-3">
        {/* ADD TO CART */}
        <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 font-medium text-white flex items-center justify-center gap-2 hover:opacity-90 transition">
          <FiShoppingCart />
          Add {qty} to Cart
        </button>

        {/* BUY NOW */}
        <button className="w-full py-3 rounded-lg border border-white/20 text-white flex items-center justify-center gap-2 hover:bg-white/10 transition">
          <FaBolt className="text-yellow-400" />
          Buy Now
        </button>
      </div>
    </div>
  );
}
