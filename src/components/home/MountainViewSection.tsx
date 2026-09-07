'use client';

import React from 'react';
import Image from 'next/image';
import { Mountain, Calendar, Compass } from 'lucide-react';

interface MountainViewSectionProps {
  onOpenBooking: () => void;
  image?: string;
}

export const MountainViewSection: React.FC<MountainViewSectionProps> = ({ onOpenBooking, image }) => {
  return (
    <section className="relative py-28 bg-forest-950 text-white overflow-hidden">
      {/* Full-width Panoramic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image || "/images/mountain-balcony.jpeg"}
          alt="360 Sahyadri Mountain View"
          fill
          className="object-cover object-center opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/90 to-forest-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center space-x-2 bg-forest-900/90 border border-accent-gold/50 px-5 py-2 rounded-full backdrop-blur-md">
            <Mountain className="w-4 h-4 text-accent-gold" />
            <span className="text-xs font-semibold tracking-widest text-accent-gold uppercase">
              PANORAMIC SAHYADRI VISTAS
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Wake Up to a 360° Mountain View
          </h2>

          <p className="text-base sm:text-lg text-earth-200 font-light leading-relaxed">
            Experience unhindered views of lush Mulshi hills, morning cloud inversions, and starry night skies. Breathe in pure, unpolluted mountain air just an hour drive from Pune.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-accent-leaf hover:bg-forest-500 text-forest-950 font-bold px-8 py-4 rounded-full text-base transition-all shadow-xl hover:shadow-glow flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Reserve Your Mountain View Room</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
