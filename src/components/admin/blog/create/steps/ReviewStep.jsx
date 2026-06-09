"use client";

import Image from "next/image";

export default function ReviewStep({ data }) {
  const seo = data.seo || {};

  const safe = (val) => val || "-";

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Review Your Blog
        </h3>
        <p className="text-sm text-gray-500">
          Check everything before publishing
        </p>
      </div>

      {/* ================= BASIC INFO ================= */}
      <Section title="Basic Info">
        <Row label="Title" value={safe(data.title)} />
        <Row label="Slug" value={safe(seo.slug)} />
        <Row label="Category" value={safe(data.category)} />
        <Row label="Subtitle" value={safe(data.subtitle)} />
      </Section>

      {/* ================= FEATURED IMAGE ================= */}
      {data.featuredImage && (
        <Section title="Featured Image">
          <div className="relative w-full h-[220px] rounded-lg overflow-hidden border">
            <Image
              src={data.featuredImage}
              alt="featured"
              fill
              className="object-cover"
            />
          </div>
        </Section>
      )}

      {/* ================= CONTENT ================= */}
      <Section title="Blog Content">

        {data.content?.length === 0 ? (
          <p className="text-sm text-gray-400">
            No content added
          </p>
        ) : (
          <div className="space-y-6">

            {data.content.map((section, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-4 bg-gray-50"
              >
                {/* SECTION HEADER */}
                <div className="flex justify-between mb-2">
                  <h5 className="font-semibold text-gray-800">
                    Section {i + 1}
                  </h5>

                  <span className="text-xs px-2 py-1 rounded bg-white border text-gray-500 capitalize">
                    {section.palette || "white"}
                  </span>
                </div>

                {/* SECTION TITLE */}
                {section.title && (
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    {section.title}
                  </p>
                )}

                {/* BLOCKS */}
                <div className="space-y-4">
                  {section.blocks?.map((block, j) => (
                    <BlockPreview key={j} block={block} />
                  ))}
                </div>
              </div>
            ))}

          </div>
        )}
      </Section>

      {/* ================= SEO ================= */}
      <Section title="SEO">
        <Row label="Slug" value={safe(seo.slug)} />
        <Row label="Meta Title" value={safe(seo.metaTitle)} />
        <Row label="Meta Description" value={safe(seo.metaDescription)} />
        <Row label="Focus Keyword" value={safe(seo.focusKeyword)} />
      </Section>

    </div>
  );
}

/* ================= BLOCK PREVIEW ================= */

function BlockPreview({ block }) {
  switch (block.type) {

    // ===== TEXT =====
    case "text":
      return (
        <div className="bg-white p-3 rounded border">
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: block.content || "",
            }}
          />
        </div>
      );

    // ===== LIST =====
    case "list":
      return (
        <ul className="bg-white p-3 rounded border space-y-1 text-sm">
          {block.items?.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      );

    // ===== IMAGE =====
    case "image":
      return block.image ? (
        <div className="relative w-full h-[180px] rounded overflow-hidden border">
          <Image
            src={block.image}
            alt="image"
            fill
            className="object-cover"
          />
        </div>
      ) : null;

    // ===== GALLERY =====
    case "gallery":
      return (
        <div className="grid grid-cols-3 gap-2">
          {block.images?.map((img, i) => (
            <div
              key={i}
              className="relative h-[100px] rounded overflow-hidden border"
            >
              <Image
                src={img}
                alt="gallery"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      );

    // ===== SPLIT =====
    case "split":
      return (
        <div className="grid md:grid-cols-2 gap-4 bg-white p-3 rounded border">

          {/* IMAGE */}
          {block.image && (
            <div className="relative h-[180px] rounded overflow-hidden border">
              <Image
                src={block.image}
                alt="split"
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* TEXT */}
          <div className="space-y-2">
            {block.title && (
              <h4 className="font-semibold text-gray-800">
                {block.title}
              </h4>
            )}

            <div
              className="prose prose-sm"
              dangerouslySetInnerHTML={{
                __html: block.description || "",
              }}
            />

            {block.buttonText && (
              <button className="mt-2 px-3 py-1.5 text-xs bg-purple-600 text-white rounded">
                {block.buttonText}
              </button>
            )}
          </div>
        </div>
      );

    // ===== QUOTE =====
    case "quote":
      return (
        <blockquote className="bg-white border-l-4 border-purple-500 p-3 text-sm italic text-gray-700">
          {block.quote}
        </blockquote>
      );

    // ===== DIVIDER =====
    case "divider":
      return <div className="h-px bg-gray-300 my-2" />;

    default:
      return null;
  }
}

/* ================= UI HELPERS ================= */

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h4 className="font-semibold text-gray-800 mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <p className="text-sm text-gray-600">
      <b>{label}:</b> {value}
    </p>
  );
}