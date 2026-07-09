"use client";

import Link from "@/components/ui/AppLink";
import AppImage from "@/components/ui/AppImage";
import { FiArrowRight } from "react-icons/fi";

export default function RelatedServices({ services = [] }) {
  if (!services.length) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1240px] mx-auto px-5 md:px-6">
        {/* HEADER */}
        <div className="text-center mb-12 md:mb-14">
          <span className="text-[11px] px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-medium uppercase tracking-wider mb-4 inline-block">
            Related Services
          </span>

          <h2 className="text-[30px] md:text-[38px] font-bold text-slate-900 tracking-tight mb-3">
            Explore More Services
          </h2>

          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Discover other professional services that can help grow your
            business and improve your online presence.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative block"
            >
              {/* Gradient border on hover */}
              <div
                className="
                  absolute -inset-[1px]
                  rounded-2xl
                  bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-500
                "
              />

              {/* Card */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border border-slate-200/70
                  bg-white
                  transition-all
                  duration-500
                  hover:-translate-y-1.5
                  group-hover:bg-slate-50
                  h-full
                  flex
                  flex-col
                "
              >
                {/* IMAGE */}
                <div className="relative h-[210px] overflow-hidden bg-slate-100">
                  <AppImage
                    src={
                      service.featuredImage ||
                      "/website-components/services-right-img.png"
                    }
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* TITLE */}
                  <h3 className="text-[15px] font-semibold text-gray-800 leading-snug mb-1.5">
                    {service.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-[13px] text-gray-500 leading-[1.65] line-clamp-3 flex-grow group-hover:text-gray-600 transition-colors">
                    {service.shortDescription}
                  </p>

                  {/* FOOTER */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                      Service
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
                      View Details
                      <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}