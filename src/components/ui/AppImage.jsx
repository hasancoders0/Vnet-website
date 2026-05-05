import Image from "next/image";

export default function AppImage({
  src,
  alt = "",
  fill = false,
  width,
  height,
  priority = false,
  className = "",
  sizes,
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      priority={priority}
      sizes={
        sizes ||
        (fill
          ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          : undefined)
      }
      placeholder="blur"
      blurDataURL="/website-components/placeholder.png"
      className={`object-cover ${className}`}
    />
  );
}