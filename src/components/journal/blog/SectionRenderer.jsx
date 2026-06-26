"use client";

import BlockRenderer from "./BlockRenderer";

export default function SectionRenderer({ section }) {
  if (!section) return null;

  const sectionId =
    section.id ||
    section.title
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  return (
    <section className="scroll-mt-28">
      {/* SECTION TITLE */}
      {section.title && (
        <div className="mb-8 pb-5 border-b border-slate-100">
          <h2
            id={sectionId}
            className="text-[26px] md:text-[32px] font-bold tracking-tight text-slate-900"
          >
            {section.title}
          </h2>
        </div>
      )}

      {/* BLOCKS */}
      <div className="space-y-8">
        {(section.blocks || []).map((block, index) => (
          <BlockRenderer key={block.id || index} block={block} />
        ))}
      </div>
    </section>
  );
}