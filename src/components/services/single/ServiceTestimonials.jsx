"use client";

import { useId } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "James Anderson",
    role: "CEO, TechNova",
    rating: 5,
    message:
      "Visionary Network delivered an exceptional website that exceeded our expectations. The performance, design, and overall experience were outstanding.",
  },
  {
    name: "Sarah Mitchell",
    role: "Founder, GrowthLabs",
    rating: 5,
    message:
      "The team transformed our vision into a professional platform. Communication was excellent and the final result was beyond expectations.",
  },
  {
    name: "Michael Brown",
    role: "Marketing Director",
    rating: 5,
    message:
      "Fast delivery, modern design and excellent support. We continue to work with Visionary Network for all our web projects.",
  },
];

const stats = [
  { value: "150+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support" },
  { value: "5+", label: "Years Experience" },
];

export default function ServiceTestimonials() {
  const id = useId();
  const safeId = id.replace(/:/g, "");

  const prevEl = `.test-prev-${safeId}`;
  const nextEl = `.test-next-${safeId}`;
  const paginationEl = `.test-pagination-${safeId}`;

  return (
    <>
      {/* Scoped Pagination Styles */}
      <style>{`
        .test-pagination-${safeId} .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .test-pagination-${safeId} .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 4px;
          background: #3b82f6;
        }
        .test-pagination-${safeId} .swiper-pagination-bullet:hover:not(.swiper-pagination-bullet-active) {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>

      <section className="relative overflow-hidden py-16 md:py-24 bg-[#020617]">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[140px]" />

        <div className="relative max-w-[1240px] mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* ================= LEFT ================= */}
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.1] backdrop-blur-sm text-white/80 uppercase tracking-wider font-medium mb-6">
                TESTIMONIAL
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
                What Our Clients Say
              </h2>

              <FaQuoteLeft className="text-blue-400 text-2xl md:text-3xl opacity-70 mb-6" />

              {/* SWIPER CONTAINER */}
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={24}
                  slidesPerView={1}
                  loop={true}
                  speed={600}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    prevEl: prevEl,
                    nextEl: nextEl,
                  }}
                  pagination={{
                    el: paginationEl,
                    clickable: true,
                  }}
                >
                  {testimonials.map((item, index) => (
                    <SwiperSlide key={index}>
                      {/* Rating */}
                      <div className="flex gap-1 mb-5">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-sm" />
                        ))}
                      </div>

                      {/* Message */}
                      <div className="min-h-[140px] md:min-h-[180px]">
                        <p className="text-white/75 text-lg md:text-2xl leading-8 md:leading-10">
                          &ldquo;{item.message}&rdquo;
                        </p>
                      </div>

                      {/* Author */}
                      <div className="mt-6">
                        <h4 className="text-white text-lg md:text-xl font-semibold">
                          {item.name}
                        </h4>
                        <p className="text-white/50 text-sm md:text-base mt-0.5">
                          {item.role}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* NAVIGATION & PAGINATION */}
              <div className="flex items-center gap-3 mt-8">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  className={`test-prev-${safeId} w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition-all duration-200 active:scale-95`}
                >
                  <FiChevronLeft className="text-lg" />
                </button>

                <button
                  type="button"
                  aria-label="Next testimonial"
                  className={`test-next-${safeId} w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition-all duration-200 active:scale-95`}
                >
                  <FiChevronRight className="text-lg" />
                </button>

                <div className={`test-pagination-${safeId} flex items-center gap-2 ml-2 md:ml-4`} />
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {stats.map((item, i) => (
                <div
                  key={i}
                  className="
                    rounded-2xl
                    border border-white/[0.1]
                    bg-white/[0.05]
                    backdrop-blur-sm
                    p-6 md:p-8
                    transition-all duration-300
                    hover:bg-white/[0.1]
                    hover:-translate-y-1
                  "
                >
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-3 tracking-tight">
                    {item.value}
                  </h3>
                  <p className="text-sm md:text-base text-white/50">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}