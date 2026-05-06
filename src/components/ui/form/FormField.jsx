"use client";

export default function FormField({
  label,
  children,
  error,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-1">
      
      {/* LABEL */}
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* INPUT */}
      {children}

      {/* ERROR */}
      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}