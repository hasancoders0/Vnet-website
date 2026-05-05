"use client";

import { FaCheck, FaTrash, FaStar, FaPlus } from "react-icons/fa";

const PLAN_NAMES = ["Basic", "Standard", "Premium"];

export default function PricingStep({ data, setData }) {
  const plans = data.pricing || [];

  // ➕ ADD PLAN (MAX 3)
  const addPlan = () => {
    if (plans.length >= 3) return;

    const newIndex = plans.length;

    setData({
      ...data,
      pricing: [
        ...plans,
        {
          name: PLAN_NAMES[newIndex] || "",
          price: "",
          description: "",
          features: [""],
          highlighted: newIndex === 1, // default middle plan highlight
        },
      ],
    });
  };

  const removePlan = (index) => {
    const updated = plans.filter((_, i) => i !== index);

    // reassign names
    const renamed = updated.map((p, i) => ({
      ...p,
      name: PLAN_NAMES[i] || p.name,
    }));

    setData({ ...data, pricing: renamed });
  };

  const updatePlan = (index, key, value) => {
    const updated = [...plans];
    updated[index][key] = value;
    setData({ ...data, pricing: updated });
  };

  const addFeature = (planIndex) => {
    const updated = [...plans];
    updated[planIndex].features.push("");
    setData({ ...data, pricing: updated });
  };

  const removeFeature = (planIndex, featureIndex) => {
    const updated = [...plans];
    updated[planIndex].features = updated[planIndex].features.filter(
      (_, i) => i !== featureIndex
    );
    setData({ ...data, pricing: updated });
  };

  const updateFeature = (planIndex, featureIndex, value) => {
    const updated = [...plans];
    updated[planIndex].features[featureIndex] = value;
    setData({ ...data, pricing: updated });
  };

  const setHighlight = (index) => {
    const updated = plans.map((p, i) => ({
      ...p,
      highlighted: i === index,
    }));
    setData({ ...data, pricing: updated });
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

      {/* EMPTY STATE */}
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
            className={`relative rounded-2xl border p-5 transition-all shadow-sm
            ${
              plan.highlighted
                ? "border-purple-500 bg-white shadow-lg scale-[1.02]"
                : "border-gray-200 bg-white"
            }`}
          >

            {/* BADGE */}
            {plan.highlighted && (
              <span className="absolute -top-3 right-4 text-xs px-3 py-1 rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600">
                Best Value
              </span>
            )}

            {/* PLAN NAME */}
            <input
              value={plan.name}
              onChange={(e) => updatePlan(i, "name", e.target.value)}
              className="w-full text-lg font-semibold outline-none mb-2 border-b pb-1"
            />

            {/* DESCRIPTION */}
            <input
              placeholder="Short description"
              value={plan.description}
              onChange={(e) =>
                updatePlan(i, "description", e.target.value)
              }
              className="w-full text-sm text-gray-500 outline-none mb-4"
            />

            {/* PRICE */}
            <div className="flex items-center gap-1 mb-4">
              <span className="text-gray-500 text-lg">$</span>
              <input
                type="number"
                placeholder="99"
                value={plan.price}
                onChange={(e) => updatePlan(i, "price", e.target.value)}
                className="w-full text-3xl font-bold outline-none"
              />
            </div>

            {/* FEATURES */}
            <div className="space-y-2 mb-4">
              {plan.features.map((f, fi) => (
                <div key={fi} className="flex items-center gap-2">
                  <FaCheck className="text-green-500 text-xs" />

                  <input
                    value={f}
                    onChange={(e) =>
                      updateFeature(i, fi, e.target.value)
                    }
                    placeholder="Feature"
                    className="flex-1 text-sm outline-none border-b"
                  />

                  <button
                    onClick={() => removeFeature(i, fi)}
                    className="p-1 rounded hover:bg-red-100"
                  >
                    <FaTrash className="text-red-400 text-xs" />
                  </button>
                </div>
              ))}
            </div>

            {/* ADD FEATURE */}
            <button
              onClick={() => addFeature(i)}
              className="text-xs text-purple-600 hover:underline mb-4"
            >
              + Add Feature
            </button>

            {/* ACTIONS */}
            <div className="flex justify-between items-center pt-3 border-t">

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
                className="text-red-400 text-xs hover:underline"
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