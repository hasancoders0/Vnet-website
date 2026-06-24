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

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* BASIC INFO */}
        <div className="xl:col-span-2">
          <Section title="Basic Information">
            <div className="space-y-3">
              <Row label="Title" value={safe(data.title)} />

              <Row label="Slug" value={safe(seo.slug)} />

              <Row label="Category" value={data.category?.name || "-"} />

              <Row label="Subtitle" value={safe(data.subtitle)} />
            </div>
          </Section>
        </div>

        {/* FEATURED IMAGE */}
        {data.featuredImage && (
          <div
            className={data.featuredImage ? "xl:col-span-2" : "xl:col-span-5"}
          >
            <Section title="Featured Image">
              <div className="relative h-[260px] lg:h-[320px] overflow-hidden rounded-2xl">
                <Image
                  src={data.featuredImage}
                  alt="featured"
                  fill
                  className="object-cover"
                />
              </div>
            </Section>
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <Section title="Blog Content">
        {data.content?.length === 0 ? (
          <p className="text-sm text-gray-400">No content added</p>
        ) : (
          <div className="space-y-6">
            {data.content.map((section, i) => (
              <div key={i} className="rounded-xl p-4 bg-gray-50">
                {/* SECTION HEADER */}
                <div className="mb-3">
                  <h5 className="font-semibold text-gray-800">
                    {section.title || `Section ${i + 1}`}
                  </h5>

                  <p className="text-xs text-gray-500">
                    {section.blocks?.length || 0} blocks
                  </p>
                </div>

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
      <Section title="SEO Settings">
        <div className="grid md:grid-cols-2 gap-4">
          <Row label="Slug" value={safe(seo.slug)} />
          <Row label="Focus Keyword" value={safe(seo.focusKeyword)} />
          <Row label="Meta Title" value={safe(seo.metaTitle)} />
          <Row label="Meta Description" value={safe(seo.metaDescription)} />
        </div>
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
        <div className="bg-white/80 rounded-xl p-4">
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
        <ul className="bg-white p-3 rounded space-y-1 text-sm">
          {block.items?.map((item, i) => (
            <li key={item?.id || i}>
              • {typeof item === "string" ? item : item?.text}
            </li>
          ))}
        </ul>
      );

    // ===== GALLERY =====
    case "gallery":
      return (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {block.images?.map((img, i) => (
            <div
              key={img?.id || i}
              className="relative h-[100px] rounded overflow-hidden"
            >
              <Image
                src={typeof img === "string" ? img : img?.url}
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
        <div className="grid md:grid-cols-2 gap-4 bg-white p-3 rounded">
          {block.layout === "right" ? (
            <>
              {/* CONTENT */}
              <div className="space-y-2">
                {block.title && (
                  <h4 className="font-semibold text-gray-800">{block.title}</h4>
                )}

                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: block.description || "",
                  }}
                />

                {block.buttonText && (
                  <span className="inline-flex mt-2 px-3 py-1.5 text-xs rounded-full bg-purple-100 text-purple-700">
                    Button: {block.buttonText}
                  </span>
                )}
              </div>

              {/* IMAGE */}
              {block.image && (
                <div className="relative h-[180px] rounded overflow-hidden">
                  <Image
                    src={block.image}
                    alt="split"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {/* IMAGE */}
              {block.image && (
                <div className="relative h-[180px] rounded overflow-hidden">
                  <Image
                    src={block.image}
                    alt="split"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* CONTENT */}
              <div className="space-y-2">
                {block.title && (
                  <h4 className="font-semibold text-gray-800">{block.title}</h4>
                )}

                <div
                  className="prose prose-sm max-w-none"
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
            </>
          )}
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
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/70">
      <h4 className="font-semibold text-gray-800 mb-3">{title}</h4>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
      <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>

      <p className="mt-1 text-sm font-medium text-gray-800 break-all">
        {value}
      </p>
    </div>
  );
}
