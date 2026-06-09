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
      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 bg-white hover:shadow-sm transition"
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
        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition"
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
        ...(prev.whatYouGet || {}),
        description: value,
        items: prev.whatYouGet?.items || [],
      },
    }));
  };

  // ================= ITEMS =================
  const addItem = () => {
    setData((prev) => ({
      ...prev,
      whatYouGet: {
        ...(prev.whatYouGet || {}),
        description: prev.whatYouGet?.description || "",
        items: [...(prev.whatYouGet?.items || []), ""],
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
        ...(prev.whatYouGet || {}),
        description: prev.whatYouGet?.description || "",
        items: prev.whatYouGet.items.filter((_, i) => i !== index),
      },
    }));
  };

  const updateItem = (index, value) => {
    setData((prev) => {
      const updated = [...(prev.whatYouGet?.items || [])];
      updated[index] = value;

      return {
        ...prev,
        whatYouGet: {
          ...(prev.whatYouGet || {}),
          description: prev.whatYouGet?.description || "",
          items: updated,
        },
      };
    });
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
        ...(prev.whatYouGet || {}),
        description: prev.whatYouGet?.description || "",
        items: arrayMove(
          prev.whatYouGet?.items || [],
          oldIndex,
          newIndex
        ),
      },
    }));
  };

  return (
    <div className="space-y-10">

      {/* ================= SUPPORT ================= */}
      <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-6 space-y-5">

        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Support
          </h3>
          <p className="text-sm text-gray-500">
            Define support details for this service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-6">

        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            What You Get
          </h3>
          <p className="text-sm text-gray-500">
            Add intro and list of benefits
          </p>
        </div>

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
        {items.length > 0 ? (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={(e) => setActiveId(e.active.id)}
          >
            <SortableContext
              items={items.map((_, i) => i.toString())}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
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
        ) : (
          <div className="text-center py-10 border border-dashed rounded-xl bg-gray-50">
            <p className="text-sm text-gray-400">
              No benefits added yet
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Add items to show what users will get
            </p>
          </div>
        )}

        {/* ADD BUTTON */}
        <button
          type="button"
          onClick={addItem}
          className="px-5 py-2.5 rounded-lg text-sm font-medium bg-purple-600 text-white hover:opacity-90 transition"
        >
          <FaPlus className="inline mr-2 text-xs" />
          Add Benefit
        </button>

      </div>

    </div>
  );
}