'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Maximize2, X, ArrowRight } from 'lucide-react';
import { GalleryItem } from '@/lib/types';
import { INITIAL_GALLERY } from '@/lib/data';

interface GalleryPreviewProps {
  gallery?: GalleryItem[];
}

export const GalleryPreview: React.FC<GalleryPreviewProps> = ({ gallery = INITIAL_GALLERY }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    { label: 'All Photos', value: 'all' },
    { label: 'Resort', value: 'resort' },
    { label: 'Pool', value: 'pool' },
    { label: 'Mountains', value: 'mountains' },
    { label: 'Events', value: 'events' },
    { label: 'Activities', value: 'activities' },
  ];

  const filteredGallery =
    activeCategory === 'all'
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  return (
    <section className="py-20 bg-earth-50 text-forest-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 bg-earth-200 border border-earth-300 px-4 py-1.5 rounded-full">
              <Camera className="w-4 h-4 text-forest-700" />
              <span className="text-xs font-semibold tracking-widest text-forest-800 uppercase">
                RESORT SNAPSHOTS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950">
              Explore Life at Maithili Agro Tourism
            </h2>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center space-x-2 bg-forest-900 text-white font-semibold px-6 py-3 rounded-full text-xs hover:bg-forest-800 transition-colors shadow-md self-start md:self-auto"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent-gold" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat.value
                  ? 'bg-forest-900 text-accent-gold font-semibold shadow-md'
                  : 'bg-white text-forest-800 hover:bg-earth-200 border border-earth-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 group border border-earth-200"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] text-accent-gold uppercase font-semibold">
                  {item.category}
                </span>
                <h4 className="font-serif text-sm font-bold text-white flex items-center justify-between">
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
            className="absolute top-6 right-6 text-white p-2 rounded-full bg-forest-900 hover:bg-forest-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl w-full h-[80vh] rounded-3xl overflow-hidden">
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-0 inset-x-0 bg-black/70 p-4 text-center text-white">
              <h3 className="font-serif text-lg font-bold">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
