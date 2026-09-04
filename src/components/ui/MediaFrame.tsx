'use client';

import React from 'react';
import { CldImage } from 'next-cloudinary';
import { cn } from '@/lib/utils';

interface MediaFrameProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function MediaFrame({
  src,
  alt,
  width = 800,
  height = 600,
  className,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}: MediaFrameProps) {
  if (!src) {
    return (
      <div className={cn("bg-earth-200 flex items-center justify-center text-forest-500", className)}>
        <span>No image available</span>
      </div>
    );
  }

  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('object-cover', className)}
      sizes={sizes}
      priority={priority}
      crop="fill"
    />
  );
}
