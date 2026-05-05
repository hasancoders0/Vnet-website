"use client";

import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { FaTrash, FaSearch } from "react-icons/fa";

const iconKeys = Object.keys(FaIcons).slice(0, 300);

export default function FeaturesStep({ data, setData }) {
  const features = data.features || [];

  const [activePicker, setActivePicker] = useState(null);
  const [search, setSearch] = useState("");

  const addFeature = () => {
    setData({
      ...data,
      features: [...features, { label: "", icon: "FaStar" }],
    });
  };

  const removeFeature = (index) => {
    setData({
      ...data,
      features: features.filter((_, i) => i !== index),
    });
  };

  const updateFeature = (index, key, value) => {
    const updated = [...features];
    updated[index][key] = value;
    setData({ ...data, features: updated });
  };

  const filteredIcons = iconKeys.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Service Features
        </h3>
        <p className="text-sm text-gray-500">
          Highlight key features of your service
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {features.map((feature, i) => {
          const Icon = FaIcons[feature.icon] || FaIcons.FaStar;

          return (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-4 items-center">

                {/* ICON PICKER TRIGGER */}
                <button
                  onClick={() =>
                    setActivePicker(i === activePicker ? null : i)
                  }
                  className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                >
                  <Icon className="text-purple-600" />
                </button>

                {/* LABEL */}
                <input
                  placeholder="Feature name"
                  value={feature.label}
                  onChange={(e) =>
                    updateFeature(i, "label", e.target.value)
                  }
                  className="flex-1 h-11 px-4 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                />

                {/* DELETE */}
                <button
                  onClick={() => removeFeature(i)}
                  className="p-2.5 rounded-lg bg-red-100 hover:bg-red-200"
                >
                  <FaTrash className="text-red-500" />
                </button>
              </div>

              {/* ICON PICKER PANEL */}
              {activePicker === i && (
                <div className="mt-4 border rounded-xl p-4 bg-gray-50">

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
                            updateFeature(i, "icon", iconName);
                            setActivePicker(null);
                          }}
                          className={`p-2 rounded-lg border flex items-center justify-center transition
                          ${
                            feature.icon === iconName
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
            </div>
          );
        })}
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={addFeature}
        className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm hover:bg-gray-100 transition"
      >
        + Add Feature
      </button>
    </div>
  );
}