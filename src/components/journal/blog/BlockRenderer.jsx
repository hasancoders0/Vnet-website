"use client";

import TextBlock from "./blocks/TextBlock";
import ListBlock from "./blocks/ListBlock";
import QuoteBlock from "./blocks/QuoteBlock";
import SplitBlock from "./blocks/SplitBlock";
import GalleryBlock from "./blocks/GalleryBlock";
import DividerBlock from "./blocks/DividerBlock";

// Clean component map instead of a long switch statement
const BLOCK_COMPONENTS = {
  text: TextBlock,
  list: ListBlock,
  quote: QuoteBlock,
  split: SplitBlock,
  gallery: GalleryBlock,
  divider: DividerBlock,
};

export default function BlockRenderer({ block }) {
  if (!block?.type) return null;

  const Component = BLOCK_COMPONENTS[block.type];

  // Render the mapped component
  if (Component) {
    return (
      // scroll-mt-28 ensures that if a block has an ID (like a SplitBlock sub-heading 
      // linked in the Table of Contents), it doesn't get hidden under your sticky navbar when scrolled to.
      <div className="scroll-mt-28">
        <Component block={block} />
      </div>
    );
  }

  // Graceful fallback for unsupported block types
  console.warn(`Unsupported block type: ${block.type}`);

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500">
      Unsupported Block:{" "}
      <span className="font-mono font-medium text-slate-700">
        {block.type}
      </span>
    </div>
  );
}