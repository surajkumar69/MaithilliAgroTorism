'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Trees, Menu, X, Phone, MessageSquare, Calendar } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/data';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Stay', href: '/stay' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Amenities', href: '/amenities' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Banner Contact Bar */}
      <div className="bg-forest-900 text-earth-100 text-xs py-2 px-4 border-b border-forest-800/50 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-accent-leaf animate-pulse"></span>
              <span>Gat No 736, At Ambegaon, Mulshi, Pune</span>
            </span>
            <a
              href={`tel:${CONTACT_INFO.phones[0]}`}
              className="hover:text-accent-leaf transition-colors flex items-center space-x-1"
            >
              <Phone className="w-3 h-3 text-accent-leaf" />
              <span>+91 {CONTACT_INFO.phones[0]}</span>
            </a>
            <a
              href={`tel:${CONTACT_INFO.phones[1]}`}
              className="hover:text-accent-leaf transition-colors flex items-center space-x-1"
            >
              <Phone className="w-3 h-3 text-accent-leaf" />
              <span>+91 {CONTACT_INFO.phones[1]}</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-leaf transition-colors flex items-center space-x-1"
            >
              <MessageSquare className="w-3 h-3 text-accent-leaf" />
              <span>WhatsApp Us</span>
            </a>
            <span className="text-forest-700">|</span>
            <Link href="/admin" className="hover:text-accent-leaf transition-colors text-earth-300">
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-forest-900/95 backdrop-blur-md shadow-lg py-3 border-b border-forest-800/80'
            : 'bg-forest-900 py-4 border-b border-forest-800/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo on Left */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center border-2 border-accent-gold/60 group-hover:scale-105 transition-transform p-1">
              <Image src="/images/logo.png" alt="Maithili Logo" fill className="object-contain p-1" />
            </div>
            <div>
              <span className="block font-serif text-xl md:text-2xl font-bold tracking-wide text-white group-hover:text-accent-gold transition-colors">
                Maithili
              </span>
              <span className="block text-[10px] md:text-xs text-earth-300 font-sans tracking-widest uppercase font-medium">
                Agro Tourism Resort
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-accent-gold font-semibold'
                      : 'text-earth-100 hover:text-accent-leaf'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Primary CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={onOpenBooking}
              className="bg-accent-leaf hover:bg-forest-500 text-forest-950 font-semibold px-5 py-2.5 rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-glow flex items-center space-x-2 border border-accent-leaf/30"
            >
              <Calendar className="w-4 h-4 text-forest-950" />
              <span>Book Your Stay</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="bg-accent-leaf text-forest-950 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-lg bg-forest-800/80 hover:bg-forest-700 transition-colors focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-accent-gold" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-forest-950 text-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-forest-800">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-forest-800">
                <div className="flex items-center space-x-2">
                  <div className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5 overflow-hidden">
                    <Image src="/images/logo.png" alt="Maithili Logo" fill className="object-contain p-0.5" />
                  </div>
                  <span className="font-serif text-lg font-bold text-white">Maithili Agro</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-earth-300 hover:text-white hover:bg-forest-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col space-y-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-base font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-forest-800 text-accent-gold font-semibold'
                          : 'text-earth-100 hover:bg-forest-900 hover:text-accent-leaf'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-accent-gold" />}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-forest-800 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-accent-leaf text-forest-950 font-bold py-3 rounded-full text-center shadow-lg flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Stay</span>
              </button>

              <div className="space-y-2 text-xs text-earth-300 pt-2">
                <a
                  href={`tel:${CONTACT_INFO.phones[0]}`}
                  className="flex items-center space-x-2 hover:text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-accent-leaf" />
                  <span>+91 {CONTACT_INFO.phones[0]}</span>
                </a>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-white"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-accent-leaf" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
