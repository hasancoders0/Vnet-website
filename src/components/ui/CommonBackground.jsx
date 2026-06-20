import AppImage from "@/components/ui/AppImage";

export default function CommonBackground({
  children,
  className = "",
  image = true,
  overlay = false, // default OFF
  imageSrc = "/website-components/common-bg.jpg",
}) {
  return (
    <section
      className={`relative overflow-hidden ${className}`}
    >
      {/* Fallback Background (visible while image loads) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

      {/* Background Image */}
      {image && (
        <div className="absolute inset-0">
          <AppImage
            src={imageSrc}
            alt="Background"
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Optional Overlay */}
      {image && overlay && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/85 to-blue-950/80" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}