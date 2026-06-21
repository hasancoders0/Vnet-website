"use client";

import BlockRenderer from "./BlockRenderer";

const backgroundClasses = {
  white: "bg-white",
  soft: "bg-slate-50",
  dark: "bg-slate-900 text-white",
  brand: "bg-blue-50",
  accent: "bg-purple-50",
};

export default function SectionRenderer({ section }) {
  const bgClass = backgroundClasses[section.background] || "bg-white";

  return (
    <section
      className={`rounded-2xl p-8 md:p-10 border border-slate-100 ${bgClass}`}
    >
      {section.title && (
        <h2
          id={
            section.id ||
            section.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)+/g, "")
          }
          className="text-3xl font-bold scroll-mt-32"
        >
          {section.title}
        </h2>
      )}

      <div className="space-y-8">
        {(section.blocks || []).map((block, index) => (
          <BlockRenderer key={block.id || index} block={block} />
        ))}
      </div>
    </section>
  );
}
