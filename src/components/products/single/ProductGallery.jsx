"use client";

import { useState } from "react";
import AppImage from "@/components/ui/AppImage";

export default function ProductGallery({ product }) {
  const [active, setActive] = useState(product.images[0]);

  return (
    <div className="w-full">

      {/* 🔥 MAIN IMAGE */}
      <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.25)] bg-white">

        <AppImage
          src={active}
          alt="product"
          fill
          className="object-cover transition duration-500 hover:scale-105"
        />

      </div>

      {/* 🔽 THUMBNAILS */}
      <div className="flex gap-3 mt-5">

        {product.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(img)}
            className={`relative w-[90px] h-[70px] rounded-lg overflow-hidden border transition ${
              active === img
                ? "border-purple-500 ring-2 ring-purple-500/30"
                : "border-gray-200 hover:border-purple-300"
            }`}
          >
            <AppImage
              src={img}
              alt="thumb"
              fill
              className="object-cover"
            />
          </button>
        ))}

      </div>

    </div>
  );
}