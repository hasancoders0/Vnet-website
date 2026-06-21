"use client";

import AppImage from "@/components/ui/AppImage";

export default function ImageBlock({ block }) {
  if (!block?.image) return null;

  return (
    <figure className="space-y-3">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200">
        <AppImage
          src={block.image}
          alt={block.alt || block.title || "Blog Image"}
          fill
          className="object-cover"
        />
      </div>

      {(block.caption || block.title) && (
        <figcaption className="text-sm text-center text-slate-500">
          {block.caption || block.title}
        </figcaption>
      )}
    </figure>
  );
}