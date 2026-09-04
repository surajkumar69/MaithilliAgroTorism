'use client';

import React from 'react';
import { CldVideoPlayer } from 'next-cloudinary';
import { cn } from '@/lib/utils';
import 'next-cloudinary/dist/cld-video-player.css';

interface VideoFrameProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export function VideoFrame({
  src,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
}: VideoFrameProps) {
  if (!src) return null;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <CldVideoPlayer
        src={src}
        autoPlay={autoPlay ? 'always' : false}
        loop={loop}
        muted={muted}
        controls={controls}
        fluid
        className="object-cover w-full h-full"
      />
    </div>
  );
}
