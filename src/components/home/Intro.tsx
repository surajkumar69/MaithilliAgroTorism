'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trees, Sun, CheckCircle2, ArrowRight } from 'lucide-react';
import { SECTION_IMAGES } from '@/lib/data';

export const Intro: React.FC = () => {
  return (
    <section className="py-20 bg-earth-50 text-forest-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Unique Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card border-4 border-white">
              <div className="relative h-[380px] sm:h-[450px] w-full">
                <Image
                  src={SECTION_IMAGES.intro}
                  alt="Maithili Agro Tourism Resort Night Ambiance"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Overlapping Floating Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-forest-900 text-white p-5 rounded-2xl shadow-xl max-w-xs border border-forest-800 hidden sm:block">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-accent-leaf text-forest-950 flex items-center justify-center font-bold">
                  <Trees className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-accent-gold">Mulshi Countryside</h4>
                  <p className="text-[11px] text-earth-300">Surrounded by mountains & green valleys</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Introduction Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-earth-200 border border-earth-300 px-4 py-1.5 rounded-full">
              <Sun className="w-4 h-4 text-forest-600" />
              <span className="text-xs font-semibold tracking-widest text-forest-800 uppercase">
                WELCOME TO MAITHILI AGRO TOURISM
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 leading-tight">
              Nature, Comfort & Unforgettable Experiences.
            </h2>

            <p className="text-base text-forest-800/80 leading-relaxed font-light">
              Maithili Agro Tourism is a premier nature destination tucked away in the serene valleys of Ambegaon, Mulshi, Pune. Designed to reconnect families, friends, and corporate groups with the soothing rhythm of countryside living.
            </p>

            <p className="text-sm text-forest-800/80 leading-relaxed">
              Whether you are looking to take a refreshing dip in our illuminated swimming pool, play high-energy cricket on our multi-sports turf, ride traditional bullock carts and tractors, or simply savor authentic Maharashtrian cuisine with 360° mountain views — Maithili Agro Tourism offers something truly special for every guest.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                '360° Panoramic Sahyadri Hill Views',
                'Illuminated Swimming Pool',
                'Multi-Sports Turf & Pickle Ball Court',
                'Authentic Farm-Fresh Maharashtrian Dining',
                'Tractor & Bullock Cart Agro Rides',
                'Grand Event Lawn & Covered Banquet',
              ].map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-forest-900 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-accent-leaf flex-shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 text-forest-700 hover:text-forest-900 font-bold text-sm group"
              >
                <span>Read Our Full Resort Story</span>
                <ArrowRight className="w-4 h-4 text-accent-gold group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
