"use client";

import { cn } from "@/utils/cn";

export default function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  className,
  error = false,
}) {
  return (
    <textarea
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={cn(
        "w-full px-4 py-3 rounded-lg",
        "bg-white",
        "text-sm text-gray-800",
        "placeholder:text-gray-400",
        "outline-none transition resize-none",

        !error &&
          "border border-gray-300 focus:ring-2 focus:ring-purple-500",

        error &&
          "border border-red-400 focus:ring-2 focus:ring-red-200",

        className
      )}
    />
  );
}