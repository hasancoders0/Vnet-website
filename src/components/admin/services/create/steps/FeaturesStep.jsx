"use client";

import * as FaIcons from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import IconPicker from "@/components/ui/IconPicker";
import FormField from "@/components/ui/form/FormField";
import Input from "@/components/ui/form/Input";

export default function FeaturesStep({
  data,
  setData,
  errors = {}, // ✅ NEW
}) {
  const features = data.features || [];

  // ================= ADD =================
  const addFeature = () => {
    setData((prev) => ({
      ...prev,
      features: [
        ...(prev.features || []),
        { label: "", icon: "FaStar" },
      ],
    }));
  };

  // ================= REMOVE =================
  const removeFeature = (index) => {
    setData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // ================= UPDATE =================
  const updateFeature = (index, key, value) => {
    setData((prev) => {
      const updated = [...(prev.features || [])];

      updated[index] = {
        ...updated[index],
        [key]: value,
      };

      return {
        ...prev,
        features: updated,
      };
    });
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

      {/* GLOBAL ERROR */}
      {errors?.features && (
        <p className="text-sm text-red-500">
          {errors.features}
        </p>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {features.map((feature, i) => {
          const Icon = FaIcons[feature.icon] || FaIcons.FaStar;
          const fieldError = errors[`features.${i}.label`];

          return (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-4"
            >
              <div className="flex flex-col md:flex-row items-center gap-4">

                {/* ICON */}
                <IconPicker
                  value={feature.icon}
                  onChange={(val) =>
                    updateFeature(i, "icon", val)
                  }
                />

                {/* LABEL */}
                <div className="flex-1 w-full">
                  <FormField
                    label="Feature Name"
                    required
                    error={fieldError}
                  >
                    <Input
                      placeholder="e.g. Fast Delivery"
                      value={feature.label}
                      onChange={(e) =>
                        updateFeature(
                          i,
                          "label",
                          e.target.value
                        )
                      }
                      error={fieldError}
                    />
                  </FormField>
                </div>

                {/* DELETE */}
                <button
                  type="button"
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

      {/* EMPTY STATE */}
      {features.length === 0 && (
        <div className="text-sm text-gray-400 text-center py-6 border border-dashed rounded-lg">
          No features added yet
        </div>
      )}

      {/* ADD BUTTON */}
      <button
        type="button"
        onClick={addFeature}
        className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 transition"
      >
        + Add Feature
      </button>
    </div>
  );
}