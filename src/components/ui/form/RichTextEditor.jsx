"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
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
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  // Prevent overwrite bug (VERY IMPORTANT)
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      
      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b border-white/10 p-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btn(editor.isActive("bold"))}
        >
          <FiBold />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btn(editor.isActive("italic"))}
        >
          <FiItalic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btn(editor.isActive("bulletList"))}
        >
          <FiList />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
          className={btn(editor.isActive({ textAlign: "left" }))}
        >
          <FiAlignLeft />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
          className={btn(editor.isActive({ textAlign: "center" }))}
        >
          <FiAlignCenter />
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="p-3 min-h-[200px] text-sm text-white prose prose-invert max-w-none focus:outline-none"
      />
    </div>
  );
}

function btn(active) {
  return cn(
    "p-2 rounded-lg text-sm transition",
    active
      ? "bg-white/20 text-white"
      : "text-white/60 hover:bg-white/10"
  );
}