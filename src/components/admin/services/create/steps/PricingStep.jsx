"use client";

import { FaCheck, FaTrash, FaStar, FaPlus } from "react-icons/fa";

const PLAN_NAMES = ["Basic", "Standard", "Premium"];

export default function PricingStep({
  data,
  setData,
  errors = {}, // ✅ NEW
}) {
  const plans = data.pricing || [];

  // ================= ADD PLAN =================
  const addPlan = () => {
    if (plans.length >= 3) return;

    const newIndex = plans.length;

    setData((prev) => ({
      ...prev,
      pricing: [
        ...(prev.pricing || []),
        {
          title: PLAN_NAMES[newIndex] || "",
          price: "",
          deliveryTime: "",
          description: "",
          features: [""],
          highlighted: newIndex === 1,
        },
      ],
    }));
  };

  // ================= REMOVE PLAN =================
  const removePlan = (index) => {
    setData((prev) => {
      const updated = (prev.pricing || []).filter(
        (_, i) => i !== index
      );

      return {
        ...prev,
        pricing: updated.map((p, i) => ({
          ...p,
          title: PLAN_NAMES[i] || p.title,
        })),
      };
    });
  };

  // ================= UPDATE =================
  const updatePlan = (index, key, value) => {
    setData((prev) => {
      const updated = [...(prev.pricing || [])];

      updated[index] = {
        ...updated[index],
        [key]: value,
      };

      return { ...prev, pricing: updated };
    });
  };

  // ================= FEATURES =================
  const addFeature = (planIndex) => {
    setData((prev) => {
      const updated = [...(prev.pricing || [])];

      updated[planIndex] = {
        ...updated[planIndex],
        features: [
          ...(updated[planIndex].features || []),
          "",
        ],
      };

      return { ...prev, pricing: updated };
    });
  };

  const removeFeature = (planIndex, featureIndex) => {
    setData((prev) => {
      const updated = [...(prev.pricing || [])];

      updated[planIndex] = {
        ...updated[planIndex],
        features: updated[planIndex].features.filter(
          (_, i) => i !== featureIndex
        ),
      };

      return { ...prev, pricing: updated };
    });
  };

  const updateFeature = (planIndex, featureIndex, value) => {
    setData((prev) => {
      const updated = [...(prev.pricing || [])];

      const features = [...(updated[planIndex].features || [])];
      features[featureIndex] = value;

      updated[planIndex] = {
        ...updated[planIndex],
        features,
      };

      return { ...prev, pricing: updated };
    });
  };

  // ================= HIGHLIGHT =================
  const setHighlight = (index) => {
    setData((prev) => ({
      ...prev,
      pricing: (prev.pricing || []).map((p, i) => ({
        ...p,
        highlighted: i === index,
      })),
    }));
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Pricing Plans
        </h3>
        <p className="text-sm text-gray-500">
          Create up to 3 pricing plans
        </p>
      </div>

      {/* GLOBAL ERROR */}
      {errors?.pricing && (
        <p className="text-sm text-red-500">
          {errors.pricing}
        </p>
      )}

      {/* EMPTY */}
      {plans.length === 0 && (
        <div className="border border-dashed rounded-xl p-6 text-center text-sm text-gray-400">
          No plans yet. Add your first pricing plan.
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative rounded-xl border p-5 transition shadow-sm
            ${
              plan.highlighted
                ? "border-purple-500 bg-white shadow-md"
                : "border-gray-200 bg-white"
            }`}
          >
            {/* BADGE */}
            {plan.highlighted && (
              <span className="absolute -top-3 right-4 text-xs px-3 py-1 rounded-full text-white bg-purple-600">
                Best Value
              </span>
            )}

            {/* TITLE */}
            <input
              value={plan.title}
              onChange={(e) =>
                updatePlan(i, "title", e.target.value)
              }
              className={`w-full text-lg font-semibold border-b pb-1 outline-none
              ${
                errors[`pricing.${i}.title`]
                  ? "border-red-400"
                  : "border-gray-200"
              }`}
            />
            {errors[`pricing.${i}.title`] && (
              <p className="text-xs text-red-500 mt-1">
                {errors[`pricing.${i}.title`]}
              </p>
            )}

            {/* DESCRIPTION */}
            <input
              placeholder="Short description"
              value={plan.description}
              onChange={(e) =>
                updatePlan(i, "description", e.target.value)
              }
              className="w-full text-sm text-gray-500 mt-2 outline-none"
            />

            {/* PRICE */}
            <div className="flex items-center gap-1 mt-4">
              <span className="text-gray-500 text-lg">$</span>
              <input
                type="number"
                value={plan.price}
                onChange={(e) =>
                  updatePlan(i, "price", e.target.value)
                }
                className={`w-full text-3xl font-bold outline-none
                ${
                  errors[`pricing.${i}.price`]
                    ? "border-b border-red-400"
                    : ""
                }`}
              />
            </div>
            {errors[`pricing.${i}.price`] && (
              <p className="text-xs text-red-500">
                {errors[`pricing.${i}.price`]}
              </p>
            )}

            {/* DELIVERY */}
            <input
              placeholder="Delivery time"
              value={plan.deliveryTime}
              onChange={(e) =>
                updatePlan(i, "deliveryTime", e.target.value)
              }
              className={`w-full mt-3 px-3 py-2 rounded-lg border text-sm outline-none
              ${
                errors[`pricing.${i}.delivery`]
                  ? "border-red-400"
                  : "border-gray-200"
              }`}
            />
            {errors[`pricing.${i}.delivery`] && (
              <p className="text-xs text-red-500">
                {errors[`pricing.${i}.delivery`]}
              </p>
            )}

            {/* FEATURES */}
            <div className="mt-4 space-y-2">
              {plan.features.map((f, fi) => (
                <div key={fi} className="flex items-center gap-2">
                  <FaCheck className="text-green-500 text-xs" />

                  <input
                    value={f}
                    onChange={(e) =>
                      updateFeature(i, fi, e.target.value)
                    }
                    placeholder="Feature"
                    className="flex-1 text-sm border-b border-gray-200 outline-none"
                  />

                  <button
                    onClick={() => removeFeature(i, fi)}
                    className="p-1 hover:bg-red-100 rounded"
                  >
                    <FaTrash className="text-red-400 text-xs" />
                  </button>
                </div>
              ))}
            </div>

            {/* ADD FEATURE */}
            <button
              onClick={() => addFeature(i)}
              className="text-xs text-purple-600 mt-2"
            >
              + Add Feature
            </button>

            {/* ACTIONS */}
            <div className="flex justify-between items-center pt-4 mt-4 border-t">
              <button
                onClick={() => setHighlight(i)}
                className={`flex items-center gap-1 text-xs ${
                  plan.highlighted
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >
                <FaStar />
                Highlight
              </button>

              <button
                onClick={() => removePlan(i)}
                className="text-red-400 text-xs"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD PLAN */}
      <button
        onClick={addPlan}
        disabled={plans.length >= 3}
        className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border text-sm transition
        ${
          plans.length >= 3
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "border-gray-200 hover:bg-gray-50"
        }`}
      >
        <FaPlus className="text-xs" />
        {plans.length >= 3 ? "Maximum 3 Plans" : "Add Plan"}
      </button>
    </div>
  );
}