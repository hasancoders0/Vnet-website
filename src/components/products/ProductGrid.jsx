"use client";

import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

const products = [
  {
    title: "SaaS Landing Page UI Kit",
    price: "$29",
    img: "",
    tag: "NEW",
    category: "UI Kits",
    rating: "4.9",
  },
  {
    title: "IT Solutions WordPress Theme",
    price: "$49",
    img: "",
    tag: "TOP SELLER",
    category: "WordPress Themes",
    rating: "4.8",
  },
  {
    title: "Ecomify – Shopify Theme",
    price: "$59",
    img: "",
    tag: "NEW",
    category: "Shopify Themes",
    rating: "4.9",
  },
  {
    title: "AdminPro Dashboard Template",
    price: "$39",
    oldPrice: "$49",
    img: "",
    tag: "-20%",
    category: "Dashboard Templates",
    rating: "4.7",
  },
];

export default function ProductGrid() {
  return (
    <section className="py-16 md:py-24 px-6 bg-[#f8fafc]">
      <div className="max-w-[1280px] mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="text-[11px] px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium uppercase tracking-wider mb-4 inline-block">
            Explore Collection
          </span>

          <h2 className="text-[30px] md:text-[38px] font-bold text-slate-900 tracking-tight mb-3">
            Our Digital Products
          </h2>

          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Premium themes, UI kits, and resources to speed up your workflow.
          </p>
        </div>

        {/* FILTERS */}
        <ProductFilters />

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {products.map((p, i) => (
            <ProductCard key={i} product={p} />
          ))}
        </div>

      </div>
    </section>
  );
}