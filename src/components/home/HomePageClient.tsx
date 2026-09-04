'use client';

import React, { useState } from 'react';
import { Hero } from '@/components/home/Hero';
import { Intro } from '@/components/home/Intro';
import { StaySection } from '@/components/home/StaySection';
import { ExperiencesSection } from '@/components/home/ExperiencesSection';
import { BanquetSection } from '@/components/home/BanquetSection';
import { RestaurantSection } from '@/components/home/RestaurantSection';
import { MountainViewSection } from '@/components/home/MountainViewSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { StatsSection } from '@/components/home/StatsSection';
import { GalleryPreview } from '@/components/home/GalleryPreview';
import { BookingProcess } from '@/components/home/BookingProcess';
import { FinalCTA } from '@/components/home/FinalCTA';
import { BookingModal } from '@/components/layout/BookingModal';
import { INITIAL_ACTIVITIES } from '@/lib/data';

interface HomePageClientProps {
  settings: any;
  attractions: any[];
  packages: any[];
  stays: any[];
  quickFacts: any;
}

export function HomePageClient({ settings, attractions, packages, stays, quickFacts }: HomePageClientProps) {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState('Luxury Mountain View Rooms');

  const handleOpenBooking = (accommodationTitle?: string) => {
    if (accommodationTitle) {
      setSelectedAccommodation(accommodationTitle);
    }
    setBookingModalOpen(true);
  };

  // Map DB Stays to the component's expected structure
  const mappedStays = stays.map(stay => ({
    id: stay.id.toString(),
    slug: stay.slug || stay.id.toString(),
    type: stay.kind || 'Room',
    title: stay.name,
    description: stay.description || '',
    price: `₹${stay.pricePerNightInr} / Night`,
    capacity: stay.maxOccupancy ? `${stay.maxOccupancy} Adults` : '2 Adults',
    features: Array.isArray(stay.amenities) ? stay.amenities : ['AC', 'Attached Washroom', 'Mountain View'],
    image: stay.coverMediaId || '/images/luxury-room.jpeg',
    imageUrl: stay.coverMediaId || '/images/luxury-room.jpeg',
    isPopular: false,
  }));

  // Use INITIAL_ACTIVITIES directly for 100% exact image-to-heading mapping across all 13 resort experiences
  const mappedExperiences = INITIAL_ACTIVITIES;

  return (
    <>
      {/* 1. HERO SECTION */}
      <Hero settings={settings} onOpenBooking={handleOpenBooking} />

      {/* 2. INTRODUCTION SECTION */}
      <Intro />

      {/* 3. STAY / ACCOMMODATION SECTION */}
      <StaySection accommodations={mappedStays} onOpenBooking={handleOpenBooking} />

      {/* 4. EXPERIENCES & ACTIVITIES SECTION */}
      <ExperiencesSection activities={mappedExperiences} />

      {/* 5. BANQUET & EVENTS SECTION */}
      <BanquetSection onOpenBooking={handleOpenBooking} />

      {/* 6. RESTAURANT SECTION */}
      <RestaurantSection />

      {/* 7. 360° MOUNTAIN VIEW SECTION */}
      <MountainViewSection onOpenBooking={handleOpenBooking} />

      {/* 8. WHY CHOOSE US SECTION */}
      <WhyChooseUs />

      {/* 9. STATS SECTION */}
      <StatsSection />

      {/* 10. FEATURED EXPERIENCES / GALLERY */}
      <GalleryPreview />

      {/* 11. SIMPLE BOOKING / ENQUIRY PROCESS */}
      <BookingProcess />

      {/* 12. FINAL CTA */}
      <FinalCTA onOpenBooking={handleOpenBooking} />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultAccommodation={selectedAccommodation}
      />
    </>
  );
}
