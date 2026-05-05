"use client";

import { FaCheckCircle, FaTrash, FaGripLines, FaPlus } from "react-icons/fa";

export default function WhatYouGetStep({ data, setData }) {
  const items = data.whatYouGet || [];

  const addItem = () => {
    setData({
      ...data,
      whatYouGet: [...items, ""],
    });
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setData({ ...data, whatYouGet: updated });
  };

  const updateItem = (index, value) => {
    const updated = [...items];
    updated[index] = value;
    setData({ ...data, whatYouGet: updated });
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          What You Get
        </h3>
        <p className="text-sm text-gray-500">
          Add benefits your client will receive
        </p>
      </div>

      {/* EMPTY STATE */}
      {items.length === 0 && (
        <div className="border border-dashed rounded-xl p-6 text-center text-sm text-gray-400">
          No benefits added yet. Click below to add your first one.
        </div>
      )}

      {/* LIST */}
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition group"
          >
            {/* DRAG */}
            <FaGripLines className="text-gray-300 text-sm cursor-grab group-hover:text-gray-400" />

            {/* ICON */}
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50">
              <FaCheckCircle className="text-green-500 text-sm" />
            </div>

            {/* INPUT */}
            <input
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              placeholder="e.g. Lifetime access"
              className="flex-1 h-10 px-3 rounded-md border border-transparent focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 outline-none text-sm transition"
            />

            {/* DELETE */}
            <button
              onClick={() => removeItem(i)}
              className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition"
            >
              <FaTrash className="text-red-500 text-sm" />
            </button>
          </div>
        ))}
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={addItem}
        className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition"
      >
        <FaPlus className="text-xs" />
        Add Benefit
      </button>
    </div>
  );
}