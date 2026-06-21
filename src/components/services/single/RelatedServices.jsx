"use client";

import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

export default function RelatedServices({ services = [] }) {
  if (!services.length) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">
            RELATED SERVICES
          </span>

          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Explore More Services
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto">
            Discover other professional services that can help grow your
            business and improve your online presence.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.slug}
              className="
                group
                bg-white
                rounded-3xl
                border border-slate-200
                overflow-hidden
                transition-all
                duration-300
                hover:shadow-xl
                hover:-translate-y-1
              "
            >
              {/* IMAGE */}
              <div className="relative h-[220px] overflow-hidden bg-slate-100">
                <AppImage
                  src={
                    service.featuredImage ||
                    "/website-components/services-right-img.png"
                  }
                  alt={service.title}
                  fill
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-500 text-sm leading-6 mb-6 line-clamp-3">
                  {service.shortDescription}
                </p>

                <Link href={`/services/${service.slug}`}>
                  <Button
                    variant="outline"
                    rightIcon={<FiArrowRight />}
                    className="w-full"
                  >
                    View Service
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}