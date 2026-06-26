import AppImage from "@/components/ui/AppImage";

export default function CommonBackground({
  children,
  className = "",
  image = true,
  overlay = false,
  priority = false,
  imageSrc = "/website-components/common-bg.jpg",
}) {
  return (
    <section
      className={`relative overflow-hidden ${className}`}
    >
      {/* Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

      {/* Desktop Background */}
      {image && (
        <div className="absolute inset-0 hidden md:block">
          <AppImage
            src={imageSrc}
            alt=""
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-slate-950/60" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}