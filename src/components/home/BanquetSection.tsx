'use client';

import React from 'react';
import Image from 'next/image';
import { PartyPopper, Calendar, CheckCircle2 } from 'lucide-react';
import { INITIAL_EVENTS } from '@/lib/data';

interface BanquetSectionProps {
  onOpenBooking: (eventTitle?: string) => void;
}

export const BanquetSection: React.FC<BanquetSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 bg-forest-950 text-white relative overflow-hidden border-t border-forest-800/60">
      {/* Background Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-leaf/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-forest-900 border border-accent-gold/40 px-4 py-1.5 rounded-full">
            <PartyPopper className="w-4 h-4 text-accent-gold" />
            <span className="text-xs font-semibold tracking-widest text-accent-gold uppercase">
              BANQUET & CELEBRATIONS
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Memorable Celebrations in a Mountain Setting
          </h2>

          <p className="text-base text-earth-300 font-light">
            Host destination weddings, corporate team outings, birthdays, and anniversary galas in our covered banquet hall and manicured outdoor lawns.
          </p>
        </div>

        {/* Feature Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-forest-900/80 border border-forest-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-lg border border-forest-700 h-80 sm:h-96">
            <Image
              src="/images/event-lawn-cottages.jpeg"
              alt="Maithili Agro Tourism Grand Event Hall & Open Air Lawns"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-4 bg-forest-950/90 backdrop-blur-md px-4 py-2 rounded-xl border border-forest-800 text-xs font-semibold text-accent-gold">
              Covered Capacity: 200+ Seated Guests
            </div>
          </div>

          {/* Right Column: Event Details & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Grand Event Hall & Open Air Lawns
            </h3>

            <p className="text-sm text-earth-300 leading-relaxed font-light">
              Designed with elegant wooden ceilings, ample natural light, climate management, and direct lawn connectivity. Complete with in-house catering, sound system, and dedicated guest management.
            </p>

            <div className="space-y-3 pt-2">
              {INITIAL_EVENTS.map((evt) => (
                <div key={evt.id} className="bg-forest-950/60 p-4 rounded-xl border border-forest-800">
                  <h4 className="font-semibold text-sm text-accent-gold">{evt.title}</h4>
                  <p className="text-xs text-earth-300 mt-1 font-light">{evt.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenBooking('Banquet / Event Celebration')}
                className="w-full sm:w-auto bg-accent-leaf hover:bg-forest-500 text-forest-950 font-bold px-8 py-3.5 rounded-full text-sm transition-all shadow-xl hover:shadow-glow flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan Your Event</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
