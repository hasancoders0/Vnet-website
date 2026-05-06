"use client";

export default function FormField({
  label,
  children,
  error,
  hint,
  required = false,
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm text-white/80 flex items-center gap-1">
          {label}
          {required && <span className="text-red-400">*</span>}
        </label>
      )}

      {children}

      {hint && !error && (
        <p className="text-xs text-white/40">{hint}</p>
      )}

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}