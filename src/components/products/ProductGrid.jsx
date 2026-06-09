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
    title: "TechNova – IT Solutions WordPress Theme",
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
    <section className="py-16 px-4">
      <div className="max-w-[1200px] mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <span className="text-xs px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full">
            Explore Collection
          </span>

          <h2 className="text-3xl font-semibold mt-4">
            Our Digital Products
          </h2>
        </div>

        <ProductFilters />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <ProductCard key={i} product={p} />
          ))}
        </div>

      </div>
    </section>
  );
}