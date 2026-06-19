"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import WizardLayout from "@/components/ui/WizardLayout";
import CommonSeoStep from "@/components/ui/CommonSeoStep";

import BasicInfoStep from "./steps/BasicInfoStep";
import BlogContentStep from "./steps/BlogContentStep";
import ReviewStep from "./steps/ReviewStep";

import { toast } from "@/hooks/useToast";

// ================= HELPERS =================
const generateSlug = (text = "") =>
text
.toLowerCase()
.trim()
.replace(/[^a-z0-9]+/g, "-")
.replace(/(^-|-$)/g, "");

const stripHtml = (html = "") =>
html.replace(/<[^>]*>/g, "");

// ================= DEFAULT =================
const defaultData = {
title: "",
subtitle: "",
shortDescription: "",
featuredImage: "",
category: "",
tags: [],
content: [],

seo: {
slug: "",
metaTitle: "",
metaDescription: "",
metaImage: "",
focusKeyword: "",
score: 0,
},
};

export default function CreateBlogWizard({
initialData = null,
mode = "create",
}) {
const router = useRouter();

const draftKey = "blog-draft-new";

const [step, setStep] = useState(0);
const [loading, setLoading] = useState(false);
const [autoSlug, setAutoSlug] = useState(true);
const [errors, setErrors] = useState({});

// ================= FORM DATA =================
const [formData, setFormData] = useState(() => {
if (initialData) {
return {
...defaultData,
...initialData,

 
    tags: initialData.tags || [],

    category:
      initialData.category?._id ||
      initialData.category ||
      "",

    seo: {
      slug: initialData.slug || "",
      metaTitle:
        initialData.metaTitle || "",
      metaDescription:
        initialData.metaDescription || "",
      metaImage:
        initialData.metaImage || "",
      focusKeyword:
        initialData.focusKeyword || "",
      score:
        initialData.score || 0,
    },
  };
}

return defaultData;
 

});

// ================= SAVE DRAFT =================
useEffect(() => {
if (mode !== "create") return;

 
const timer = setTimeout(() => {
  try {
    localStorage.setItem(
      draftKey,
      JSON.stringify(formData)
    );
  } catch (err) {
    console.warn(
      "Draft save failed",
      err
    );
  }
}, 500);

return () => clearTimeout(timer);
 

}, [formData, mode]);

// ================= CLEAR DRAFT =================
const clearDraft = () => {
try {
localStorage.removeItem(draftKey);
} catch {}
};

// ================= UPDATE =================
const updateFormData = useCallback(
(updater) => {
setFormData((prev) => {
let updated =
typeof updater === "function"
? updater(prev)
: {
...prev,
...updater,
};

 
    if (
      autoSlug &&
      updated.title
    ) {
      const newSlug =
        generateSlug(
          updated.title
        );

      if (
        updated.seo?.slug !==
        newSlug
      ) {
        updated = {
          ...updated,
          seo: {
            ...updated.seo,
            slug: newSlug,
          },
        };
      }
    }

    return updated;
  });
},
[autoSlug]
 

);

// ================= STEPS =================
const steps = [
"Basic Info",
"Content",
"SEO",
"Review",
];

const next = () => {
if (
step <
steps.length - 1
) {
setStep(
(prev) => prev + 1
);
}
};

const prev = () => {
if (step > 0) {
setStep(
(prev) => prev - 1
);
}
};

const handleNext = () => {
if (
step === 0 &&
!formData.title
) {
toast(
"Title is required",
"error"
);
return;
}

 
if (
  step === 2 &&
  !formData.seo?.slug
) {
  toast(
    "Slug is required",
    "error"
  );
  return;
}

if (
  step ===
  steps.length - 1
) {
  handleSubmit();
} else {
  next();
}
 

};

// ================= SEO =================
const generateSeoData = () => {
const seo =
formData.seo || {};


const cleanContent =
  stripHtml(
    formData.content
      ?.map(
        (c) => c.text || ""
      )
      .join(" ")
  );

const metaTitle =
  seo.metaTitle ||
  `${formData.title} | ${
    seo.focusKeyword || ""
  }`;

let metaDescription =
  seo.metaDescription ||
  formData.shortDescription ||
  cleanContent.slice(
    0,
    150
  );

if (
  seo.focusKeyword &&
  !metaDescription
    .toLowerCase()
    .includes(
      seo.focusKeyword.toLowerCase()
    )
) {
  metaDescription += ` Learn more about ${seo.focusKeyword}.`;
}

return {
  metaTitle,
  metaDescription:
    metaDescription.slice(
      0,
      160
    ),
  metaImage:
    seo.metaImage ||
    formData.featuredImage ||
    "",
};
 

};

// ================= SUBMIT =================
const handleSubmit =
async () => {
try {
setLoading(true);

 
    const endpoint =
      mode === "edit"
        ? `/api/blogs/${formData._id}`
        : "/api/blogs";

    const method =
      mode === "edit"
        ? "PUT"
        : "POST";

    const res =
      await fetch(
        endpoint,
        {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...formData,

            slug:
              formData.seo
                .slug,

            metaTitle:
              formData.seo
                .metaTitle,

            metaDescription:
              formData.seo
                .metaDescription,

            metaImage:
              formData.seo
                .metaImage,

            focusKeyword:
              formData.seo
                .focusKeyword,

            tags:
              formData.tags ||
              [],

            status:
              "published",
          }),
        }
      );

    const result =
      await res.json();

    if (!res.ok) {
      throw new Error(
        result.message
      );
    }

    clearDraft();

    toast(
      mode === "edit"
        ? "Blog updated successfully"
        : "Blog created successfully",
      "success"
    );

    router.push(
      "/administrator/blog"
    );
  } catch (err) {
    toast(
      err.message ||
        "Something went wrong",
      "error"
    );
  } finally {
    setLoading(false);
  }
};
 

return (
<WizardLayout
title={
mode === "edit"
? "Edit Blog"
: "Create New Blog"
}
description="Build your blog step-by-step"
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
setData={
updateFormData
}
errors={errors}
/>
)}

 
  {step === 1 && (
    <BlogContentStep
      data={formData}
      setData={
        updateFormData
      }
    />
  )}

  {step === 2 && (
    <CommonSeoStep
      data={formData}
      setData={
        updateFormData
      }
      autoSlug={autoSlug}
      setAutoSlug={
        setAutoSlug
      }
      type="blog"
      basePath="blog"
    />
  )}

  {step === 3 && (
    <ReviewStep
      data={formData}
    />
  )}
</WizardLayout>

);
}
