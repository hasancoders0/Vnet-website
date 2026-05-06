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
        "w-full px-3 py-2 rounded-xl",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10",
        "text-sm text-white",
        "focus:outline-none focus:ring-2 focus:ring-primary/40",
        "transition",
        className
      )}
    >
      <option value="" className="bg-black">
        {placeholder}
      </option>

      {options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          className="bg-black"
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
}