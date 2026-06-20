"use client";

import AppImage from "@/components/ui/AppImage";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

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
];

export default function ServicePortfolio() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1240px] mx-auto px-5 md:px-6">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">
              PORTFOLIO
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Recent Projects We've Delivered
            </h2>

            <p className="text-slate-500 max-w-2xl leading-7">
              Explore some of our recent work crafted with performance,
              usability and modern design principles.
            </p>
          </div>

          <Button
            variant="outline"
            rightIcon={<FiArrowRight />}
            className="w-full lg:w-auto"
          >
            View All Projects
          </Button>
        </div>

        {/* PROJECTS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {portfolio.map((item, index) => (
            <article
              key={index}
              className="
                group
                bg-white
                rounded-3xl
                border border-slate-200
                overflow-hidden
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              {/* IMAGE */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <AppImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur text-slate-700 text-xs font-medium">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-5 right-5 text-white/80 text-sm font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500 leading-6 mb-6">
                  Modern, scalable and performance-focused solution built to
                  achieve business goals.
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Case Study</span>

                  <div
                    className="
                      w-10 h-10
                      rounded-full
                      bg-slate-100
                      flex items-center justify-center
                      text-slate-700
                      transition-all
                      duration-300
                      group-hover:bg-blue-600
                      group-hover:text-white
                    "
                  >
                    <FiArrowRight />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
