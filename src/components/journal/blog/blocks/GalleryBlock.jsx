"use client";

import AppImage from "@/components/ui/AppImage";

export default function GalleryBlock({ block }) {
  if (!block?.images?.length) return null;

  return (
    <div className="space-y-4">
      {block.title && (
        <h3 className="text-2xl font-bold text-slate-900">
          {block.title}
        </h3>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {block.images.map((image, index) => (
          <div
            key={index}
            className="
              relative
              aspect-square
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
            "
          >
            <AppImage
              src={typeof image === "string" ? image : image.url}
              alt={`Gallery Image ${index + 1}`}
              fill
              className="
                object-cover
                transition-transform
                duration-500
                hover:scale-105
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}