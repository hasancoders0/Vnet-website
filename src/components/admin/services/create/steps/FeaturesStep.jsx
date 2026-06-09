"use client";

import * as FaIcons from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import IconPicker from "@/components/ui/IconPicker";
import FormField from "@/components/ui/form/FormField";
import Input from "@/components/ui/form/Input";

export default function FeaturesStep({
  data,
  setData,
  errors = {},
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
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Service Features
        </h3>
        <p className="text-sm text-gray-500">
          Highlight key features of your service
        </p>
      </div>

      {/* ================= SECTION ================= */}
      <div className="bg-gray-50/60 border border-gray-100 rounded-xl p-6 space-y-6">

        {/* GLOBAL ERROR */}
        {errors?.features && (
          <p className="text-sm text-red-500">
            {errors.features}
          </p>
        )}

        {/* LIST */}
        <div className="space-y-4">
          {features.map((feature, i) => {
            const Icon =
              FaIcons[feature.icon] || FaIcons.FaStar;

            const fieldError =
              errors[`features.${i}.label`];

            const isValid =
              feature.label && !fieldError;

            return (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-xl p-4 transition hover:shadow-sm"
              >
                <div className="flex items-start gap-4">

                  {/* ICON */}
                  <div className="pt-1">
                    <IconPicker
                      value={feature.icon}
                      onChange={(val) =>
                        updateFeature(i, "icon", val)
                      }
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 space-y-2">

                    <FormField
                      label={`Feature ${i + 1}`}
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
                        className={`${
                          fieldError
                            ? "border-red-300 focus:ring-red-500"
                            : ""
                        }`}
                      />
                    </FormField>

                    {/* Success feedback */}
                    {isValid && (
                      <p className="text-xs text-green-600">
                        Looks good ✓
                      </p>
                    )}

                  </div>

                  {/* DELETE */}
                  <button
                    type="button"
                    onClick={() => removeFeature(i)}
                    className="mt-6 p-2 rounded-lg bg-red-50 hover:bg-red-100 transition"
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
          <div className="text-center py-10 border border-dashed rounded-xl bg-white">
            <p className="text-sm text-gray-400">
              No features added yet
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Add features to highlight your service
            </p>
          </div>
        )}

        {/* ADD BUTTON */}
        <div>
          <button
            type="button"
            onClick={addFeature}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-purple-600 text-white hover:opacity-90 transition"
          >
            + Add Feature
          </button>
        </div>

      </div>

    </div>
  );
}