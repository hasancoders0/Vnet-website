"use client";

import AppImage from "@/components/ui/AppImage";
import Button from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

export default function SplitBlock({ block }) {
  const hasContent =
    block?.title ||
    block?.description ||
    block?.image;

  if (!hasContent) return null;

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      {/* CONTENT */}
      <div>
        {block.title && (
          <h3 id={block.id} className="text-2xl font-bold text-slate-900 mb-4 scroll-mt-32">
            {block.title}
          </h3>
        )}

        {block.description && (
          <div
            className="
              prose
              prose-slate
              max-w-none
              mb-6
            "
            dangerouslySetInnerHTML={{
              __html: block.description,
            }}
          />
        )}

        {block.buttonText && block.buttonLink && (
          <Button
            rightIcon={<FiArrowRight />}
            onClick={() =>
              window.open(block.buttonLink, "_blank")
            }
          >
            {block.buttonText}
          </Button>
        )}
      </div>

      {/* IMAGE */}
      {block.image && (
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200">
          <AppImage
            src={block.image}
            alt={block.title || "Split Image"}
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}