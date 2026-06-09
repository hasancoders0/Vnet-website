"use client";

import * as FaIcons from "react-icons/fa";
import { FaTrash, FaGripLines } from "react-icons/fa";
import { useState } from "react";

import {
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import IconPicker from "@/components/ui/IconPicker";
import Input from "@/components/ui/form/Input";
import Textarea from "@/components/ui/form/Textarea";

// ================= ITEM =================
function SortableItem({
  id,
  step,
  i,
  updateStep,
  removeStep,
  errors,
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

  const titleError = errors[`process.${i}.title`];
  const descError = errors[`process.${i}.description`];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex gap-4 transition ${
        isDragging ? "opacity-40 scale-[0.98]" : ""
      }`}
    >
      {/* TIMELINE */}
      <div className="flex flex-col items-center">
        <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center text-sm font-medium">
          {i + 1}
        </div>
        <div className="flex-1 w-px bg-gray-200 mt-2" />
      </div>

      {/* CARD */}
      <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 space-y-3 hover:shadow-sm transition">

        {/* TOP */}
        <div className="flex items-center gap-3">

          <IconPicker
            value={step.icon}
            onChange={(val) =>
              updateStep(i, "icon", val)
            }
          />

          <div className="flex-1">
            <Input
              placeholder="Step title"
              value={step.title}
              onChange={(e) =>
                updateStep(i, "title", e.target.value)
              }
              error={titleError}
            />

            {titleError && (
              <p className="text-xs text-red-500 mt-1">
                {titleError}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => removeStep(i)}
              className="p-2 rounded-lg hover:bg-red-50"
            >
              <FaTrash className="text-red-400 text-sm" />
            </button>

            <div
              {...attributes}
              {...listeners}
              className="p-2 rounded-lg hover:bg-gray-100 cursor-grab active:cursor-grabbing"
            >
              <FaGripLines className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <Textarea
          placeholder="Describe this step..."
          value={step.description}
          onChange={(e) =>
            updateStep(i, "description", e.target.value)
          }
          rows={2}
          error={descError}
        />

        {descError && (
          <p className="text-xs text-red-500">
            {descError}
          </p>
        )}

      </div>
    </div>
  );
}

// ================= DRAG PREVIEW =================
function DragPreview({ step }) {
  const Icon = FaIcons[step.icon] || FaIcons.FaRocket;

  return (
    <div className="flex gap-4 p-4 rounded-xl bg-white shadow-xl border border-gray-200 scale-[1.02]">
      <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center text-sm">
        <Icon />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-800">
          {step.title || "Untitled Step"}
        </p>
        <p className="text-xs text-gray-400">
          {step.description || "No description"}
        </p>
      </div>
    </div>
  );
}

// ================= MAIN =================
export default function ProcessStep({
  data,
  setData,
  errors = {},
}) {
  const steps = data.process || [];
  const [activeId, setActiveId] = useState(null);

  // ================= ADD =================
  const addStep = () => {
    setData((prev) => ({
      ...prev,
      process: [
        ...(prev.process || []),
        {
          title: "",
          description: "",
          icon: "FaRocket",
        },
      ],
    }));
  };

  // ================= REMOVE =================
  const removeStep = (index) => {
    setData((prev) => ({
      ...prev,
      process: prev.process.filter((_, i) => i !== index),
    }));
  };

  // ================= UPDATE =================
  const updateStep = (index, key, value) => {
    setData((prev) => {
      const updated = [...(prev.process || [])];
      updated[index] = {
        ...updated[index],
        [key]: value,
      };
      return { ...prev, process: updated };
    });
  };

  // ================= DRAG =================
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = Number(active.id);
    const newIndex = Number(over.id);

    setData((prev) => ({
      ...prev,
      process: arrayMove(prev.process, oldIndex, newIndex),
    }));
  };

  const activeStep =
    activeId !== null ? steps[Number(activeId)] : null;

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Service Process
        </h3>
        <p className="text-sm text-gray-500">
          Drag to reorder steps
        </p>
      </div>

      {/* SECTION */}
      <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-6 space-y-6">

        {errors?.process && (
          <p className="text-sm text-red-500">
            {errors.process}
          </p>
        )}

        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={steps.map((_, i) => i.toString())}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-6">
              {steps.map((step, i) => (
                <SortableItem
                  key={i}
                  id={i.toString()}
                  step={step}
                  i={i}
                  updateStep={updateStep}
                  removeStep={removeStep}
                  errors={errors}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeStep && <DragPreview step={activeStep} />}
          </DragOverlay>
        </DndContext>

        {/* ADD BUTTON */}
        <button
          onClick={addStep}
          className="w-full px-5 py-3 rounded-xl text-sm font-medium bg-purple-600 text-white hover:opacity-90 transition"
        >
          + Add Step
        </button>

      </div>

    </div>
  );
}