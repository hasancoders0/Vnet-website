"use client";

import { cn } from "@/utils/cn";

export default function Input({
  type = "text",
  value,
  onChange,
  onKeyDown,
  onBlur,
  placeholder,
  className,
  disabled = false,
  error = false,
  ...props
}) {
  return (
    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        "w-full h-11 px-4 rounded-lg",
        "bg-white",
        "text-sm text-gray-800",
        "placeholder:text-gray-400",
        "outline-none transition",

        // Normal
        !error && "border border-gray-300 focus:ring-2 focus:ring-purple-500",

        // Error
        error && "border border-red-400 focus:ring-2 focus:ring-red-200",

        // Disabled
        disabled && "opacity-50 cursor-not-allowed",

        className,
      )}
      {...props}
    />
  );
}
