"use client";

import * as FaIcons from "react-icons/fa";
import { FaTrash, FaGripLines } from "react-icons/fa";

// ✅ GLOBAL ICON PICKER
import IconPicker from "@/components/ui/IconPicker";

export default function ProcessStep({ data, setData }) {
  const steps = data.process || [];

  const addStep = () => {
    setData({
      ...data,
      process: [
        ...steps,
        {
          title: "",
          description: "",
          icon: "FaRocket",
        },
      ],
    });
  };

  const removeStep = (index) => {
    setData({
      ...data,
      process: steps.filter((_, i) => i !== index),
    });
  };

  const updateStep = (index, key, value) => {
    const updated = [...steps];
    updated[index][key] = value;
    setData({ ...data, process: updated });
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Service Process
        </h3>
        <p className="text-sm text-gray-500">
          Define how your service workflow works
        </p>
      </div>

      {/* EMPTY */}
      {steps.length === 0 && (
        <div className="border border-dashed rounded-xl p-6 text-center text-sm text-gray-400">
          No steps yet. Add your first process step.
        </div>
      )}

      {/* TIMELINE */}
      <div className="space-y-5">
        {steps.map((step, i) => {
          const Icon = FaIcons[step.icon] || FaIcons.FaRocket;

          return (
            <div key={i} className="flex gap-4">

              {/* LEFT SIDE */}
              <div className="flex flex-col items-center">

                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </div>

                {i !== steps.length - 1 && (
                  <div className="w-[2px] flex-1 bg-gray-200 mt-2" />
                )}
              </div>

              {/* CARD */}
              <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">

                <div className="space-y-4">

                  {/* TOP ROW */}
                  <div className="flex items-center gap-3">

                    {/* ✅ ONLY ONE ICON (FIXED) */}
                    <IconPicker
                      value={step.icon}
                      onChange={(val) =>
                        updateStep(i, "icon", val)
                      }
                    />

                    {/* TITLE */}
                    <input
                      placeholder="Step Title"
                      value={step.title}
                      onChange={(e) =>
                        updateStep(i, "title", e.target.value)
                      }
                      className="flex-1 h-10 px-3 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                    />

                    {/* DELETE */}
                    <button
                      onClick={() => removeStep(i)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition"
                    >
                      <FaTrash className="text-red-500 text-sm" />
                    </button>
                  </div>

                  {/* DESCRIPTION */}
                  <textarea
                    placeholder="Step Description"
                    value={step.description}
                    onChange={(e) =>
                      updateStep(i, "description", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                  />

                  {/* DRAG ICON */}
                  <div className="flex justify-end">
                    <FaGripLines className="text-gray-300 cursor-grab" />
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={addStep}
        className="w-full px-5 py-3 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition"
      >
        + Add Step
      </button>
    </div>
  );
}