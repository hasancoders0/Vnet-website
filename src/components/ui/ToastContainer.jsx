"use client";

import { useToast } from "@/hooks/useToast";

export default function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-5 right-5 z-50 space-y-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-xl shadow-lg text-sm text-white flex items-center justify-between gap-3 animate-slide-in
          ${
            t.type === "success"
              ? "bg-green-500"
              : t.type === "error"
              ? "bg-red-500"
              : "bg-gray-800"
          }`}
        >
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}