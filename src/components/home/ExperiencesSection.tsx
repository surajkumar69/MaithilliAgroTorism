'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Compass, ArrowRight, Sparkles, FilterX } from 'lucide-react';
import { Activity } from '@/lib/types';
import { INITIAL_ACTIVITIES } from '@/lib/data';
import { ItemDetailModal, DetailModalItem } from '@/components/ui/ItemDetailModal';
import { BookingModal } from '@/components/layout/BookingModal';

interface ExperiencesSectionProps {
  activities?: Activity[];
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  activities = INITIAL_ACTIVITIES,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<DetailModalItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingAccommodation, setBookingAccommodation] = useState('Resort Stay');

  const categories = [
    'All',
    'Stay',
    'Leisure',
    'Dining',
    'Kids & Fun',
    'Sports',
    'Agro Experience',
    'Adventure',
  ];

  const filteredActivities =
    selectedCategory === 'All'
      ? activities
      : activities.filter(
          (act) => act.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const handleOpenBooking = (title: string) => {
    setBookingAccommodation(title);
    setIsBookingOpen(true);
  };

  return (
    <section className="py-20 bg-earth-50 text-forest-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-earth-200 border border-earth-300 px-4 py-1.5 rounded-full">
              <Compass className="w-4 h-4 text-forest-700" />
              <span className="text-xs font-semibold tracking-widest text-forest-800 uppercase">
                ACTIVITIES & EXPERIENCES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950">
              Unforgettable Resort Experiences
            </h2>
            <p className="text-sm text-forest-800/80 font-light">
              From relaxing poolside evenings and mountain view balconies to indoor dining hall and children's play area.
            </p>
          </div>

          <Link
            href="/experiences"
            className="inline-flex items-center space-x-2 bg-forest-900 text-white font-semibold px-6 py-3 rounded-full text-xs hover:bg-forest-800 transition-colors shadow-md self-start md:self-auto"
          >
            <span>View All Experiences</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent-gold" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-forest-900 text-accent-gold shadow-md font-semibold'
                  : 'bg-white text-forest-800 hover:bg-earth-200 border border-earth-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Cards or Empty State */}
        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-earth-200 flex flex-col justify-between group cursor-pointer"
                onClick={() => setSelectedItem(act)}
              >
                <div>
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={act.imageUrl}
                      alt={act.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Category Pill */}
                    <span className="absolute top-4 left-4 bg-forest-950/80 backdrop-blur-md text-accent-gold text-[11px] font-semibold px-3 py-1 rounded-full border border-forest-800">
                      {act.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-2">
                    <h3 className="font-serif text-xl font-bold text-forest-950 group-hover:text-forest-600 transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-xs text-forest-800/80 leading-relaxed font-light line-clamp-3">
                      {act.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem(act);
                    }}
                    className="text-xs font-bold text-forest-700 hover:text-accent-leaf inline-flex items-center space-x-1 transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-earth-200 max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 bg-earth-100 text-forest-700 rounded-full flex items-center justify-center mx-auto">
              <FilterX className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-950">
              No experiences currently listed under "{selectedCategory}"
            </h3>
            <p className="text-xs text-forest-800/80 font-light max-w-md mx-auto">
              We are continually expanding our farm activities and photos. Please explore our other categories or view all activities.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-6 py-2.5 bg-forest-900 text-white text-xs font-semibold rounded-full hover:bg-forest-800 transition-colors shadow-sm"
            >
              Reset to All Experiences
            </button>
          </div>
        )}

      </div>

      {/* Item Detail Modal */}
      <ItemDetailModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        onBookNow={handleOpenBooking}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultAccommodation={bookingAccommodation}
      />
    </section>
  );
};
