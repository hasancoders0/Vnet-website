"use client";

import * as FaIcons from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

// ✅ GLOBAL ICON PICKER
import IconPicker from "@/components/ui/IconPicker";

export default function FeaturesStep({ data, setData }) {
  const features = data.features || [];

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
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition p-4"
            >
              <div className="flex flex-col md:flex-row items-center gap-4">
                {/* ✅ ONLY ICON PICKER (NO EXTRA ICON) */}
                <IconPicker
                  value={feature.icon}
                  onChange={(val) => updateFeature(i, "icon", val)}
                />

                {/* LABEL */}
                <input
                  placeholder="Feature name (e.g. Fast Delivery)"
                  value={feature.label}
                  onChange={(e) => updateFeature(i, "label", e.target.value)}
                  className="flex-1 h-11 px-4 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                />

                {/* DELETE */}
                <button
                  onClick={() => removeFeature(i)}
                  className="p-2.5 rounded-lg bg-red-50 hover:bg-red-100 transition"
                >
                  <FaTrash className="text-red-500 text-sm" />
                </button>
              </div>
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
