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
    <section className="space-y-8">
      {/* SECTION TITLE */}
      {section.title && (
        <div>
          <h2
            id={sectionId}
            className="
              text-2xl
              md:text-3xl
              font-bold
              tracking-tight
              text-slate-900
            "
          >
            {section.title}
          </h2>
        </div>
      )}

      {/* BLOCKS */}
      <div className="space-y-10">
        {(section.blocks || []).map((block, index) => (
          <BlockRenderer key={block.id || index} block={block} />
        ))}
      </div>
    </section>
  );
}
