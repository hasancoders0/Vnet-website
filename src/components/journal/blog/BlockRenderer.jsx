"use client";

import TextBlock from "./blocks/TextBlock";
import ListBlock from "./blocks/ListBlock";
import ImageBlock from "./blocks/ImageBlock";
import QuoteBlock from "./blocks/QuoteBlock";
import SplitBlock from "./blocks/SplitBlock";
import GalleryBlock from "./blocks/GalleryBlock";
import DividerBlock from "./blocks/DividerBlock";

export default function BlockRenderer({ block }) {
  switch (block.type) {
    case "text":
      return <TextBlock block={block} />;
    case "list":
      return <ListBlock block={block} />;
    case "image":
      return <ImageBlock block={block} />;
    case "quote":
      return <QuoteBlock block={block} />;
    case "split":
      return <SplitBlock block={block} />;
    case "gallery":
      return <GalleryBlock block={block} />;
    case "divider":
      return <DividerBlock />;

    default:
      return (
        <div className="text-sm text-red-500">
          Unsupported Block: {block.type}
        </div>
      );
  }
}
