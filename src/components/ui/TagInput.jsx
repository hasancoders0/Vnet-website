"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function TagInput({
  value = [],
  onChange,
  max = 15,
  placeholder = "Add tag...",
}) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();

    if (!trimmed) return;
    if (value.includes(trimmed)) return;
    if (value.length >= max) return;

    onChange([...value, trimmed]);
    setInput("");
  };

  const removeTag = (tag) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-2">

      {/* INPUT */}
      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder={placeholder}
          className="flex-1 outline-none text-sm"
        />

        <button
          onClick={addTag}
          className="text-xs px-3 py-1 rounded bg-purple-100 text-purple-600 hover:bg-purple-200 transition"
        >
          Add
        </button>
      </div>

      {/* TAG LIST */}
      <div className="flex flex-wrap gap-2">
        {value.map((tag, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-sm text-gray-700"
          >
            {tag}

            <button
              onClick={() => removeTag(tag)}
              className="text-gray-400 hover:text-red-500 transition"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        ))}
      </div>

      {/* LIMIT */}
      <p className="text-xs text-gray-400">
        {value.length}/{max} tags
      </p>
    </div>
  );
}