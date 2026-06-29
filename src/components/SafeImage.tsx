import { useState, type ImgHTMLAttributes } from "react";
import { ImageIcon } from "lucide-react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackLabel?: string;
};

/** Image with a graceful brown gradient fallback when src fails to load. */
export function SafeImage({ fallbackLabel, className = "", alt = "", ...rest }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed || !rest.src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-[#d6b896] to-[#7a4a25] text-white/90 ${className}`}
        aria-label={alt}
      >
        {fallbackLabel ? (
          <span className="px-2 text-center text-xs font-semibold">{fallbackLabel}</span>
        ) : (
          <ImageIcon className="size-5 opacity-80" />
        )}
      </div>
    );
  }
  return <img {...rest} alt={alt} className={className} onError={() => setFailed(true)} />;
}
