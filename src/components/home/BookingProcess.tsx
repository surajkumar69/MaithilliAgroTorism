'use client';

import React from 'react';
import { Compass, BedDouble, PhoneCall, Sparkles } from 'lucide-react';

export const BookingProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: Compass,
      title: 'Explore',
      description: 'Browse our luxury mountain view rooms, group dormitory stay, sports turf, and farm experiences.',
    },
    {
      num: '02',
      icon: BedDouble,
      title: 'Choose Your Stay',
      description: 'Select your preferred dates, guest count, room type, or event celebration package.',
    },
    {
      num: '03',
      icon: PhoneCall,
      title: 'Contact / Book',
      description: 'Fill out our online reservation form or call our resort reception directly via phone/WhatsApp.',
    },
    {
      num: '04',
      icon: Sparkles,
      title: 'Enjoy Your Experience',
      description: 'Arrive at Ambegaon Mulshi, relax by the pool, savor farm food, and create unforgettable memories.',
    },
  ];

  return (
    <section className="py-20 bg-forest-950 text-white border-t border-forest-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-widest text-accent-gold uppercase bg-forest-900 px-4 py-1.5 rounded-full border border-forest-800">
            SIMPLE 4-STEP PROCESS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            How to Book Your Stay
          </h2>
          <p className="text-sm text-earth-300 font-light">
            Plan your retreat in just a few quick steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-forest-900/80 p-8 rounded-3xl border border-forest-800 relative space-y-4 hover:border-accent-gold/50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-forest-800 text-accent-leaf flex items-center justify-center group-hover:bg-accent-leaf group-hover:text-forest-950 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-serif text-3xl font-extrabold text-forest-800 group-hover:text-accent-gold transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white group-hover:text-accent-gold transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-earth-300 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
