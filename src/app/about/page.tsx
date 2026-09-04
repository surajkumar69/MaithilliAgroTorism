'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, CheckCircle2, Calendar } from 'lucide-react';
import { BookingModal } from '@/components/layout/BookingModal';

export default function AboutPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="bg-earth-50 text-forest-900 min-h-screen py-16">
      
      {/* Subpage Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-forest-950 text-white rounded-3xl p-8 sm:p-12 border border-forest-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-leaf/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-semibold tracking-widest text-accent-gold uppercase bg-forest-900 px-4 py-1.5 rounded-full border border-forest-800">
              OUR STORY & PHILOSOPHY
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold">
              About Maithili Agro Tourism
            </h1>
            <p className="text-sm sm:text-base text-earth-300 font-light leading-relaxed">
              A peaceful sanctuary nestled in Ambegaon, Mulshi, Pune — blending authentic rural Maharashtrian hospitality with modern resort comforts.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl font-bold text-forest-950">
              Reconnecting Families with Nature & Countryside Serenity
            </h2>
            <p className="text-sm text-forest-800/80 leading-relaxed font-light">
              Founded with a vision to preserve the natural beauty of the Sahyadri mountains while providing urban families and groups a refreshing retreat. At Maithili Agro Tourism, we believe that true luxury lies in breathing fresh unpolluted air, walking on soft green lawns, swimming under open skies, and enjoying wholesome farm meals.
            </p>
            <p className="text-sm text-forest-800/80 leading-relaxed">
              Spanning across lush acreage in Gat No 736 at Ambegaon, our estate features private balcony rooms, a large group dormitory, a night-lighted swimming pool, professional sports turf, pickleball, and tractor rides for children.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs font-semibold text-forest-800">
              <MapPin className="w-4 h-4 text-accent-leaf" />
              <span>Gat No 736, At Ambegaon, Post Urawade, Taluka Mulshi, Pune 412115</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-96 rounded-3xl overflow-hidden shadow-card border-4 border-white">
            <Image
              src="/images/gallery-whatsapp-2.jpeg"
              alt="Maithili Agro Tourism Estate Campus"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Core Values / Features */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-earth-200 shadow-card space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-serif text-2xl font-bold text-forest-950">What Defines Our Agro Resort</h3>
            <p className="text-xs text-forest-800/70">Built with passion for sustainable hospitality and guest satisfaction.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Authentic Maharashtrian Hospitality', desc: 'Warm, personal service making you feel like a guest at a family estate.' },
              { title: 'Eco-Conscious Nature Living', desc: 'Organic vegetation, rain preservation, and minimal artificial disturbance.' },
              { title: '360° Sahyadri View', desc: 'Panoramic mountain vistas visible from room balconies and open lawns.' },
              { title: 'Recreation for All Ages', desc: 'Turf sports for youth, slides for kids, and serene garden benches for elders.' },
              { title: 'Convenient Location', desc: 'Easily accessible from Pune city via Paud road in Mulshi district.' },
              { title: 'Memorable Celebrations', desc: 'Complete event hosting for destination weddings and corporate outings.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-earth-50 p-6 rounded-2xl border border-earth-200 space-y-2">
                <CheckCircle2 className="w-5 h-5 text-accent-leaf" />
                <h4 className="font-bold text-sm text-forest-950">{item.title}</h4>
                <p className="text-xs text-forest-800/70 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-forest-900 text-white rounded-3xl p-8 text-center space-y-6">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">Ready to Experience Maithili Agro Tourism?</h3>
          <button
            onClick={() => setBookingModalOpen(true)}
            className="bg-accent-leaf hover:bg-forest-500 text-forest-950 font-bold px-8 py-3 rounded-full text-sm transition-all shadow-lg inline-flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Your Stay Now</span>
          </button>
        </div>

      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultAccommodation="Luxury Mountain View Rooms"
      />
    </div>
  );
}
