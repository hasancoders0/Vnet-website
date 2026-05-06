export function validateStep(step, data) {
  const errors = {};

  // ================= BASIC =================
  if (step === 0) {
    if (!data.title) errors.title = "Title is required";
    if (!data.category) errors.category = "Category is required";
    if (!data.featuredImage)
      errors.featuredImage = "Featured image is required";
  }

  // ================= FEATURES =================
  if (step === 1) {
    if (!data.features || data.features.length === 0) {
      errors.features = "At least one feature required";
    }
  }

  // ================= WHAT YOU GET =================
  if (step === 2) {
    if (!data.whatYouGet || data.whatYouGet.length === 0) {
      errors.whatYouGet = "Add at least one benefit";
    }
  }

  // ================= PRICING =================
  if (step === 3) {
    if (!data.pricing || data.pricing.length === 0) {
      errors.pricing = "At least one pricing plan required";
    } else {
      data.pricing.forEach((plan, i) => {
        if (!plan.title)
          errors[`pricing.${i}.title`] = "Plan name required";

        if (!plan.price && plan.price !== 0)
          errors[`pricing.${i}.price`] = "Price required";

        if (!plan.deliveryTime)
          errors[`pricing.${i}.delivery`] =
            "Delivery time required";
      });
    }
  }

  // ================= PROCESS =================
  if (step === 4) {
    if (!data.process || data.process.length === 0) {
      errors.process = "Add at least one step";
    }
  }

  // ================= FAQ =================
  if (step === 5) {
    data.faq?.forEach((f, i) => {
      if (!f.question)
        errors[`faq.${i}.question`] = "Question required";

      if (!f.answer)
        errors[`faq.${i}.answer`] = "Answer required";
    });
  }

  return errors;
}

// ================= FINAL VALIDATION =================
export function validateAll(data) {
  let errors = {};

  for (let i = 0; i <= 6; i++) {
    const stepErrors = validateStep(i, data);
    errors = { ...errors, ...stepErrors };
  }

  return errors;
}