'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Phone, Sparkles, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/data';

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-24 bg-gradient-to-br from-forest-900 via-forest-950 to-forest-900 text-white relative overflow-hidden border-t border-forest-800">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-leaf/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center space-x-2 bg-forest-800/80 border border-accent-gold/50 px-4 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-accent-gold" />
            <span className="text-xs font-semibold tracking-widest text-accent-gold uppercase">
              RESERVE YOUR ESCAPE TODAY
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Your Nature Getaway Awaits.
          </h2>

          <p className="text-base sm:text-lg text-earth-200 font-light leading-relaxed">
            Plan your visit to Maithili Agro Tourism and create memories surrounded by mountain vistas, peaceful farmlands, swimming pool, and wholesome farm dining.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-accent-leaf hover:bg-forest-500 text-forest-950 font-bold px-9 py-4 rounded-full text-base transition-all shadow-xl hover:shadow-glow flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5 text-forest-950" />
              <span>Book Your Stay</span>
            </button>

            <Link
              href="/contact"
              className="w-full sm:w-auto bg-forest-900 hover:bg-forest-800 text-earth-100 font-semibold px-8 py-4 rounded-full text-base border border-forest-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5 text-accent-gold" />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Location Badge */}
          <div className="pt-8 flex items-center justify-center space-x-2 text-xs text-earth-300">
            <MapPin className="w-4 h-4 text-accent-leaf" />
            <span>Gat No 736, At Ambegaon, Post Urawade, Taluka Mulshi, District Pune 412115</span>
          </div>

        </div>
      </div>
    </section>
  );
};
