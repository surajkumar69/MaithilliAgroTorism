'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, Users, Check, ArrowRight, Calendar, Info } from 'lucide-react';
import { Accommodation } from '@/lib/types';
import { INITIAL_ACCOMMODATIONS } from '@/lib/data';
import { ItemDetailModal, DetailModalItem } from '@/components/ui/ItemDetailModal';

interface StaySectionProps {
  accommodations?: Accommodation[];
  onOpenBooking: (accommodationTitle?: string) => void;
}

export const StaySection: React.FC<StaySectionProps> = ({
  accommodations = INITIAL_ACCOMMODATIONS,
  onOpenBooking,
}) => {
  const [selectedItem, setSelectedItem] = useState<DetailModalItem | null>(null);

  return (
    <section className="py-20 bg-forest-950 text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-forest-800/30 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-leaf/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-forest-900 border border-accent-gold/40 px-4 py-1.5 rounded-full">
            <BedDouble className="w-4 h-4 text-accent-gold" />
            <span className="text-xs font-semibold tracking-widest text-accent-gold uppercase">
              ACCOMMODATION & STAY
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Restful Stays Surrounded by Sahyadri Valleys
          </h2>

          <p className="text-base text-earth-300 font-light">
            Choose between private luxury rooms with private mountain balconies or spacious dormitory setups for large group celebrations.
          </p>
        </div>

        {/* Accommodation Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {accommodations.map((item) => (
            <div
              key={item.id}
              className="bg-forest-900/90 border border-forest-800 rounded-3xl overflow-hidden shadow-2xl hover:border-accent-gold/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Card Image */}
                <div
                  className="relative h-72 w-full overflow-hidden cursor-pointer"
                  onClick={() =>
                    setSelectedItem({
                      title: item.title,
                      category: item.type === 'room' ? 'Private Luxury Room' : 'Group Dormitory',
                      imageUrl: item.imageUrl,
                      description: item.description,
                      features: item.features,
                      capacity: item.capacity,
                      pricePerNight: item.pricePerNight,
                    })
                  }
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-forest-950/80 backdrop-blur-md text-accent-gold text-xs font-semibold px-3 py-1.5 rounded-full border border-forest-700 flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{item.capacity}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-accent-gold transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-earth-300 leading-relaxed font-light">
                    {item.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 pt-2 border-t border-forest-800/80">
                    <span className="text-xs font-semibold text-earth-400 uppercase tracking-wider">
                      Key Room Amenities:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-earth-200">
                      {item.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-accent-leaf flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-4 border-t border-forest-800/60 mt-4">
                <button
                  onClick={() =>
                    setSelectedItem({
                      title: item.title,
                      category: item.type === 'room' ? 'Private Luxury Room' : 'Group Dormitory',
                      imageUrl: item.imageUrl,
                      description: item.description,
                      features: item.features,
                      capacity: item.capacity,
                      pricePerNight: item.pricePerNight,
                    })
                  }
                  className="text-xs font-semibold text-earth-300 hover:text-white flex items-center space-x-1 transition-colors"
                >
                  <Info className="w-3.5 h-3.5 text-accent-gold" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => onOpenBooking(item.title)}
                  className="bg-accent-leaf hover:bg-forest-500 text-forest-950 font-bold px-6 py-2.5 rounded-full text-xs transition-all shadow-md flex items-center space-x-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <ItemDetailModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        onBookNow={onOpenBooking}
      />
    </section>
  );
};
