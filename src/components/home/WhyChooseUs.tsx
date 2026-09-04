'use client';

import React from 'react';
import { Trees, BedDouble, Smile, HeartHandshake, Mountain, PartyPopper } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Trees,
      title: 'Nature & Peace',
      description: 'Nestled amidst quiet agricultural farmlands far away from traffic, noise, and city stress.',
    },
    {
      icon: BedDouble,
      title: 'Comfortable Stay',
      description: 'Clean, modern rooms with air conditioning, ensuite hot water showers, and private balconies.',
    },
    {
      icon: Smile,
      title: 'Fun-Filled Activities',
      description: 'Swimming pool, sports turf, pickleball, trampoline, tractor rides, and kids playground.',
    },
    {
      icon: HeartHandshake,
      title: 'Family Friendly',
      description: 'Safe, welcoming environment with dedicated kids play zones and wholesome family dining.',
    },
    {
      icon: Mountain,
      title: 'Beautiful Mountain Views',
      description: 'Unobstructed 360-degree views of Mulshi valleys and green mountain ranges.',
    },
    {
      icon: PartyPopper,
      title: 'Perfect for Events',
      description: 'Spacious indoor banquet hall and open lawns tailored for weddings, corporate retreats, and parties.',
    },
  ];

  return (
    <section className="py-20 bg-earth-50 text-forest-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-widest text-forest-700 uppercase bg-earth-200 px-4 py-1.5 rounded-full border border-earth-300">
            WHY MAITHILI AGRO TOURISM
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950">
            Why Our Guests Love Staying With Us
          </h2>
          <p className="text-sm text-forest-800/80 font-light">
            We blend countryside hospitality with modern resort comforts for an unforgettable retreat.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl border border-earth-200 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 space-y-4 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-forest-900 text-accent-gold flex items-center justify-center group-hover:bg-accent-leaf group-hover:text-forest-950 transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-950 group-hover:text-forest-700 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-forest-800/80 leading-relaxed font-light">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
