"use client";

import { cn } from "@/utils/cn";

export default function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  className,
  disabled = false,
  error = false, // ✅ NEW
}) {
  return (
    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        "w-full h-11 px-4 rounded-lg",
        "bg-white",
        "text-sm text-gray-800",
        "placeholder:text-gray-400",
        "outline-none transition",

        // ✅ NORMAL
        !error &&
          "border border-gray-300 focus:ring-2 focus:ring-purple-500",

        // ❌ ERROR STATE
        error &&
          "border border-red-400 focus:ring-2 focus:ring-red-200",

        // DISABLED
        disabled && "opacity-50 cursor-not-allowed",

        className
      )}
    />
  );
}