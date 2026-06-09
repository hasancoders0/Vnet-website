"use client";

import { useEffect, useState } from "react";

export default function useSlugCheck(slug, currentId = null, type = "service") {
  const [status, setStatus] = useState("idle");
  // idle | checking | available | taken

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;

    const run = async () => {
      try {
        // ✅ set checking INSIDE async (no sync update)
        if (isMounted) setStatus("checking");

        const query = new URLSearchParams({
          slug,
          ...(currentId && { id: currentId }),
        });

        const endpoint = type === "blog" ? "/api/blogs" : "/api/services";
        const res = await fetch(`${endpoint}?${query}`);
        const data = await res.json();

        const nextStatus = data.available ? "available" : "taken";

        if (isMounted) setStatus(nextStatus);
      } catch (err) {
        console.error(err);
        if (isMounted) setStatus("idle");
      }
    };

    const timeout = setTimeout(run, 500); // debounce

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [slug, currentId, type]);

  return status;
}
