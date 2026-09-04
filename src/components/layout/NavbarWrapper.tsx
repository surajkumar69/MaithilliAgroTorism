'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingCTA } from './FloatingCTA';
import { BookingModal } from './BookingModal';

export const NavbarWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState('Luxury Mountain View Room');

  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <div className="min-h-screen bg-forest-950">{children}</div>;
  }

  const handleOpenBooking = (accommodationTitle?: string) => {
    if (accommodationTitle) {
      setSelectedAccommodation(accommodationTitle);
    }
    setBookingModalOpen(true);
  };

  return (
    <>
      <Navbar onOpenBooking={() => handleOpenBooking()} />
      <main className="flex-grow">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { onOpenBooking: handleOpenBooking } as any);
          }
          return child;
        })}
      </main>
      <Footer />
      <FloatingCTA onOpenBooking={() => handleOpenBooking()} />
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultAccommodation={selectedAccommodation}
      />
    </>
  );
};
