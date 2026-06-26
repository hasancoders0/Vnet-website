"use client";

import AppImage from "@/components/ui/AppImage";

export default function GalleryBlock({ block }) {
  const images = block?.images || [];

  if (!images.length) return null;

  return (
    <div>
      {/* HEADER */}
      {block.title && (
        <div className="mb-6">
          <h3 className="text-xl lg:text-[24px] font-bold text-slate-900 leading-tight">
            {block.title}
          </h3>
          <p className="mt-1.5 text-[13px] text-slate-400 font-medium">
            {images.length} image{images.length > 1 ? "s" : ""}
          </p>
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {images.map((image, index) => {
          const imageUrl = typeof image === "string" ? image : image?.url || "";

          return (
            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200/70
                bg-slate-100
                aspect-[4/3]
              "
            >
              <AppImage
                src={imageUrl}
                alt={`Gallery Image ${index + 1}`}
                fill
                className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />

              {/* IMAGE NUMBER PILL */}
              <span
                className="
                  absolute
                  top-3
                  left-3
                  z-10
                  rounded-full
                  bg-white/80
                  backdrop-blur-sm
                  border
                  border-white/50
                  px-2.5
                  py-1
                  text-[11px]
                  font-semibold
                  text-slate-700
                "
              >
                {index + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}