import React, { useState, useEffect } from 'react';
import { Wrench } from 'lucide-react';
import { resolveImageSrc, IMAGES } from '../assets/imageRegistry';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  fallbackTitle?: string;
  fallbackSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackTitle,
  fallbackSrc = IMAGES.showroomBoutique,
  className = '',
  ...rest
}) => {
  const resolved = resolveImageSrc(src, fallbackSrc);
  const [imgSrc, setImgSrc] = useState(resolved);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setImgSrc(resolveImageSrc(src, fallbackSrc));
    setFailed(false);
  }, [src, fallbackSrc]);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-slate-300 p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Wrench className="w-8 h-8 text-[#D97706] mb-2 opacity-80" />
        <span className="text-xs font-medium text-slate-300 line-clamp-2 max-w-[200px]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      className={className}
      onError={() => {
        if (imgSrc !== fallbackSrc && fallbackSrc) {
          setImgSrc(fallbackSrc);
        } else {
          setFailed(true);
        }
      }}
      {...rest}
    />
  );
};
