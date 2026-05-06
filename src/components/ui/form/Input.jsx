"use client";

import { cn } from "@/utils/cn";

export default function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  className,
  disabled = false,
}) {
  return (
    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        "w-full px-3 py-2 rounded-xl",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10",
        "text-sm text-white",
        "placeholder:text-white/40",
        "focus:outline-none focus:ring-2 focus:ring-primary/40",
        "transition",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    />
  );
}