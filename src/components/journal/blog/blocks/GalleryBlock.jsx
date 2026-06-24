"use client";

import AppImage from "@/components/ui/AppImage";

export default function GalleryBlock({ block }) {
  const images = block?.images || [];

  if (!images.length) return null;

  return (
    <section className="my-10">
      {/* HEADER */}
      {block.title && (
        <div className="mb-6">
          <h3
            className="
              text-2xl
              lg:text-3xl
              font-bold
              text-slate-900
            "
          >
            {block.title}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {images.length} image
            {images.length > 1 ? "s" : ""}
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
                rounded-3xl
                border
                border-slate-200
                bg-slate-50
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
                  duration-500
                  group-hover:scale-105
                "
              />

              {/* IMAGE NUMBER */}
              <div
                className="
                  absolute
                  top-3
                  left-3
                  z-10
                  rounded-full
                  bg-black/60
                  px-2.5
                  py-1
                  text-xs
                  font-medium
                  text-white
                  backdrop-blur
                "
              >
                {index + 1}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
