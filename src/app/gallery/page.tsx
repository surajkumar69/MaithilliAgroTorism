'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Maximize2, X } from 'lucide-react';
import { INITIAL_GALLERY } from '@/lib/data';
import { GalleryItem } from '@/lib/types';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    { label: 'All Photos', value: 'all' },
    { label: 'Resort View', value: 'resort' },
    { label: 'Rooms', value: 'rooms' },
    { label: 'Swimming Pool', value: 'pool' },
    { label: 'Mountain Views', value: 'mountains' },
    { label: 'Dining & Food', value: 'restaurant' },
    { label: 'Events & Banquet', value: 'events' },
    { label: 'Kids & Activities', value: 'activities' },
  ];

  const filteredGallery =
    activeCategory === 'all'
      ? INITIAL_GALLERY
      : INITIAL_GALLERY.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-earth-50 text-forest-900 min-h-screen py-16">
      
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-forest-950 text-white rounded-3xl p-8 sm:p-12 border border-forest-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-leaf/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-semibold tracking-widest text-accent-gold uppercase bg-forest-900 px-4 py-1.5 rounded-full border border-forest-800">
              PHOTO GALLERY
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold">
              Visual Tour of Maithili Agro Tourism
            </h1>
            <p className="text-sm sm:text-base text-earth-300 font-light leading-relaxed">
              Explore authentic high-resolution captures of our grounds, swimming pool, mountain balconies, dining hall, food delicacies, banquet hall, and playground.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                activeCategory === cat.value
                  ? 'bg-forest-900 text-accent-gold shadow-md'
                  : 'bg-white text-forest-800 border border-earth-200 hover:bg-earth-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300 group border border-earth-200"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] text-accent-gold uppercase font-semibold">
                  {item.category}
                </span>
                <h4 className="font-serif text-base font-bold text-white flex items-center justify-between mt-1">
                  <span>{item.title}</span>
                  <Maximize2 className="w-4 h-4 text-accent-leaf" />
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white p-2.5 rounded-full bg-forest-900 hover:bg-forest-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl w-full h-[80vh] rounded-3xl overflow-hidden border border-forest-800">
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-0 inset-x-0 bg-forest-950/90 p-4 text-center text-white border-t border-forest-800">
              <h3 className="font-serif text-lg font-bold text-accent-gold">{selectedImage.title}</h3>
              <p className="text-xs text-earth-300 capitalize">{selectedImage.category} Collection</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
