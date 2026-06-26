// src/app/(public)/products/page.jsx

import ProductsHero from "@/components/products/ProductsHero";
import ProductsCategories from "@/components/products/ProductsCategories";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFeatures from "@/components/products/ProductFeatures";
import { generatePageMetadata } from "@/lib/seo/generatePageMetadata";
export const metadata = generatePageMetadata(
  "products",
  "/products",
);
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