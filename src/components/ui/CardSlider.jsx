"use client";

import { useId, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CardSlider({
  items = [],
  renderItem,
  desktop = 3,
  tablet = 2,
  mobile = 1,
  gap = 24,
  autoplay = false,
  loop = false,
  navigation = true,
  pagination = true,
  centered = false,
  grabCursor = true,
  className = "",
}) {
  const id = useId();
  const safeId = id.replace(/:/g, "");

  const prevButton = useMemo(() => `.slider-prev-${safeId}`, [safeId]);
  const nextButton = useMemo(() => `.slider-next-${safeId}`, [safeId]);
  const paginationEl = useMemo(() => `.slider-pagination-${safeId}`, [safeId]);

  const breakpoints = {
    0: { slidesPerView: mobile, spaceBetween: gap },
    768: { slidesPerView: tablet, spaceBetween: gap },
    1024: { slidesPerView: desktop, spaceBetween: gap },
  };

  if (!items.length) return null;

  return (
    <>
      {/* Scoped pagination styles */}
      <style>{`
        .slider-pagination-${safeId} .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .slider-pagination-${safeId} .swiper-pagination-bullet-active {
          width: 26px;
          border-radius: 4px;
          background: #3b82f6;
        }
        .slider-pagination-${safeId} .swiper-pagination-bullet:hover:not(.swiper-pagination-bullet-active) {
          background: #94a3b8;
          transform: scale(1.2);
        }
        .slider-pagination-${safeId}.swiper-pagination-dynamic .swiper-pagination-bullet {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
        }
      `}</style>

      <div className={`group/slider relative w-full ${className}`}>
        {/* Navigation Buttons */}
        {navigation && (
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-1">
            {/* Prev */}
            <button
              type="button"
              aria-label="Previous slide"
              className={`
                slider-prev-${safeId} pointer-events-auto
                flex h-11 w-11 items-center justify-center rounded-full
                border border-white/60
                bg-white/80 backdrop-blur-sm
                shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                text-slate-500
                transition-all duration-300 ease-out
                opacity-0 -translate-x-3
                max-lg:opacity-100 max-lg:translate-x-0
                group-hover/slider:opacity-100 group-hover/slider:translate-x-0
                hover:scale-110
                hover:shadow-[0_8px_25px_rgba(0,0,0,0.14)]
                hover:text-slate-800
                hover:border-white
                hover:bg-white
                active:scale-95
              `}
            >
              <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </button>

            {/* Next */}
            <button
              type="button"
              aria-label="Next slide"
              className={`
                slider-next-${safeId} pointer-events-auto
                flex h-11 w-11 items-center justify-center rounded-full
                border border-white/60
                bg-white/80 backdrop-blur-sm
                shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                text-slate-500
                transition-all duration-300 ease-out
                opacity-0 translate-x-3
                max-lg:opacity-100 max-lg:translate-x-0
                group-hover/slider:opacity-100 group-hover/slider:translate-x-0
                hover:scale-110
                hover:shadow-[0_8px_25px_rgba(0,0,0,0.14)]
                hover:text-slate-800
                hover:border-white
                hover:bg-white
                active:scale-95
              `}
            >
              <ChevronRight className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </button>
          </div>
        )}

        <Swiper
          modules={[Navigation, Pagination, Autoplay, Keyboard]}
          breakpoints={breakpoints}
          grabCursor={grabCursor}
          centeredSlides={centered}
          keyboard={{ enabled: true }}
          loop={loop}
          watchOverflow
          speed={600}
          spaceBetween={gap}
          navigation={
            navigation ? { prevEl: prevButton, nextEl: nextButton } : false
          }
          pagination={
            pagination
              ? {
                  el: paginationEl,
                  clickable: true,
                  dynamicBullets: true,
                }
              : false
          }
          autoplay={
            autoplay
              ? {
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
        >
          {items.map((item, index) => (
            <SwiperSlide
              key={item?._id || item?.id || index}
              className="!h-auto"
            >
              {renderItem(item, index)}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination Container (Rendered outside Swiper for better layout control) */}
        {pagination && (
          <div className={`slider-pagination-${safeId} mt-6 flex justify-center`} />
        )}
      </div>
    </>
  );
}