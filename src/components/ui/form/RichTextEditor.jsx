"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiLink,
  FiRotateCcw,
  FiRotateCw,
} from "react-icons/fi";

import {
  FaListOl,
  FaQuoteLeft,
  FaHighlighter,
  FaTable,
  FaPlus,
  FaMinus,
  FaTrash,
} from "react-icons/fa";

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing your content...",
}) {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [openInNewTab, setOpenInNewTab] = useState(true);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
        },
        orderedList: {
          keepMarks: true,
        },
      }),

      Placeholder.configure({
        placeholder,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Heading.configure({
        levels: [2, 3, 4],
      }),

      Underline,

      Highlight.configure({
        multicolor: true,
      }),

      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],

    content: value || "",

    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const openLinkModal = () => {
    const currentUrl = editor?.getAttributes("link")?.href || "";

    setLinkUrl(currentUrl);
    setShowLinkModal(true);
  };

  const insertLink = () => {
    if (!linkUrl || linkUrl === "#") {
      return;
    }

    const normalizedUrl =
      linkUrl.startsWith("http://") || linkUrl.startsWith("https://")
        ? linkUrl
        : `https://${linkUrl}`;

    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: normalizedUrl,
        target: openInNewTab ? "_blank" : null,
      })
      .run();

    setShowLinkModal(false);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 p-2">
        {/* Heading */}
        <select
          value={
            editor.isActive("heading", { level: 2 })
              ? 2
              : editor.isActive("heading", { level: 3 })
                ? 3
                : editor.isActive("heading", { level: 4 })
                  ? 4
                  : 0
          }
          className="rounded-md border border-gray-200 px-2 py-1 text-sm"
          onChange={(e) => {
            const level = Number(e.target.value);

            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}
        >
          <option value={0}>Paragraph</option>
          <option value={2}>H2</option>
          <option value={3}>H3</option>
          <option value={4}>H4</option>
        </select>

        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FiBold />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FiItalic />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <FiUnderline />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <FaHighlighter />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FiList />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FaListOl />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <FaQuoteLeft />
        </ToolbarButton>

        <ToolbarButton active={editor.isActive("link")} onClick={openLinkModal}>
          <FiLink />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor
              ?.chain()
              .focus()
              .insertTable({
                rows: 3,
                cols: 3,
                withHeaderRow: true,
              })
              .run()
          }
        >
          <FaTable />
        </ToolbarButton>
        {editor.isActive("table") && (
          <>
            <ToolbarButton
              onClick={() => editor.chain().focus().addRowAfter().run()}
            >
              <FaPlus />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().deleteRow().run()}
            >
              <FaMinus />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            >
              C+
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().deleteColumn().run()}
            >
              C-
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().deleteTable().run()}
            >
              <FaTrash />
            </ToolbarButton>
          </>
        )}

        <div className="mx-2 h-8 w-px bg-gray-200" />

        <ToolbarButton
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <FiAlignLeft />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <FiAlignCenter />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <FiAlignRight />
        </ToolbarButton>

        <div className="mx-2 h-8 w-px bg-gray-200" />

        <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
          <FiRotateCcw />
        </ToolbarButton>

        <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
          <FiRotateCw />
        </ToolbarButton>
      </div>

      {/* Editor */}
      {/* Current Link Bar */}
      {editor.isActive("link") && (
        <div className="border-b border-blue-200 bg-blue-50 px-4 py-2 text-xs">
          <span className="font-medium text-slate-700">Current Link:</span>

          <span className="ml-2 text-blue-700">
            {editor.getAttributes("link").href}
          </span>
        </div>
      )}

      {/* Editor */}
      <EditorContent
        editor={editor}
        onMouseDown={(e) => {
          const link = e.target.closest("a");

          if (link) {
            e.preventDefault();
            e.stopPropagation();

            openLinkModal();
            return false;
          }
        }}
        className={cn(
          "min-h-[280px] p-5 text-gray-800",

          "[&_.ProseMirror]:min-h-[240px]",
          "[&_.ProseMirror]:outline-none",

          /* Headings */
          "[&_.ProseMirror_h2]:text-3xl",
          "[&_.ProseMirror_h2]:font-bold",
          "[&_.ProseMirror_h2]:mb-4",

          "[&_.ProseMirror_h3]:text-2xl",
          "[&_.ProseMirror_h3]:font-semibold",
          "[&_.ProseMirror_h3]:mb-3",

          "[&_.ProseMirror_h4]:text-xl",
          "[&_.ProseMirror_h4]:font-medium",
          "[&_.ProseMirror_h4]:mb-3",

          /* Paragraph */
          "[&_.ProseMirror_p]:leading-8",
          "[&_.ProseMirror_p]:mb-4",

          /* Lists */
          "[&_.ProseMirror_ul]:list-disc",
          "[&_.ProseMirror_ul]:pl-6",

          "[&_.ProseMirror_ol]:list-decimal",
          "[&_.ProseMirror_ol]:pl-6",

          /* Quote */
          "[&_.ProseMirror_blockquote]:border-l-4",
          "[&_.ProseMirror_blockquote]:border-purple-500",
          "[&_.ProseMirror_blockquote]:pl-4",
          "[&_.ProseMirror_blockquote]:italic",
          "[&_.ProseMirror_blockquote]:text-slate-600",

          /* Tables */
          "[&_.ProseMirror_table]:w-full",
          "[&_.ProseMirror_table]:border-collapse",
          "[&_.ProseMirror_table]:overflow-hidden",
          "[&_.ProseMirror_table]:rounded-lg",

          "[&_.ProseMirror_th]:border",
          "[&_.ProseMirror_th]:border-gray-300",
          "[&_.ProseMirror_th]:bg-gray-100",
          "[&_.ProseMirror_th]:p-2",
          "[&_.ProseMirror_th]:text-left",

          "[&_.ProseMirror_td]:border",
          "[&_.ProseMirror_td]:border-gray-300",
          "[&_.ProseMirror_td]:p-2",

          "[&_.ProseMirror_tr:nth-child(even)]:bg-gray-50",

          /* Links */
          "[&_.ProseMirror_a]:text-blue-600",
          "[&_.ProseMirror_a]:underline",
          "[&_.ProseMirror_a]:font-medium",
          "[&_.ProseMirror_a]:cursor-pointer",

          /* Code */
          "[&_.ProseMirror_pre]:bg-slate-900",
          "[&_.ProseMirror_pre]:text-slate-100",
          "[&_.ProseMirror_pre]:p-4",
          "[&_.ProseMirror_pre]:rounded-lg",
          "[&_.ProseMirror_pre]:overflow-x-auto",

          "[&_.ProseMirror_code]:bg-slate-100",
          "[&_.ProseMirror_code]:px-1",
          "[&_.ProseMirror_code]:py-0.5",
          "[&_.ProseMirror_code]:rounded",
        )}
      />
      {showLinkModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold">Insert Link</h3>

            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />

            <label className="mt-4 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={openInNewTab}
                onChange={(e) => setOpenInNewTab(e.target.checked)}
              />
              Open in new tab
            </label>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="rounded-lg border px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  editor?.chain().focus().unsetLink().run();
                  setShowLinkModal(false);
                }}
                className="rounded-lg border border-red-300 px-4 py-2 text-red-600"
              >
                Remove Link
              </button>

              <button
                type="button"
                onClick={insertLink}
                className="rounded-lg bg-purple-600 px-4 py-2 text-white"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolbarButton({ children, onClick, active = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-md transition",
        active
          ? "bg-purple-100 text-purple-600"
          : "text-gray-600 hover:bg-gray-100",
      )}
    >
      {children}
    </button>
  );
}
