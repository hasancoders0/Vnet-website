"use client";

import AppImage from "@/components/ui/AppImage";
import Button from "@/components/ui/Button";

const portfolio = [
  {
    title: "E-Commerce Store",
    category: "Shopify Development",
    image: "/website-components/products-top.png",
  },
  {
    title: "SaaS Dashboard",
    category: "Web Application",
    image: "/website-components/tools-top.png",
  },
  {
    title: "Corporate Website",
    category: "Business Website",
    image: "/website-components/top-bg.png",
  },
  {
    title: "Landing Page",
    category: "Marketing Website",
    image: "/website-components/contact-top.png",
  },
];

export default function ServicePortfolio() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Our Recent Works
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              A glimpse of projects we’ve delivered successfully
            </p>
          </div>

          <Button variant="outline">
            View All Projects
          </Button>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {portfolio.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >

              {/* IMAGE */}
              <div className="relative h-[180px] w-full overflow-hidden">
                <AppImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500">
                  {item.category}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}