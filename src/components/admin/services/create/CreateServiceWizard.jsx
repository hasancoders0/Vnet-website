"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import WizardLayout from "@/components/ui/WizardLayout";
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
    <WizardLayout
      title={mode === "edit" ? "Edit Service" : "Create New Service"}
      description={
        mode === "edit"
          ? "Update your service details"
          : "Build your service step-by-step"
      }
      steps={steps}
      currentStep={step}
      loading={loading}
      onPrev={prev}
      onNext={handleNext}
      mode={mode}
      submitText="Publish"
      updateText="Update"
    >
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
        <PricingStep data={formData} setData={updateFormData} errors={errors} />
      )}

      {step === 4 && (
        <ProcessStep data={formData} setData={updateFormData} errors={errors} />
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
    </WizardLayout>
  );
}
