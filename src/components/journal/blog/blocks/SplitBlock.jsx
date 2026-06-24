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
            text-1xl
            lg:text-2xl
            font-bold
            text-slate-900
            mb-5
            scroll-mt-32
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
            lg:prose-lg
            max-w-none
            mb-8
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
          relative
          aspect-[4/3]
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
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
            duration-500
            hover:scale-105
          "
      />
    </div>
  );

  return (
    <section className="py-4">
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
