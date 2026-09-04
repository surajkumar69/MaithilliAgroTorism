'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, Calendar, Info } from 'lucide-react';
import { INITIAL_AMENITIES } from '@/lib/data';
import { BookingModal } from '@/components/layout/BookingModal';
import { ItemDetailModal, DetailModalItem } from '@/components/ui/ItemDetailModal';

export default function AmenitiesPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState<DetailModalItem | null>(null);

  return (
    <div className="bg-earth-50 text-forest-900 min-h-screen py-16">
      
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-forest-950 text-white rounded-3xl p-8 sm:p-12 border border-forest-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-leaf/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-semibold tracking-widest text-accent-gold uppercase bg-forest-900 px-4 py-1.5 rounded-full border border-forest-800">
              WORLD-CLASS FACILITIES
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold">
              Resort Amenities & Facilities
            </h1>
            <p className="text-sm sm:text-base text-earth-300 font-light leading-relaxed">
              Everything you need for a comfortable, fun-filled, and relaxing countryside holiday in Mulshi.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Amenities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_AMENITIES.map((amenity) => (
            <div
              key={amenity.id}
              onClick={() =>
                setSelectedAmenity({
                  title: amenity.title,
                  category: 'Resort Amenity',
                  imageUrl: amenity.imageUrl || '/images/hero-resort.jpeg',
                  description: amenity.description,
                })
              }
              className="bg-white rounded-3xl overflow-hidden shadow-card border border-earth-200 p-8 space-y-4 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                {amenity.imageUrl && (
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={amenity.imageUrl}
                      alt={amenity.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="w-12 h-12 rounded-2xl bg-forest-900 text-accent-gold flex items-center justify-center group-hover:bg-accent-leaf group-hover:text-forest-950 transition-colors">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-xl font-bold text-forest-950 group-hover:text-forest-700 transition-colors">
                  {amenity.title}
                </h3>

                <p className="text-xs text-forest-800/80 leading-relaxed font-light">
                  {amenity.description}
                </p>
              </div>

              <div className="pt-4 border-t border-earth-100 text-xs text-forest-700 font-semibold flex items-center justify-between">
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 text-accent-leaf" />
                  <span>Available for all staying guests</span>
                </span>
                <Info className="w-4 h-4 text-forest-600 group-hover:text-accent-gold transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-forest-900 text-white rounded-3xl p-8 text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold">Plan Your Visit to Maithili Agro Tourism</h3>
          <p className="text-xs text-earth-300 max-w-lg mx-auto">
            Book your room or group dormitory today and enjoy full access to all resort amenities.
          </p>
          <button
            onClick={() => setBookingModalOpen(true)}
            className="bg-accent-leaf hover:bg-forest-500 text-forest-950 font-bold px-8 py-3 rounded-full text-xs transition-all shadow-lg inline-flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Your Stay</span>
          </button>
        </div>

      </div>

      <ItemDetailModal
        isOpen={!!selectedAmenity}
        onClose={() => setSelectedAmenity(null)}
        item={selectedAmenity}
        onBookNow={() => setBookingModalOpen(true)}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultAccommodation="Luxury Mountain View Rooms"
      />
    </div>
  );
}
