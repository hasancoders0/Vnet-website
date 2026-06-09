"use client";

import { useEffect, useState } from "react";

let listeners = [];

export function useToast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    listeners.push(setToasts);

    return () => {
      listeners = listeners.filter((l) => l !== setToasts);
    };
  }, []);

  return { toasts };
}

// 🔥 GLOBAL TRIGGER
export const toast = (message, type = "success") => {
  const newToast = {
    id: Date.now(),
    message,
    type,
  };

  listeners.forEach((set) => {
    set((prev) => [...prev, newToast]);
  });

  setTimeout(() => {
    listeners.forEach((set) => {
      set((prev) => prev.filter((t) => t.id !== newToast.id));
    });
  }, 3000);
};