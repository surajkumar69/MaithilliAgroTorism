'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, FilterX, Info } from 'lucide-react';
import { INITIAL_ACTIVITIES } from '@/lib/data';
import { BookingModal } from '@/components/layout/BookingModal';
import { ItemDetailModal, DetailModalItem } from '@/components/ui/ItemDetailModal';

export default function ExperiencesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<DetailModalItem | null>(null);

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
    activeCategory === 'All'
      ? INITIAL_ACTIVITIES
      : INITIAL_ACTIVITIES.filter(
          (act) => act.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="bg-earth-50 text-forest-900 min-h-screen py-16">
      
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-forest-950 text-white rounded-3xl p-8 sm:p-12 border border-forest-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-leaf/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-semibold tracking-widest text-accent-gold uppercase bg-forest-900 px-4 py-1.5 rounded-full border border-forest-800">
              RESORT EXPERIENCES & ACTIVITIES
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold">
              Resort Experiences & Activities
            </h1>
            <p className="text-sm sm:text-base text-earth-300 font-light leading-relaxed">
              Explore our illuminated swimming pool, luxury rooms & cottage stay, room balcony with mountain view, indoor dining hall, washroom facilities, and children's playground rides.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                activeCategory === cat
                  ? 'bg-forest-900 text-accent-gold shadow-md'
                  : 'bg-white text-forest-800 border border-earth-200 hover:bg-earth-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid or Empty State */}
        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-3xl overflow-hidden shadow-card border border-earth-200 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                onClick={() => setSelectedActivity(act)}
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={act.imageUrl}
                      alt={act.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-4 left-4 bg-forest-950/80 backdrop-blur-md text-accent-gold text-xs font-semibold px-3 py-1 rounded-full border border-forest-800">
                      {act.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-forest-950 group-hover:text-forest-600 transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-xs text-forest-800/80 leading-relaxed font-light line-clamp-3">
                      {act.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedActivity(act);
                    }}
                    className="flex-1 bg-earth-100 hover:bg-earth-200 text-forest-900 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setBookingModalOpen(true);
                    }}
                    className="flex-1 bg-forest-900 hover:bg-forest-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                    <span>Enquire</span>
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
              No experiences currently listed under "{activeCategory}"
            </h3>
            <p className="text-xs text-forest-800/80 font-light max-w-md mx-auto">
              We are continuously adding new photos and farm activities. Please check out our other categories or view all experiences.
            </p>
            <button
              onClick={() => setActiveCategory('All')}
              className="px-6 py-2.5 bg-forest-900 text-white text-xs font-semibold rounded-full hover:bg-forest-800 transition-colors shadow-sm"
            >
              Reset to All Experiences
            </button>
          </div>
        )}

      </div>

      <ItemDetailModal
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        item={selectedActivity}
        onBookNow={() => setBookingModalOpen(true)}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultAccommodation="Day Package / Farm Experience"
      />
    </div>
  );
}
