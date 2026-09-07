'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Utensils, Sparkles, ArrowRight, Flame } from 'lucide-react';
import { SECTION_IMAGES } from '@/lib/data';

export const RestaurantSection: React.FC<{ image?: string }> = ({ image }) => {
  return (
    <section className="py-20 bg-earth-50 text-forest-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-earth-200 border border-earth-300 px-4 py-1.5 rounded-full">
              <Utensils className="w-4 h-4 text-forest-700" />
              <span className="text-xs font-semibold tracking-widest text-forest-800 uppercase">
                AUTHENTIC FARM DINING
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950">
              Good Food. Great Moments.
            </h2>

            <p className="text-base text-forest-800/80 leading-relaxed font-light">
              Relish authentic Maharashtrian culinary delights cooked with love and fresh farm ingredients. From traditional Pithla Bhakri and flavorful Veg Thalis to aromatic Solkadhi and mouthwatering non-veg specialties.
            </p>

            {/* Menu Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-2xl border border-earth-200 shadow-sm flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-earth-200 text-forest-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Flame className="w-4 h-4 text-accent-warm" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-forest-950">Authentic Veg & Non-Veg Thali</h4>
                  <p className="text-xs text-forest-800/70 mt-0.5 font-light">Prepared with farm-fresh spices & wood-fired flavor</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-earth-200 shadow-sm flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-earth-200 text-forest-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-accent-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-forest-950">Open Air Dining Patio</h4>
                  <p className="text-xs text-forest-800/70 mt-0.5 font-light">Enjoy breakfast and dinner with cool breeze</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/amenities"
                className="inline-flex items-center space-x-2 bg-forest-900 hover:bg-forest-800 text-white font-bold px-7 py-3.5 rounded-full text-sm transition-all shadow-md"
              >
                <span>Explore Restaurant & Dining</span>
                <ArrowRight className="w-4 h-4 text-accent-gold" />
              </Link>
            </div>
          </div>

          {/* Right Column: Unique Image Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-card border-2 border-white">
                <Image
                  src={image || SECTION_IMAGES.restaurant}
                  alt="Resort Dining Area"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-card border-2 border-white">
                <Image
                  src="/images/gallery-whatsapp-3.jpeg"
                  alt="Scenic Dining Outlook"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
