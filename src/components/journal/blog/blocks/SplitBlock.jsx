"use client";

import AppImage from "@/components/ui/AppImage";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

export default function SplitBlock({ block }) {
  const hasContent = block?.title || block?.description || block?.image;

  if (!hasContent) return null;

  const ContentSection = (
    <div>
      {block.title && (
        <h3
          id={block.id}
          className="
            text-xl
            lg:text-[24px]
            font-bold
            text-slate-900
            leading-tight
            mb-5
            scroll-mt-28
          "
        >
          {block.title}
        </h3>
      )}

      {block.description && (
        <div
          className="
            prose
            prose-slate
            max-w-none
            mb-8
            text-slate-600
            leading-relaxed
          "
          dangerouslySetInnerHTML={{
            __html: block.description,
          }}
        />
      )}

      {block.buttonText && block.buttonLink && (
        <Button
          rightIcon={<FiArrowRight />}
          onClick={() => window.open(block.buttonLink, "_blank")}
        >
          {block.buttonText}
        </Button>
      )}
    </div>
  );

  const ImageSection = block.image && (
    <div
      className="
        group
        relative
        aspect-[4/3]
        overflow-hidden
        rounded-2xl
        border
        border-slate-200/70
        bg-slate-100
        shadow-sm
      "
    >
      <AppImage
        src={block.image}
        alt={block.title || "Split Image"}
        fill
        className="
          object-cover
          transition-transform
          duration-700
          group-hover:scale-105
        "
      />
    </div>
  );

  return (
    // scroll-mt-28 acts as a fallback safe-guard for TOC anchor links
    <section className="scroll-mt-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {block.layout === "right" ? (
          <>
            {ContentSection}
            {ImageSection}
          </>
        ) : (
          <>
            {ImageSection}
            {ContentSection}
          </>
        )}
      </div>
    </section>
  );
}