'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Compass, Calendar, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { SECTION_IMAGES } from '@/lib/data';
import { CurveDivider } from '../ui/CurveDivider';
import { VideoFrame } from '../ui/VideoFrame';
import { MediaFrame } from '../ui/MediaFrame';

interface HeroProps {
  settings: any;
  onOpenBooking: () => void;
  image: string;
}

export function Hero({ settings, onOpenBooking, image }: HeroProps) {
  return (
    <section className="relative bg-forest-950 text-white min-h-[90vh] flex flex-col justify-between overflow-hidden">
      {/* Background Scenic Hero Image with Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        {settings.heroMediaId ? (
          <VideoFrame src={settings.heroMediaId} className="w-full h-full opacity-40 scale-105" />
        ) : (
          <Image
            src={image || SECTION_IMAGES.hero}
            alt={settings.businessName || "Resort"}
            fill
            priority
            className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16 z-10 my-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Small Label */}
            <div className="inline-flex items-center space-x-2 bg-forest-900/80 border border-accent-gold/40 px-4 py-1.5 rounded-full backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-accent-gold" />
              <span className="text-xs font-semibold tracking-widest text-accent-gold uppercase">
                ESCAPE INTO NATURE
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              {settings.heroTitle || 'Stay Close to Nature.'}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-earth-200 max-w-xl leading-relaxed font-light">
              {settings.heroSubtitle || 'Discover a peaceful agro tourism getaway surrounded by beautiful Sahyadri mountain landscapes, thrilling outdoor experiences, crystal swimming pool, and unforgettable family moments.'}
            </p>

            {/* Buttons & Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="bg-accent-leaf hover:bg-forest-500 text-forest-950 font-bold px-8 py-4 rounded-full text-base transition-all duration-300 shadow-xl hover:shadow-glow flex items-center justify-center space-x-3 group"
              >
                <Calendar className="w-5 h-5 text-forest-950 group-hover:scale-110 transition-transform" />
                <span>Book Your Stay</span>
              </button>

              <Link
                href="/experiences"
                className="bg-forest-900/90 hover:bg-forest-800 text-earth-100 font-semibold px-7 py-4 rounded-full text-base border border-forest-700 transition-colors flex items-center justify-center space-x-2 backdrop-blur-sm"
              >
                <Compass className="w-5 h-5 text-accent-gold" />
                <span>Explore Our Experiences</span>
              </Link>
            </div>

            {/* Direct Contact Bar */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-earth-300 border-t border-forest-800/60">
              <a
                href={`tel:${settings.phone || '9156374545'}`}
                className="flex items-center space-x-2 hover:text-accent-gold transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-forest-900 border border-forest-800 flex items-center justify-center text-accent-leaf">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[10px] text-earth-400 uppercase">Call Reception</span>
                  <span className="font-semibold text-white">+91 {settings.phone || '9156374545'}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${settings.whatsappNumber || '9156374545'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-accent-leaf transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[10px] text-earth-400 uppercase">WhatsApp Inquiry</span>
                  <span className="font-semibold text-white">+91 {settings.whatsappNumber || '9156374545'}</span>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column Visual Card Feature */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative mx-auto max-w-lg rounded-3xl overflow-hidden shadow-2xl border-4 border-forest-800/80 bg-forest-900 group">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/private-cottage-night.jpeg"
                  alt="Maithili Agro Private Countryside Cottages Night View"
                  fill
                  sizes="(max-width: 1200px) 100vw, 500px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
              </div>
              <div className="p-6 bg-forest-950/95 border-t border-forest-800/80">
                <span className="text-xs font-semibold text-accent-gold tracking-widest uppercase">
                  ESTATE HIGHLIGHT
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">
                  Private Countryside Cottages
                </h3>
                <p className="text-xs text-earth-300 mt-1 leading-relaxed">
                  Nestled in calm green surroundings with warm night lighting, fresh morning air, and Sahyadri mountain views.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Organic Curved Visual Transition to Next Section */}
      <CurveDivider fillColor="#faf8f5" />
    </section>
  );
};
