"use client";

import AppImage from "@/components/ui/AppImage";
import Link from "@/components/ui/AppLink";

const relatedProducts = [
  {
    slug: "adminpro-dashboard",
    title: "AdminPro Dashboard",
    price: 39,
    image: "/website-components/default-image.png",
  },
  {
    slug: "saas-ui-kit",
    title: "SaaS UI Kit",
    price: 29,
    image: "/website-components/default-image.png",
  },
  {
    slug: "landing-template",
    title: "Landing Page Template",
    price: 19,
    image: "/website-components/default-image.png",
  },
  {
    slug: "mobile-ui-kit",
    title: "Mobile UI Kit",
    price: 24,
    image: "/website-components/default-image.png",
  },
];

export default function RelatedProducts() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-[1240px] mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[22px] font-semibold text-gray-900">
            Related Products
          </h2>

          <Link
            href="/products"
            className="text-sm text-purple-600 hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

          {relatedProducts.map((item, i) => (
            <Link
              key={i}
              href={`/products/${item.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden"
            >

              {/* IMAGE */}
              <div className="relative w-full h-[180px] overflow-hidden">
                <AppImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  {item.title}
                </h3>

                <p className="text-sm text-purple-600 font-semibold mt-2">
                  ${item.price}
                </p>
              </div>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}