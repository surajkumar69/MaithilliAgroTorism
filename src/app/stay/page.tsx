'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BedDouble, Users, Check, Calendar, Phone } from 'lucide-react';
import { INITIAL_ACCOMMODATIONS, CONTACT_INFO } from '@/lib/data';
import { BookingModal } from '@/components/layout/BookingModal';

export default function StayPage() {
  const [filterType, setFilterType] = useState<'all' | 'room' | 'dormitory'>('all');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState('Luxury Mountain View Rooms');

  const handleOpenBooking = (title?: string) => {
    if (title) setSelectedAccommodation(title);
    setBookingModalOpen(true);
  };

  const filteredAccommodations =
    filterType === 'all'
      ? INITIAL_ACCOMMODATIONS
      : INITIAL_ACCOMMODATIONS.filter((item) => item.type === filterType);

  return (
    <div className="bg-earth-50 text-forest-900 min-h-screen py-16">
      
      {/* Subpage Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-forest-950 text-white rounded-3xl p-8 sm:p-12 border border-forest-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-leaf/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-semibold tracking-widest text-accent-gold uppercase bg-forest-900 px-4 py-1.5 rounded-full border border-forest-800">
              ACCOMMODATIONS & STAY
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold">
              Rooms & Dormitory Options
            </h1>
            <p className="text-sm sm:text-base text-earth-300 font-light leading-relaxed">
              Designed for peaceful weekend relaxation, family getaways, and large group retreats in Mulshi, Pune.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Filter Tabs */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setFilterType('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-forest-900 text-accent-gold shadow-md'
                : 'bg-white text-forest-800 border border-earth-200 hover:bg-earth-200'
            }`}
          >
            All Accommodation Types
          </button>
          <button
            onClick={() => setFilterType('room')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              filterType === 'room'
                ? 'bg-forest-900 text-accent-gold shadow-md'
                : 'bg-white text-forest-800 border border-earth-200 hover:bg-earth-200'
            }`}
          >
            Luxury Rooms
          </button>
          <button
            onClick={() => setFilterType('dormitory')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              filterType === 'dormitory'
                ? 'bg-forest-900 text-accent-gold shadow-md'
                : 'bg-white text-forest-800 border border-earth-200 hover:bg-earth-200'
            }`}
          >
            Group Dormitory
          </button>
        </div>

        {/* Accommodation Cards List */}
        <div className="space-y-12">
          {filteredAccommodations.map((acc) => (
            <div
              key={acc.id}
              className="bg-white rounded-3xl border border-earth-200 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Image Side */}
              <div className="lg:col-span-6 relative h-80 lg:h-auto min-h-[320px]">
                <Image
                  src={acc.imageUrl}
                  alt={acc.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-forest-950/80 backdrop-blur-md text-accent-gold text-xs font-semibold px-4 py-1.5 rounded-full border border-forest-800 flex items-center space-x-1.5">
                  <Users className="w-4 h-4" />
                  <span>{acc.capacity}</span>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-forest-600 uppercase tracking-widest">
                    {acc.type === 'room' ? 'Private Luxury Cottage Room' : 'Group Retreat Dormitory'}
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-forest-950">{acc.title}</h2>
                  <p className="text-sm text-forest-800/80 leading-relaxed font-light">
                    {acc.description}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-forest-900 uppercase tracking-wider mb-2">
                      Included Amenities:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-forest-800">
                      {acc.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-accent-leaf flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-earth-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-[11px] text-forest-800/60 uppercase font-semibold">
                      Flexible Tariff Options
                    </span>
                    <span className="text-sm font-bold text-forest-900">
                      Contact for Custom Group Rates
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <a
                      href={`tel:${CONTACT_INFO.phones[0]}`}
                      className="bg-earth-200 hover:bg-earth-300 text-forest-900 p-3 rounded-full transition-colors"
                      title="Call Reception"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleOpenBooking(acc.title)}
                      className="bg-accent-leaf hover:bg-forest-500 text-forest-950 font-bold px-6 py-3 rounded-full text-xs transition-all shadow-md flex items-center space-x-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Your Stay</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultAccommodation={selectedAccommodation}
      />
    </div>
  );
}
