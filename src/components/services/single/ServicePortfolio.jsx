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
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium uppercase tracking-wider mb-4 inline-block">
              Portfolio
            </span>

            <h2 className="text-[30px] md:text-[38px] font-bold text-slate-900 tracking-tight mb-3">
              Recent Projects We've Delivered
            </h2>

            <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
              Explore some of our recent work crafted with performance,
              usability, and modern design principles.
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

        {/* PROJECTS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((item, index) => (
            <article
              key={index}
              className="
                group
                relative
                bg-white
                rounded-2xl
                border border-slate-200/70
                overflow-hidden
                transition-all
                duration-500
                hover:-translate-y-1.5
                hover:shadow-[0_25px_60px_rgba(59,130,246,0.18)]
                flex flex-col
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

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-white/50 text-slate-700 text-[11px] font-medium">
                    {item.category}
                  </span>
                </div>

                {/* Image Number */}
                <span className="absolute top-4 right-4 text-[11px] font-mono text-white/60 font-semibold tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-[15px] font-semibold text-gray-800 leading-snug mb-1.5">
                  {item.title}
                </h3>

                <p className="text-[13px] text-gray-500 leading-[1.65] flex-grow group-hover:text-gray-600 transition-colors">
                  Modern, scalable, and performance-focused solution built to
                  achieve specific business goals.
                </p>

                {/* FOOTER */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                    Case Study
                  </span>

                  {/* Sliding CTA */}
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-[12px]
                      font-semibold
                      text-blue-600
                      opacity-0
                      translate-y-2
                      group-hover:opacity-100
                      group-hover:translate-y-0
                      transition-all
                      duration-500
                    "
                  >
                    View Project
                    <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
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