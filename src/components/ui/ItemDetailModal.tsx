'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

export interface DetailModalItem {
  id?: string;
  title: string;
  category?: string;
  imageUrl: string;
  description: string;
  features?: string[];
  capacity?: string;
  pricePerNight?: number;
}

interface ItemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: DetailModalItem | null;
  onBookNow?: (title: string) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  isOpen,
  onClose,
  item,
  onBookNow,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 my-auto transform transition-all border border-earth-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row max-h-[85vh] overflow-y-auto">
          {/* Image Header / Side */}
          <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[260px] bg-earth-900 shrink-0">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {item.category && (
              <span className="absolute top-4 left-4 bg-forest-950/85 backdrop-blur-md text-accent-gold text-xs font-semibold px-3 py-1 rounded-full border border-forest-800 shadow-md">
                {item.category}
              </span>
            )}

            {item.pricePerNight && (
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-2xl font-bold text-accent-gold">₹{item.pricePerNight}</span>
                <span className="text-xs text-earth-200"> / night</span>
              </div>
            )}
          </div>

          {/* Content Details */}
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-forest-950">
                  {item.title}
                </h3>
                {item.capacity && (
                  <p className="text-xs font-medium text-forest-600 mt-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
                    <span>{item.capacity}</span>
                  </p>
                )}
              </div>

              <div className="h-0.5 w-12 bg-accent-gold rounded-full" />

              <p className="text-sm text-forest-800/90 leading-relaxed font-light">
                {item.description}
              </p>

              {item.features && item.features.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-forest-900 uppercase tracking-wider">
                    Key Features & Highlights
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-forest-800/90">
                        <CheckCircle2 className="w-4 h-4 text-accent-leaf shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-earth-100 flex flex-col sm:flex-row gap-3">
              {onBookNow && (
                <button
                  onClick={() => {
                    onClose();
                    onBookNow(item.title);
                  }}
                  className="w-full py-3 px-6 bg-forest-900 hover:bg-forest-800 text-white rounded-full text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4 text-accent-gold" />
                  <span>Enquire / Book Stay</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-6 bg-earth-100 hover:bg-earth-200 text-forest-900 rounded-full text-xs font-semibold transition-colors text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
