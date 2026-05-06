"use client";

import { useMemo, useState } from "react";

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function useSlug(initialTitle = "", initialSlug = "") {
  const [title, setTitle] = useState(initialTitle);
  const [manualSlug, setManualSlug] = useState(initialSlug);
  const [manual, setManual] = useState(!!initialSlug);

  // ✅ derive auto slug instead of setting it in useEffect
  const autoSlug = useMemo(() => slugify(title), [title]);

  const slug = manual ? manualSlug : autoSlug;

  const setSlug = (value) => {
    setManual(true);
    setManualSlug(slugify(value));
  };

  const resetSlug = () => {
    setManual(false);
    setManualSlug("");
  };

  return {
    title,
    setTitle,
    slug,          // always correct (auto or manual)
    setSlug,       // manual override
    resetSlug,     // go back to auto
    manual,
  };
}