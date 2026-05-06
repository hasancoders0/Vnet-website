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
import Textarea from "@/components/ui/form/Textarea";

// ================= SORTABLE ITEM =================
function SortableItem({
  id,
  item,
  i,
  updateItem,
  removeItem,
  setInputRef,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50"
    >
      {/* DRAG */}
      <div {...attributes} {...listeners} className="cursor-grab">
        <FaGripLines className="text-gray-300 text-sm" />
      </div>

      {/* ICON */}
      <FaCheckCircle className="text-green-500 text-xs" />

      {/* INPUT */}
      <div className="flex-1">
        <Input
          ref={setInputRef(i)}
          value={item}
          onChange={(e) => updateItem(i, e.target.value)}
          placeholder="e.g. Fast Loading Speed"
          className="h-9"
        />
      </div>

      {/* DELETE */}
      <button
        type="button"
        onClick={() => removeItem(i)}
        className="p-1.5 hover:bg-red-50 rounded"
      >
        <FaTrash className="text-red-400 text-xs" />
      </button>
    </div>
  );
}

// ================= MAIN =================
export default function WhatYouGetStep({ data, setData }) {
  const section = data.whatYouGet || {
    description: "",
    items: [],
  };

  const items = section.items || [];
  const support = data.support || {
    duration: "",
    type: "",
  };

  const inputRefs = useRef([]);
  const [activeId, setActiveId] = useState(null);

  const setInputRef = (index) => (el) => {
    if (el) inputRefs.current[index] = el;
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

  // ================= DESCRIPTION =================
  const updateDescription = (value) => {
    setData((prev) => ({
      ...prev,
      whatYouGet: {
        ...section,
        description: value,
      },
    }));
  };

  // ================= ITEMS =================
  const addItem = () => {
    setData((prev) => ({
      ...prev,
      whatYouGet: {
        ...section,
        items: [...items, ""],
      },
    }));

    setTimeout(() => {
      inputRefs.current[items.length]?.focus();
    }, 50);
  };

  const removeItem = (index) => {
    setData((prev) => ({
      ...prev,
      whatYouGet: {
        ...section,
        items: items.filter((_, i) => i !== index),
      },
    }));
  };

  const updateItem = (index, value) => {
    const updated = [...items];
    updated[index] = value;

    setData((prev) => ({
      ...prev,
      whatYouGet: {
        ...section,
        items: updated,
      },
    }));
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
      whatYouGet: {
        ...section,
        items: arrayMove(items, oldIndex, newIndex),
      },
    }));
  };

  return (
    <div className="space-y-8">
      {/* ================= SUPPORT ================= */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Support
          </h3>
          <p className="text-sm text-gray-500">
            Define support details for this service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Support Duration">
            <Input
              placeholder="e.g. 30 days"
              value={support.duration}
              onChange={(e) =>
                updateSupport("duration", e.target.value)
              }
            />
          </FormField>

          <FormField label="Support Type">
            <Input
              placeholder="e.g. Free bug fixing"
              value={support.type}
              onChange={(e) =>
                updateSupport("type", e.target.value)
              }
            />
          </FormField>
        </div>
      </div>

      {/* ================= WHAT YOU GET ================= */}
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            What You Get
          </h3>
          <p className="text-sm text-gray-500">
            Add intro and list of benefits
          </p>
        </div>

        {/* DESCRIPTION */}
        <FormField label="Section Description">
          <Textarea
            value={section.description}
            onChange={(e) =>
              updateDescription(e.target.value)
            }
            placeholder="We follow best practices and latest technologies..."
          />
        </FormField>

        {/* LIST */}
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
                  setInputRef={setInputRef}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* ADD BUTTON */}
        <button
          type="button"
          onClick={addItem}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition"
        >
          <FaPlus className="inline mr-2 text-xs" />
          Add Benefit
        </button>
      </div>
    </div>
  );
}