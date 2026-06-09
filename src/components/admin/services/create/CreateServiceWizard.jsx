"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import Stepper from "@/components/ui/Stepper";
import CommonSeoStep from "@/components/ui/CommonSeoStep";

import BasicInfoStep from "./steps/BasicInfoStep";
import FeaturesStep from "./steps/FeaturesStep";
import WhatYouGetStep from "./steps/WhatYouGetStep";
import PricingStep from "./steps/PricingStep";
import ProcessStep from "./steps/ProcessStep";
import FAQStep from "./steps/FAQStep";
import ReviewStep from "./steps/ReviewStep";

import { toast } from "@/hooks/useToast";
import { validateStep, validateAll } from "@/lib/validateService";

import { FaArrowLeft, FaArrowRight, FaRocket } from "react-icons/fa";

// ================= SLUG =================
const generateSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// ================= STORAGE =================
const STORAGE_KEY = "service_draft";

// ================= SAFE STORAGE =================
const safeStorage = {
  get: (key) => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  },
  remove: (key) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
};

// ================= DEFAULT =================
const defaultData = {
  title: "",
  subtitle: "",
  fullDescription: "",
  badge: "",
  featuredImage: "",
  tags: [],
  category: "",
  features: [],
  whatYouGet: {
    description: "",
    items: [],
  },
  pricing: [],
  process: [],
  faq: [],
  seo: {
    slug: "",
    metaTitle: "",
    metaDescription: "",
    metaImage: "",
    focusKeyword: "",
    score: 0,
  },
};

export default function CreateServiceWizard({
  initialData = null,
  mode = "create",
}) {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(defaultData);

  // ================= FIXED LOAD DATA =================
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    let nextData = null;

    // CREATE MODE → localStorage
    if (mode === "create") {
      const saved = safeStorage.get(STORAGE_KEY);

      if (saved) {
        try {
          nextData = JSON.parse(saved);
        } catch {
          safeStorage.remove(STORAGE_KEY);
        }
      }
    }

    // EDIT MODE
    if (!nextData && initialData) {
      nextData = {
        ...defaultData,
        ...initialData,
        category: initialData.category?._id || initialData.category || "",
        whatYouGet: {
          description: initialData.whatYouGet?.description || "",
          items: initialData.whatYouGet?.items || [],
        },
        seo: {
          slug: initialData.slug || "",
          metaTitle: initialData.metaTitle || "",
          metaDescription: initialData.metaDescription || "",
          metaImage: initialData.metaImage || "",
          focusKeyword: initialData.focusKeyword || "",
          score: initialData.score || 0,
        },
      };
    }

    if (nextData) {
      // prevent React warning
      setTimeout(() => {
        setFormData(nextData);
      }, 0);
    }
  }, [initialData, mode]);

  // ================= AUTO SAVE =================
  useEffect(() => {
    if (mode === "create") {
      safeStorage.set(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, mode]);

  // ================= UPDATE =================
  const updateFormData = useCallback(
    (updater) => {
      setFormData((prev) => {
        let next =
          typeof updater === "function"
            ? updater(prev)
            : { ...prev, ...updater };

        next = {
          ...prev,
          ...next,
          seo: {
            ...prev.seo,
            ...(next.seo || {}),
          },
          features: next.features || [],
          whatYouGet: {
            description: next.whatYouGet?.description || "",
            items: next.whatYouGet?.items || [],
          },
          pricing: next.pricing || [],
          process: next.process || [],
          faq: next.faq || [],
          tags: next.tags || [],
        };

        // AUTO SLUG
        if (autoSlug && next.title) {
          const newSlug = generateSlug(next.title);
          if (next.seo.slug !== newSlug) {
            next.seo.slug = newSlug;
          }
        }

        return next;
      });
    },
    [autoSlug],
  );

  // ================= STEPS =================
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

      if (!formData.seo?.slug) {
        toast("Slug is required", "error");
        return;
      }

      const query = new URLSearchParams({
        slug: formData.seo.slug,
        ...(formData._id && { id: formData._id }),
      });

      const slugRes = await fetch(`/api/services?${query}`);
      const slugData = await slugRes.json();

      if (!slugData.available) {
        toast("Slug already exists", "error");
        return;
      }

      const endpoint =
        mode === "edit" ? `/api/services/${formData._id}` : `/api/services`;

      const method = mode === "edit" ? "PUT" : "POST";

      const payload = {
        ...formData,
        slug: formData.seo.slug,
        metaTitle: formData.seo.metaTitle,
        metaDescription: formData.seo.metaDescription,
        metaImage: formData.seo.metaImage,
        focusKeyword: formData.seo.focusKeyword,
        score: formData.seo.score,
      };

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      toast(
        mode === "edit"
          ? "Service updated successfully"
          : "Service created successfully",
        "success",
      );

      safeStorage.remove(STORAGE_KEY);

      setTimeout(() => {
        router.push("/administrator/services");
      }, 600);
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
          {mode === "edit" ? "Edit Service" : "Create New Service"}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {mode === "edit"
            ? "Update your service details"
            : "Build your service step-by-step"}
        </p>

        <div className="mt-6">
          <Stepper steps={steps} current={step} />
        </div>
      </div>

      {/* BODY */}
      <div className="px-6 py-4 min-h-[420px] border-t border-gray-100">
        <div className="mx-auto w-full max-w-7xl py-10">
          {step === 0 && (
            <BasicInfoStep
              data={formData}
              setData={updateFormData}
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
            <FAQStep data={formData} setData={updateFormData} errors={errors} />
          )}

          {step === 6 && (
            <CommonSeoStep
              data={formData}
              setData={updateFormData}
              autoSlug={autoSlug}
              setAutoSlug={setAutoSlug}
              type="service"
              basePath="services"
            />
          )}

          {step === 7 && <ReviewStep data={formData} />}
        </div>
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
              {loading
                ? mode === "edit"
                  ? "Updating..."
                  : "Publishing..."
                : mode === "edit"
                  ? "Update"
                  : "Publish"}
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
