"use client";

import {
  FaCheckCircle,
  FaTrash,
  FaGripLines,
  FaPlus,
} from "react-icons/fa";

import { useRef, useState } from "react";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import FormField from "@/components/ui/form/FormField";
import Input from "@/components/ui/form/Input";

// ================= SORTABLE ITEM =================
function SortableItem({
  id,
  item,
  i,
  updateItem,
  removeItem,
  errors,
  setInputRef,
  handleKeyDown,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const fieldError = errors?.[`whatYouGet.${i}`];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
        ${isDragging ? "bg-white shadow-md scale-[0.98]" : "hover:bg-gray-50"}
      `}
    >
      {/* DRAG HANDLE */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1"
      >
        <FaGripLines className="text-gray-300 text-sm" />
      </div>

      {/* ICON */}
      <div className="w-7 h-7 flex items-center justify-center rounded-md bg-green-50">
        <FaCheckCircle className="text-green-500 text-xs" />
      </div>

      {/* INPUT */}
      <div className="flex-1">
        <Input
          ref={setInputRef(i)} // ✅ FIXED
          value={item}
          onChange={(e) => updateItem(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          placeholder="e.g. Lifetime access"
          className="h-9"
          error={fieldError}
        />

        {fieldError && (
          <p className="text-xs text-red-500 mt-1">
            {fieldError}
          </p>
        )}
      </div>

      {/* DELETE */}
      <button
        type="button"
        onClick={() => removeItem(i)}
        className="p-1.5 rounded hover:bg-red-50 transition"
      >
        <FaTrash className="text-red-400 text-xs" />
      </button>
    </div>
  );
}

// ================= MAIN =================
export default function WhatYouGetStep({
  data,
  setData,
  errors = {},
}) {
  const items = data.whatYouGet || [];
  const support = data.support || { duration: "", type: "" };

  const inputRefs = useRef([]);
  const [activeId, setActiveId] = useState(null);

  // ✅ FIXED REF HANDLER (NO WARNING)
  const setInputRef = (index) => (el) => {
    if (el) {
      inputRefs.current[index] = el;
    }
  };

  // ================= SUPPORT =================
  const updateSupport = (key, value) => {
    setData((prev) => ({
      ...prev,
      support: {
        ...(prev.support || {}),
        [key]: value,
      },
    }));
  };

  // ================= ITEMS =================
  const addItem = (focusIndex = null) => {
    setData((prev) => ({
      ...prev,
      whatYouGet: [...(prev.whatYouGet || []), ""],
    }));

    setTimeout(() => {
      const index =
        focusIndex !== null
          ? focusIndex + 1
          : items.length;

      inputRefs.current[index]?.focus();
    }, 50);
  };

  const removeItem = (index) => {
    setData((prev) => ({
      ...prev,
      whatYouGet: prev.whatYouGet.filter((_, i) => i !== index),
    }));

    setTimeout(() => {
      inputRefs.current[index - 1]?.focus();
    }, 50);
  };

  const updateItem = (index, value) => {
    setData((prev) => {
      const updated = [...(prev.whatYouGet || [])];
      updated[index] = value;
      return { ...prev, whatYouGet: updated };
    });
  };

  // ================= KEY UX =================
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem(index);
    }

    if (e.key === "Backspace" && !items[index]) {
      if (items.length > 1) {
        e.preventDefault();
        removeItem(index);
      }
    }
  };

  // ================= DRAG =================
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = Number(active.id);
    const newIndex = Number(over.id);

    setData((prev) => ({
      ...prev,
      whatYouGet: arrayMove(
        prev.whatYouGet,
        oldIndex,
        newIndex
      ),
    }));

    // 🔥 focus moved item
    setTimeout(() => {
      inputRefs.current[newIndex]?.focus();
    }, 50);
  };

  return (
    <div className="space-y-8">
      {/* SUPPORT */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Support
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Support Duration">
            <Input
              value={support.duration}
              onChange={(e) =>
                updateSupport("duration", e.target.value)
              }
            />
          </FormField>

          <FormField label="Support Type">
            <Input
              value={support.type}
              onChange={(e) =>
                updateSupport("type", e.target.value)
              }
            />
          </FormField>
        </div>
      </div>

      {/* WHAT YOU GET */}
      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-gray-800">
          What You Get
        </h3>

        {errors?.whatYouGet && (
          <p className="text-sm text-red-500">
            {errors.whatYouGet}
          </p>
        )}

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={(e) => setActiveId(e.active.id)}
        >
          <SortableContext
            items={items.map((_, i) => i.toString())}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {items.map((item, i) => (
                <SortableItem
                  key={i}
                  id={i.toString()}
                  item={item}
                  i={i}
                  updateItem={updateItem}
                  removeItem={removeItem}
                  errors={errors}
                  setInputRef={setInputRef}
                  handleKeyDown={handleKeyDown}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* ADD */}
        <button
          type="button"
          onClick={() => addItem()}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition"
        >
          <FaPlus className="inline mr-2 text-xs" />
          Add Benefit
        </button>
      </div>
    </div>
  );
}