"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import { useEffect } from "react";
import { cn } from "@/utils/cn";

import {
  FiBold,
  FiItalic,
  FiList,
  FiAlignLeft,
  FiAlignCenter,
} from "react-icons/fi";

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something...",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: value || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // prevent overwrite
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="w-full border border-gray-300 rounded-lg overflow-hidden bg-white">
      
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 p-2 bg-gray-50">
        
        {/* Heading */}
        <select
          onChange={(e) => {
            const level = Number(e.target.value);
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}
          className="text-sm border border-gray-200 rounded px-2 py-1"
        >
          <option value={0}>Paragraph</option>
          <option value={1}>H1</option>
          <option value={2}>H2</option>
          <option value={3}>H3</option>
        </select>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <FiBold />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <FiItalic />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <FiList />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
          active={editor.isActive({ textAlign: "left" })}
        >
          <FiAlignLeft />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
          active={editor.isActive({ textAlign: "center" })}
        >
          <FiAlignCenter />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className={cn(
          "p-3 min-h-[200px] text-sm text-gray-800",
          "focus:outline-none",
          "[&_.ProseMirror]:outline-none",
          "[&_.ProseMirror]:min-h-[150px]"
        )}
      />
    </div>
  );
}

/* Toolbar Button */
function ToolbarButton({ children, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-2 rounded text-sm transition",
        active
          ? "bg-purple-100 text-purple-600"
          : "text-gray-600 hover:bg-gray-100"
      )}
    >
      {children}
    </button>
  );
}