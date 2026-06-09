"use client";

import { iconMap } from "@/lib/iconMap";

export default function Icon({ name, className = "" }) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return <span className="text-red-500 text-xs">Icon not found</span>;
  }

  return <IconComponent className={className} />;
}