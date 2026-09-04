'use client';

import React from 'react';
import { MessageSquare, Phone, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/data';

interface FloatingCTAProps {
  onOpenBooking: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onOpenBooking }) => {
  return (
    <>
      {/* Floating WhatsApp Quick Chat Button (Desktop & Mobile) */}
      <div className="fixed bottom-20 md:bottom-6 right-5 z-40">
        <a
          href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
            'Hello Maithili Agro Tourism! I would like to inquire about booking a stay.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 relative group"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-7 h-7 fill-current" />
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-forest-950 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>
      </div>

      {/* Mobile Sticky Quick Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-forest-950/95 backdrop-blur-md border-t border-forest-800 p-2.5 flex items-center justify-around md:hidden shadow-2xl">
        <a
          href={`tel:${CONTACT_INFO.phones[0]}`}
          className="flex flex-col items-center justify-center text-earth-200 hover:text-accent-leaf text-[11px] font-medium"
        >
          <Phone className="w-4 h-4 text-accent-leaf mb-0.5" />
          <span>Call Us</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="bg-accent-leaf text-forest-950 font-bold px-5 py-2 rounded-full text-xs shadow-lg"
        >
          Book Your Stay
        </button>

        <a
          href={CONTACT_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center text-earth-200 hover:text-accent-leaf text-[11px] font-medium"
        >
          <MapPin className="w-4 h-4 text-accent-leaf mb-0.5" />
          <span>Location</span>
        </a>
      </div>
    </>
  );
};
