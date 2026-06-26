import Image from "next/image";

export default function AppImage({
  src,
  alt = "",
  fill = false,
  width,
  height,
  priority = false,
  quality = 75,
  loading,
  className = "",
  sizes = "100vw",
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      priority={priority}
      quality={quality}
      loading={priority ? undefined : loading}
      sizes={sizes}
      className={`object-cover ${className}`}
    />
  );
}