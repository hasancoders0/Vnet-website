"use client";

import { useState } from "react";
import Stepper from "./Stepper";

import BasicInfoStep from "./steps/BasicInfoStep";
import FeaturesStep from "./steps/FeaturesStep";
import WhatYouGetStep from "./steps/WhatYouGetStep";
import PricingStep from "./steps/PricingStep";
import ProcessStep from "./steps/ProcessStep";
import FAQStep from "./steps/FAQStep";
import ReviewStep from "./steps/ReviewStep";

import { toast } from "@/hooks/useToast";

// 🔥 SLUG GENERATOR
const generateSlug = (text) =>
  text
    ?.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function CreateServiceWizard() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    subtitle: "",
    shortDescription: "",
    fullDescription: "",
    badge: "",

    imageType: "url",
    heroImage: "",

    metaTitle: "",
    metaDescription: "",

    tags: [],

    features: [],
    whatYouGet: [],
    pricing: [],
    process: [],
    faq: [],
  });

  const steps = [
    "Basic Info",
    "Features",
    "What You Get",
    "Pricing",
    "Process",
    "FAQ",
    "Review",
  ];

  // ✅ SAFE UPDATE HANDLER (NO LOOP)
  const updateFormData = (updater) => {
    setFormData((prev) => {
      const updated =
        typeof updater === "function"
          ? updater(prev)
          : { ...prev, ...updater };

      // 🔥 Prevent unnecessary slug updates
      if (autoSlug && updated.title) {
        const newSlug = generateSlug(updated.title);
        if (updated.slug !== newSlug) {
          updated.slug = newSlug;
        }
      }

      return updated;
    });
  };

  const next = () => {
    if (step < steps.length - 1) {
      setStep((p) => p + 1);
    }
  };

  const prev = () => {
    if (step > 0) {
      setStep((p) => p - 1);
    }
  };

  const validateStep = () => {
    if (step === 0 && !formData.title) {
      toast("Title is required", "error");
      return false;
    }
    return true;
  };

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed");
      }

      toast("Service created successfully", "success");

      // OPTIONAL RESET
      // setFormData(initialState);

    } catch (err) {
      toast(err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (step === steps.length - 1) {
      handleSubmit();
    } else {
      next();
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-sm">

      {/* HEADER */}
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Create New Service
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Build your service step-by-step
        </p>

        <div className="mt-6">
          <Stepper steps={steps} current={step} />
        </div>
      </div>

      {/* BODY */}
      <div className="p-6 min-h-[420px]">

        {step === 0 && (
          <BasicInfoStep
            data={formData}
            setData={updateFormData}
            autoSlug={autoSlug}
            setAutoSlug={setAutoSlug}
          />
        )}

        {step === 1 && (
          <FeaturesStep data={formData} setData={updateFormData} />
        )}

        {step === 2 && (
          <WhatYouGetStep data={formData} setData={updateFormData} />
        )}

        {step === 3 && (
          <PricingStep data={formData} setData={updateFormData} />
        )}

        {step === 4 && (
          <ProcessStep data={formData} setData={updateFormData} />
        )}

        {step === 5 && (
          <FAQStep data={formData} setData={updateFormData} />
        )}

        {step === 6 && <ReviewStep data={formData} />}
      </div>

      {/* FOOTER */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border-t bg-gray-50/50">

        <button
          onClick={prev}
          disabled={step === 0 || loading}
          className="px-5 py-2.5 rounded-lg border text-sm disabled:opacity-50"
        >
          Back
        </button>

        <p className="text-sm text-gray-500">
          Step {step + 1} of {steps.length}
        </p>

        <button
          onClick={handleNext}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}

          {step === steps.length - 1
            ? loading
              ? "Publishing..."
              : "Publish Service"
            : "Next"}
        </button>
      </div>
    </div>
  );
}