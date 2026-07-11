export interface LogoProps {
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
}

export function Logo({
  src = '/brand/logo.png',
  width = 160,
  height = 60,
  alt = 'Almaarif',
  className,
}: LogoProps) {
  return (
    <img
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={`object-contain ${className ?? ''}`}
    />
  );
}
