"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import Stepper from "./Stepper";

import BasicInfoStep from "./steps/BasicInfoStep";
import FeaturesStep from "./steps/FeaturesStep";
import WhatYouGetStep from "./steps/WhatYouGetStep";
import PricingStep from "./steps/PricingStep";
import ProcessStep from "./steps/ProcessStep";
import FAQStep from "./steps/FAQStep";
import SeoStep from "./steps/SeoStep";
import ReviewStep from "./steps/ReviewStep";

import { toast } from "@/hooks/useToast";
import { validateStep, validateAll } from "@/lib/validateService";

import {
  FaArrowLeft,
  FaArrowRight,
  FaRocket,
} from "react-icons/fa";

// ================= SLUG =================
const generateSlug = (text) =>
  text
    ?.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function CreateServiceWizard() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    subtitle: "",
    shortDescription: "",
    fullDescription: "",
    badge: "",
    featuredImage: "",
    metaTitle: "",
    metaDescription: "",
    metaImage: "",
    tags: [],
    category: "",
    features: [],
    whatYouGet: [],
    pricing: [],
    process: [],
    faq: [],
  });

  // ================= FIXED: STABLE FUNCTION =================
  const updateFormData = useCallback((updater) => {
    setFormData((prev) => {
      let updated =
        typeof updater === "function"
          ? updater(prev)
          : { ...prev, ...updater };

      // 🔥 SLUG AUTO UPDATE
      if (autoSlug && updated.title) {
        const newSlug = generateSlug(updated.title);

        if (updated.slug !== newSlug) {
          updated = { ...updated, slug: newSlug };
        }
      }

      return updated;
    });
  }, [autoSlug]);

  const steps = [
    "Basic Info",
    "Features",
    "What You Get",
    "Pricing",
    "Process",
    "FAQ",
    "SEO",
    "Review",
  ];

  const next = () => {
    if (step < steps.length - 1) setStep((p) => p + 1);
  };

  const prev = () => {
    if (step > 0) setStep((p) => p - 1);
  };

  // ================= NEXT =================
  const handleNext = () => {
    const stepErrors = validateStep(step, formData);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      toast("Please fix errors before continuing", "error");
      return;
    }

    setErrors({});

    if (step === steps.length - 1) {
      handleSubmit();
    } else {
      next();
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    const allErrors = validateAll(formData);

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      toast("Please complete all required fields", "error");
      return;
    }

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

      if (!res.ok) throw new Error(result.message);

      toast("Service created successfully", "success");

      // ✅ FIXED: REDIRECT
      setTimeout(() => {
        router.push("/administrator/services");
      }, 800);

    } catch (err) {
      toast(err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200/70">

      {/* HEADER */}
      <div className="p-6 pb-4">
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
      <div className="px-6 py-4 min-h-[420px] border-t border-gray-100">

        {step === 0 && (
          <BasicInfoStep
            data={formData}
            setData={updateFormData}
            autoSlug={autoSlug}
            setAutoSlug={setAutoSlug}
            errors={errors}
          />
        )}

        {step === 1 && (
          <FeaturesStep
            data={formData}
            setData={updateFormData}
            errors={errors}
          />
        )}

        {step === 2 && (
          <WhatYouGetStep
            data={formData}
            setData={updateFormData}
            errors={errors}
          />
        )}

        {step === 3 && (
          <PricingStep
            data={formData}
            setData={updateFormData}
            errors={errors}
          />
        )}

        {step === 4 && (
          <ProcessStep
            data={formData}
            setData={updateFormData}
            errors={errors}
          />
        )}

        {step === 5 && (
          <FAQStep
            data={formData}
            setData={updateFormData}
            errors={errors}
          />
        )}

        {step === 6 && (
          <SeoStep
            data={formData}
            setData={updateFormData}
            errors={errors}
          />
        )}

        {step === 7 && <ReviewStep data={formData} />}
      </div>

      {/* FOOTER */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-gray-100 bg-gray-50/60 rounded-b-2xl">

        <button
          onClick={prev}
          disabled={step === 0 || loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
        >
          <FaArrowLeft className="text-xs" />
          Back
        </button>

        <p className="text-sm text-gray-500">
          Step {step + 1} of {steps.length}
        </p>

        <button
          onClick={handleNext}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition disabled:opacity-70"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}

          {step === steps.length - 1 ? (
            <>
              <FaRocket className="text-xs" />
              {loading ? "Publishing..." : "Publish"}
            </>
          ) : (
            <>
              Next
              <FaArrowRight className="text-xs" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}