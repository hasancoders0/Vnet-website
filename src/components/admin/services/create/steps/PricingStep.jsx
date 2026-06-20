"use client";

import { FaCheck, FaTrash, FaStar, FaPlus } from "react-icons/fa";
import { useCallback } from "react";

const PLAN_NAMES = ["Basic", "Standard", "Premium"];

export default function PricingStep({ data, setData, errors = {} }) {
  const plans = data.pricing || [];

  // ================= SAFE SET =================
  const updatePricing = useCallback(
    (updater) => {
      setData((prev) => {
        const prevPlans = prev.pricing || [];

        const nextPlans =
          typeof updater === "function" ? updater(prevPlans) : updater;

        return {
          ...prev,
          pricing: nextPlans,
        };
      });
    },
    [setData],
  );

  // ================= ADD PLAN =================
  const addPlan = () => {
    updatePricing((prevPlans) => {
      if (prevPlans.length >= 3) return prevPlans;

      const newIndex = prevPlans.length;

      return [
        ...prevPlans,
        {
          title: PLAN_NAMES[newIndex] || "",
          price: "",
          deliveryTime: "",
          description: "",
          features: [""],
          highlighted: newIndex === 1,
        },
      ];
    });
  };

  // ================= REMOVE =================
  const removePlan = (index) => {
    updatePricing((prevPlans) => {
      const updated = prevPlans.filter((_, i) => i !== index);

      return updated.map((p, i) => ({
        ...p,
        title: PLAN_NAMES[i] || p.title,
      }));
    });
  };

  // ================= UPDATE =================
  const updatePlan = (index, key, value) => {
    updatePricing((prevPlans) =>
      prevPlans.map((plan, i) =>
        i === index ? { ...plan, [key]: value } : plan,
      ),
    );
  };

  // ================= FEATURES =================
  const addFeature = (planIndex) => {
    updatePricing((prevPlans) =>
      prevPlans.map((plan, i) =>
        i === planIndex
          ? {
              ...plan,
              features: [...(plan.features || []), ""],
            }
          : plan,
      ),
    );
  };

  const removeFeature = (planIndex, featureIndex) => {
    updatePricing((prevPlans) =>
      prevPlans.map((plan, i) =>
        i === planIndex
          ? {
              ...plan,
              features: (plan.features || []).filter(
                (_, fi) => fi !== featureIndex,
              ),
            }
          : plan,
      ),
    );
  };

  const updateFeature = (planIndex, featureIndex, value) => {
    updatePricing((prevPlans) =>
      prevPlans.map((plan, i) => {
        if (i !== planIndex) return plan;

        const features = [...(plan.features || [])];

        features[featureIndex] = value;

        // Auto add next feature field
        const isLastField = featureIndex === features.length - 1;

        if (isLastField && value.trim() !== "") {
          features.push("");
        }

        return {
          ...plan,
          features,
        };
      }),
    );
  };

  // ================= HIGHLIGHT =================
  const setHighlight = (index) => {
    updatePricing((prevPlans) =>
      prevPlans.map((plan, i) => ({
        ...plan,
        highlighted: i === index,
      })),
    );
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Pricing Plans</h3>
        <p className="text-sm text-gray-500">Create up to 3 pricing plans</p>
      </div>

      {/* GLOBAL ERROR */}
      {errors?.pricing && (
        <p className="text-sm text-red-500">{errors.pricing}</p>
      )}

      {/* EMPTY */}
      {plans.length === 0 && (
        <div className="border border-dashed rounded-xl p-10 text-center bg-gray-50">
          <p className="text-sm text-gray-400">No plans created yet</p>
          <p className="text-xs text-gray-300 mt-1">
            Add your first pricing plan
          </p>
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative rounded-2xl border p-6 transition
            ${
              plan.highlighted
                ? "border-purple-500 bg-white shadow-md scale-[1.02]"
                : "border-gray-200 bg-white hover:shadow-sm"
            }`}
          >
            {/* BADGE */}
            {plan.highlighted && (
              <span className="absolute -top-3 right-4 text-xs px-3 py-1 rounded-full text-white bg-purple-600 shadow">
                Best Value
              </span>
            )}

            {/* TITLE */}
            <input
              value={plan.title || ""}
              onChange={(e) => updatePlan(i, "title", e.target.value)}
              className="w-full text-lg font-semibold outline-none border-b border-gray-200 pb-1"
            />

            {/* DESCRIPTION */}
            <input
              placeholder="Short description"
              value={plan.description || ""}
              onChange={(e) => updatePlan(i, "description", e.target.value)}
              className="w-full text-sm text-gray-500 mt-2 outline-none"
            />

            {/* PRICE */}
            <div className="flex items-center gap-1 mt-5">
              <span className="text-gray-400 text-lg">$</span>
              <input
                type="number"
                value={plan.price || ""}
                onChange={(e) => updatePlan(i, "price", e.target.value)}
                className="w-full text-3xl font-bold outline-none"
              />
            </div>

            {/* DELIVERY */}
            <input
              placeholder="Delivery time (e.g. 3 days)"
              value={plan.deliveryTime || ""}
              onChange={(e) => updatePlan(i, "deliveryTime", e.target.value)}
              className="w-full mt-4 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none"
            />

            {/* FEATURES */}
            <div className="mt-5 space-y-2">
              {(plan.features || []).map((f, fi) => (
                <div key={fi} className="flex items-center gap-2">
                  <FaCheck className="text-green-500 text-xs" />

                  <input
                    value={f || ""}
                    onChange={(e) => updateFeature(i, fi, e.target.value)}
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

            <button
              onClick={() => addFeature(i)}
              className="text-xs text-purple-600 mt-2"
            >
              + Add Feature
            </button>

            {/* ACTIONS */}
            <div className="flex justify-between items-center pt-5 mt-5 border-t">
              <button
                type="button"
                onClick={() => setHighlight(i)}
                className={`flex items-center gap-2 text-sm ${
                  plan.highlighted ? "text-yellow-500" : "text-gray-500"
                }`}
              >
                <FaStar className="text-xs" />
                Highlight Plan
              </button>

              <button
                type="button"
                onClick={() => removePlan(i)}
                className="
      flex items-center gap-2
      px-3 py-1.5
      rounded-lg
      bg-red-50
      text-red-600
      hover:bg-red-100
      transition
    "
              >
                <FaTrash className="text-xs" />
                Remove Plan
              </button>
            </div>
          </div>
        ))}

        {plans.length < 3 && (
          <button
            type="button"
            onClick={addPlan}
            className="
      rounded-2xl
      border-2 border-dashed border-purple-300
      bg-purple-50/50
      min-h-[420px]
      flex flex-col items-center justify-center
      text-center
      transition-all
      hover:border-purple-500
      hover:bg-purple-50
    "
          >
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <FaPlus className="text-purple-600 text-lg" />
            </div>

            <h4 className="font-semibold text-gray-800">Create New Plan</h4>

            <p className="text-sm text-gray-500 mt-2 max-w-[200px]">
              Add another pricing package for your customers
            </p>
          </button>
        )}
      </div>
    </div>
  );
}
