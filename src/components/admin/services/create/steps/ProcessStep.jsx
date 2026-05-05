"use client";

import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { FaTrash, FaGripLines, FaSearch } from "react-icons/fa";

const iconKeys = Object.keys(FaIcons).slice(0, 300);

export default function ProcessStep({ data, setData }) {
  const steps = data.process || [];

  const [activePicker, setActivePicker] = useState(null);
  const [search, setSearch] = useState("");

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

  const filteredIcons = iconKeys.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase())
  );

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

      {/* EMPTY STATE */}
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

                {/* STEP NUMBER */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </div>

                {i !== steps.length - 1 && (
                  <div className="w-[2px] flex-1 bg-gray-200 mt-2" />
                )}
              </div>

              {/* CARD */}
              <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">

                <div className="flex flex-col gap-4">

                  {/* TOP ROW */}
                  <div className="flex items-center gap-3">

                    {/* ICON PICKER BUTTON */}
                    <button
                      onClick={() =>
                        setActivePicker(i === activePicker ? null : i)
                      }
                      className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <Icon className="text-purple-600" />
                    </button>

                    {/* TITLE */}
                    <input
                      placeholder="Step Title"
                      value={step.title}
                      onChange={(e) =>
                        updateStep(i, "title", e.target.value)
                      }
                      className="flex-1 h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                    />

                    {/* DELETE */}
                    <button
                      onClick={() => removeStep(i)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100"
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
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                  />

                  {/* ICON PICKER PANEL */}
                  {activePicker === i && (
                    <div className="border rounded-xl p-4 bg-gray-50">

                      {/* SEARCH */}
                      <div className="flex items-center gap-2 mb-3">
                        <FaSearch className="text-gray-400" />
                        <input
                          placeholder="Search icon..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="flex-1 bg-transparent outline-none text-sm"
                        />
                      </div>

                      {/* ICON GRID */}
                      <div className="grid grid-cols-6 md:grid-cols-8 gap-3 max-h-[200px] overflow-y-auto">
                        {filteredIcons.map((iconName) => {
                          const I = FaIcons[iconName];

                          return (
                            <button
                              key={iconName}
                              onClick={() => {
                                updateStep(i, "icon", iconName);
                                setActivePicker(null);
                              }}
                              className={`p-2 rounded-lg border flex items-center justify-center
                              ${
                                step.icon === iconName
                                  ? "bg-purple-100 border-purple-400"
                                  : "bg-white hover:bg-gray-100"
                              }`}
                            >
                              <I className="text-sm" />
                            </button>
                          );
                        })}
                      </div>

                    </div>
                  )}

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