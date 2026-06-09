"use client";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 ease-out";

  // ✅ SIZES
  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2.5",
    lg: "text-sm px-6 py-3",
  };

  // ✅ VARIANTS
  const variants = {
    primary:
      "relative text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-md hover:shadow-xl hover:-translate-y-[1px] active:scale-[0.98]",

    outline:
      "border border-gray-300 text-gray-900 bg-white hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50",

    ghost:
      "text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        ${base}
        ${sizes[size]}
        ${variants[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      {...props}
    >
      {/* LEFT ICON */}
      {leftIcon && !loading && (
        <span className="text-sm">{leftIcon}</span>
      )}

      {/* LOADING SPINNER */}
      {loading && (
        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      )}

      {/* TEXT */}
      {!loading && <span>{children}</span>}

      {/* RIGHT ICON */}
      {rightIcon && !loading && (
        <span className="text-sm">{rightIcon}</span>
      )}
    </button>
  );
}