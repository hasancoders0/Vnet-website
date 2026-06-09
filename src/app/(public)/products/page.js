// src/app/(public)/products/page.jsx

import ProductsHero from "@/components/products/ProductsHero";
import ProductsCategories from "@/components/products/ProductsCategories";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFeatures from "@/components/products/ProductFeatures";

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductsCategories />
      <ProductGrid />
      <ProductFeatures />

    </>
  );
}