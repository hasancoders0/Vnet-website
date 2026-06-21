"use client";

export default function TextBlock({ block }) {
  if (!block?.content) return null;

  return (
    <div
      className="
        prose
        prose-slate
        max-w-none

        prose-p:text-slate-700
        prose-p:leading-8

        prose-a:text-blue-600
        prose-a:no-underline

        prose-strong:text-slate-900

        prose-ul:my-4
        prose-ol:my-4
      "
      dangerouslySetInnerHTML={{
        __html: block.content,
      }}
    />
  );
}