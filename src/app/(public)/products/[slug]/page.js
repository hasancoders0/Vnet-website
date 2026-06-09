import ProductHero from "@/components/products/single/ProductHero";
import ProductTabs from "@/components/products/single/ProductTabs";
import ProductFeatures from "@/components/products/single/ProductFeatures";
import ProductTestimonials from "@/components/products/single/ProductTestimonials";
import RelatedProducts from "@/components/products/single/RelatedProducts";

import { products } from "@/data/products";
import { reviews } from "@/data/reviews";

import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {

  // ✅ MUST await params in your Next.js version
  const { slug } = await params;

  console.log("Slug:", slug);

  const product = products.find((item) => item.slug === slug);

  if (!product) return notFound();

  const productReviews = reviews.filter(
    (item) => item.productId === product.id
  );

  const relatedProducts = products.filter(
    (item) => item.id !== product.id
  );

  return (
    <div>

      <ProductHero product={product} />

      <ProductTabs product={product} reviews={productReviews} />

      <ProductFeatures product={product} />

      <ProductTestimonials reviews={productReviews} />

      <RelatedProducts products={relatedProducts} />

    </div>
  );
}