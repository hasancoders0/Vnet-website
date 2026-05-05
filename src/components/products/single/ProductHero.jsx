"use client";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

export default function ProductHero({ product }) {
  return (
    <section className="relative hero-gradient overflow-hidden pb-20">

      {/* ✨ Glow Effects */}
      <div className="hero-glow-purple -top-24 right-[-120px]" />
      <div className="hero-glow-blue top-[200px] left-[-120px]" />

      {/* CONTENT */}
      <div className="max-w-[1240px] mx-auto px-6 pt-28 pb-20">

        {/* 🔗 BREADCRUMB */}
        <p className="text-sm text-white/50 mb-6">
          Home <span className="mx-2">›</span>
          Digital Products <span className="mx-2">›</span>
          Dashboard Templates <span className="mx-2">›</span>

          <span className="text-white font-medium">
            {product.title}
          </span>
        </p>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT */}
          <div>
            <ProductGallery product={product} />
          </div>

          {/* RIGHT */}
          <div className="lg:sticky lg:top-28">
            <ProductInfo product={product} />
          </div>

        </div>

      </div>

    </section>
  );
}