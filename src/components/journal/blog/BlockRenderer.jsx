"use client";

import TextBlock from "./blocks/TextBlock";
import ListBlock from "./blocks/ListBlock";
import QuoteBlock from "./blocks/QuoteBlock";
import SplitBlock from "./blocks/SplitBlock";
import GalleryBlock from "./blocks/GalleryBlock";
import DividerBlock from "./blocks/DividerBlock";

export default function BlockRenderer({ block }) {
  if (!block?.type) return null;

  switch (block.type) {
    case "text":
      return <TextBlock block={block} />;

    case "list":
      return <ListBlock block={block} />;

    case "quote":
      return <QuoteBlock block={block} />;

    case "split":
      return <SplitBlock block={block} />;

    case "gallery":
      return <GalleryBlock block={block} />;

    case "divider":
      return <DividerBlock block={block} />;

    default:
      console.warn(`Unsupported block type: ${block.type}`);

      return (
        <div
          className="
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-4
            text-sm
            text-red-600
          "
        >
          Unsupported Block: {block.type}
        </div>
      );
  }
}
