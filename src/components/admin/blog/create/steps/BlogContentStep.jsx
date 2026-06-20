"use client";

import {
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaAlignLeft,
  FaAlignRight,
  FaPlus,
} from "react-icons/fa";

import Input from "@/components/ui/form/Input";
import ImagePicker from "@/components/ui/ImagePicker";
import RichTextEditor from "@/components/ui/form/RichTextEditor";

// ================= CONFIG =================
const BLOCK_TYPES = [
  { label: "Text", value: "text" },
  { label: "List", value: "list" },
  { label: "Image", value: "image" },
  { label: "Split", value: "split" },
  { label: "Gallery", value: "gallery" },
  { label: "Quote", value: "quote" },
  { label: "Divider", value: "divider" },
];

const PALETTES = ["white", "soft", "dark", "brand", "accent"];
const BUTTON_TYPES = ["primary", "outline", "ghost", "link"];

// ✅ FIXED UID (IMPORTANT)
const uid = () => crypto.randomUUID();

// ================= FACTORY =================
const createBlock = (type = "text") => ({
  id: uid(),
  type,
  content: "",
  items: [],
  image: "",
  images: [],
  layout: "left",
  title: "",
  description: "",
  quote: "",
  buttonText: "",
  buttonLink: "",
  buttonType: "primary",
});

const createSection = () => ({
  id: uid(),
  title: "",
  palette: "white",
  blocks: [],
});

// ================= COMPONENT =================
export default function BlogContentStep({ data, setData }) {
  const content = data.content || [];

  const updateContent = (updater) => {
    setData((prev) => ({
      ...prev,
      content:
        typeof updater === "function"
          ? updater(prev.content || [])
          : updater,
    }));
  };

  // ================= SECTION =================
  const addSection = () => {
    updateContent((prev) => [...prev, createSection()]);
  };

  const updateSection = (id, key, value) => {
    updateContent((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [key]: value } : s))
    );
  };

  const removeSection = (id) => {
    updateContent((prev) => prev.filter((s) => s.id !== id));
  };

  const moveSection = (index, dir) => {
    updateContent((prev) => {
      const arr = [...prev];
      const target = index + dir;
      if (target < 0 || target >= arr.length) return prev;
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return arr;
    });
  };

  // ================= BLOCK =================
  const addBlock = (sectionId, type) => {
    updateContent((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, blocks: [...s.blocks, createBlock(type)] }
          : s
      )
    );
  };

  const updateBlock = (sectionId, blockId, key, value) => {
    updateContent((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              blocks: s.blocks.map((b) =>
                b.id === blockId ? { ...b, [key]: value } : b
              ),
            }
          : s
      )
    );
  };

  const removeBlock = (sectionId, blockId) => {
    updateContent((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              blocks: s.blocks.filter((b) => b.id !== blockId),
            }
          : s
      )
    );
  };

  const moveBlock = (sectionId, index, dir) => {
    updateContent((prev) =>
      prev.map((s) => {
        if (s.id !== sectionId) return s;

        const arr = [...s.blocks];
        const target = index + dir;

        if (target < 0 || target >= arr.length) return s;

        [arr[index], arr[target]] = [arr[target], arr[index]];
        return { ...s, blocks: arr };
      })
    );
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Blog Content
        </h3>
        <p className="text-sm text-gray-500">
          Build structured content
        </p>
      </div>

      {/* SECTIONS */}
      <div className="space-y-6">
        {content.map((section, index) => (
          <div
            key={section.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5 shadow-sm"
          >

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-semibold">
                Section {index + 1}
              </h4>

              <div className="flex gap-2 text-xs">
                <button onClick={() => moveSection(index, -1)}>
                  <FaArrowUp />
                </button>
                <button onClick={() => moveSection(index, 1)}>
                  <FaArrowDown />
                </button>
                <button
                  onClick={() => removeSection(section.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            {/* PALETTE */}
            <div className="flex gap-2 flex-wrap">
              {PALETTES.map((p) => (
                <button
                  key={p}
                  onClick={() => updateSection(section.id, "palette", p)}
                  className={`px-3 py-1 text-xs rounded-full capitalize transition
                  ${
                    section.palette === p
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* TITLE */}
            <Input
              value={section.title}
              placeholder="Section title"
              onChange={(e) =>
                updateSection(section.id, "title", e.target.value)
              }
            />

            {/* BLOCKS */}
            {section.blocks.map((block, i) => (
              <div
                key={block.id}
                className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-4"
              >

                {/* HEADER */}
                <div className="flex justify-between text-xs uppercase text-gray-400">
                  <span>{block.type}</span>

                  <div className="flex gap-2">
                    <button onClick={() => moveBlock(section.id, i, -1)}>
                      <FaArrowUp />
                    </button>
                    <button onClick={() => moveBlock(section.id, i, 1)}>
                      <FaArrowDown />
                    </button>
                    <button
                      onClick={() => removeBlock(section.id, block.id)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {/* TEXT */}
                {block.type === "text" && (
                  <RichTextEditor
                    value={block.content}
                    onChange={(val) =>
                      updateBlock(section.id, block.id, "content", val)
                    }
                  />
                )}

                {/* LIST */}
                {block.type === "list" && (
                  <div className="space-y-2">
                    {(block.items || []).map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={item}
                          onChange={(e) => {
                            const arr = [...block.items];
                            arr[idx] = e.target.value;
                            updateBlock(section.id, block.id, "items", arr);
                          }}
                        />
                        <button
                          onClick={() => {
                            const arr = block.items.filter((_, i) => i !== idx);
                            updateBlock(section.id, block.id, "items", arr);
                          }}
                          className="text-red-500 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={() =>
                        updateBlock(section.id, block.id, "items", [
                          ...(block.items || []),
                          "",
                        ])
                      }
                      className="text-xs text-purple-600 flex items-center gap-1"
                    >
                      <FaPlus /> Add Item
                    </button>
                  </div>
                )}

                {/* IMAGE */}
                {block.type === "image" && (
                  <ImagePicker
                    value={block.image}
                    onChange={(url) =>
                      updateBlock(section.id, block.id, "image", url)
                    }
                    folder="blogs"
                  />
                )}

                {/* SPLIT */}

{block.type === "split" && (
  <div className="space-y-5">
    {/* LAYOUT SELECTOR */}
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-2">
        Layout
      </label>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() =>
            updateBlock(section.id, block.id, "layout", "left")
          }
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition ${
            block.layout === "left"
              ? "border-purple-500 bg-purple-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="w-10 h-8 rounded bg-gray-200" />
          <div className="w-12 h-8 flex flex-col gap-1">
            <div className="h-2 bg-gray-300 rounded" />
            <div className="h-2 bg-gray-300 rounded" />
          </div>

          <span className="text-sm">Image Left</span>
        </button>

        <button
          type="button"
          onClick={() =>
            updateBlock(section.id, block.id, "layout", "right")
          }
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition ${
            block.layout === "right"
              ? "border-purple-500 bg-purple-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="w-12 h-8 flex flex-col gap-1">
            <div className="h-2 bg-gray-300 rounded" />
            <div className="h-2 bg-gray-300 rounded" />
          </div>

          <div className="w-10 h-8 rounded bg-gray-200" />

          <span className="text-sm">Image Right</span>
        </button>
      </div>
    </div>

    {/* SPLIT EDITOR */}
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* IMAGE SIDE */}
      <div className="lg:col-span-2">
        <div className="bg-white border border-gray-200 rounded-xl p-4 h-full">
          <h4 className="text-sm font-medium text-gray-700 mb-4">
            Image
          </h4>

          <ImagePicker
            value={block.image}
            onChange={(url) =>
              updateBlock(section.id, block.id, "image", url)
            }
            folder="blogs"
          />
        </div>
      </div>

      {/* CONTENT SIDE */}
      <div className="lg:col-span-3">
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
          <Input
            placeholder="Title"
            value={block.title}
            onChange={(e) =>
              updateBlock(
                section.id,
                block.id,
                "title",
                e.target.value
              )
            }
          />

          <RichTextEditor
            value={block.description}
            onChange={(val) =>
              updateBlock(
                section.id,
                block.id,
                "description",
                val
              )
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              placeholder="Button Text"
              value={block.buttonText}
              onChange={(e) =>
                updateBlock(
                  section.id,
                  block.id,
                  "buttonText",
                  e.target.value
                )
              }
            />

            <Input
              placeholder="Button Link"
              value={block.buttonLink}
              onChange={(e) =>
                updateBlock(
                  section.id,
                  block.id,
                  "buttonLink",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">
              Button Style
            </label>

            <div className="flex flex-wrap gap-2">
              {BUTTON_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() =>
                    updateBlock(
                      section.id,
                      block.id,
                      "buttonType",
                      t
                    )
                  }
                  className={`px-3 py-1.5 text-xs rounded-full capitalize transition ${
                    block.buttonType === t
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
 


                {/* GALLERY */}
                {block.type === "gallery" && (
                  <div className="space-y-2">
                    {(block.images || []).map((img, idx) => (
                      <div key={idx}>
                        <ImagePicker
                          value={img}
                          onChange={(url) => {
                            const arr = [...block.images];
                            arr[idx] = url;
                            updateBlock(section.id, block.id, "images", arr);
                          }}
                          folder="blogs"
                        />
                      </div>
                    ))}

                    <button
                      onClick={() =>
                        updateBlock(section.id, block.id, "images", [
                          ...(block.images || []),
                          "",
                        ])
                      }
                      className="text-xs text-purple-600 flex items-center gap-1"
                    >
                      <FaPlus /> Add Image
                    </button>
                  </div>
                )}

                {/* QUOTE */}
                {block.type === "quote" && (
                  <Input
                    value={block.quote}
                    placeholder="Quote"
                    onChange={(e) =>
                      updateBlock(section.id, block.id, "quote", e.target.value)
                    }
                  />
                )}

                {/* DIVIDER */}
                {block.type === "divider" && (
                  <div className="h-px bg-gray-300" />
                )}

              </div>
            ))}

            {/* ADD BLOCK */}
            <div className="flex gap-2 flex-wrap">
              {BLOCK_TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => addBlock(section.id, t.value)}
                  className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
                >
                  + {t.label}
                </button>
              ))}
            </div>

          </div>
        ))}

        {/* ADD SECTION */}
        <button
          onClick={addSection}
          className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:bg-gray-50"
        >
          + Add Section
        </button>
      </div>
    </div>
  );
}