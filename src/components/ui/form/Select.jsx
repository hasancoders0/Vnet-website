"use client";

import { cn } from "@/utils/cn";

export default function Select({
  value,
  onChange,
  options = [],
  placeholder = "Select option",
  className,
}) {
  return (
    <select
      value={value || ""}
      onChange={onChange}
      className={cn(
        "w-full h-11 px-4 rounded-lg",
        "bg-white",
        "border border-gray-300",
        "text-sm text-gray-800",
        "focus:outline-none focus:ring-2 focus:ring-purple-500",
        "transition",
        className
      )}
    >
      <option value="">{placeholder}</option>

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}