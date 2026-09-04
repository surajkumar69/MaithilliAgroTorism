'use client';

import React from 'react';
import Link from 'next/link';
import { Trees, Phone, Mail, MapPin, ExternalLink, Instagram, Facebook, Youtube, Heart } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/data';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-950 text-earth-200 border-t border-forest-800/80 pt-16 pb-8 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-forest-800/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-leaf/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-forest-800/60">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-forest-800 border border-accent-gold/40 flex items-center justify-center text-accent-leaf">
                <Trees className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-white tracking-wide">
                  Maithili Agro Tourism
                </span>
                <span className="block text-[10px] text-accent-gold tracking-widest uppercase">
                  Resort & Nature Retreat
                </span>
              </div>
            </div>
            <p className="text-sm text-earth-300 leading-relaxed">
              Experience the serene charm of Maharashtra countryside near Pune. Escape into nature with 360° mountain views, authentic dining, swimming pool, sports turf, and family activities.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest-900 border border-forest-800 flex items-center justify-center text-earth-300 hover:text-accent-gold hover:border-accent-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest-900 border border-forest-800 flex items-center justify-center text-earth-300 hover:text-accent-gold hover:border-accent-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest-900 border border-forest-800 flex items-center justify-center text-earth-300 hover:text-accent-gold hover:border-accent-gold transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white tracking-wide border-l-2 border-accent-gold pl-3">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-accent-leaf transition-colors flex items-center space-x-1.5">
                  <span className="text-accent-gold text-xs">›</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent-leaf transition-colors flex items-center space-x-1.5">
                  <span className="text-accent-gold text-xs">›</span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/stay" className="hover:text-accent-leaf transition-colors flex items-center space-x-1.5">
                  <span className="text-accent-gold text-xs">›</span>
                  <span>Stay & Accommodations</span>
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-accent-leaf transition-colors flex items-center space-x-1.5">
                  <span className="text-accent-gold text-xs">›</span>
                  <span>Experiences & Activities</span>
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="hover:text-accent-leaf transition-colors flex items-center space-x-1.5">
                  <span className="text-accent-gold text-xs">›</span>
                  <span>Resort Amenities</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-accent-leaf transition-colors flex items-center space-x-1.5">
                  <span className="text-accent-gold text-xs">›</span>
                  <span>Photo Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-leaf transition-colors flex items-center space-x-1.5">
                  <span className="text-accent-gold text-xs">›</span>
                  <span>Contact & Bookings</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Accommodations & Experiences */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white tracking-wide border-l-2 border-accent-gold pl-3">
              Resort Highlights
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/stay" className="hover:text-accent-leaf transition-colors">
                  Mountain View Rooms
                </Link>
              </li>
              <li>
                <Link href="/stay" className="hover:text-accent-leaf transition-colors">
                  Large Group Dormitory
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-accent-leaf transition-colors">
                  Tractor & Bullock Cart Rides
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="hover:text-accent-leaf transition-colors">
                  Night Swimming Pool
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="hover:text-accent-leaf transition-colors">
                  Multi-Sports Turf & Pickleball
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-accent-leaf transition-colors">
                  Destination Banquet Hall
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white tracking-wide border-l-2 border-accent-gold pl-3">
              Reach Us
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent-leaf flex-shrink-0 mt-0.5" />
                <span className="text-earth-300 leading-snug">
                  {CONTACT_INFO.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent-leaf flex-shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${CONTACT_INFO.phones[0]}`} className="hover:text-accent-gold transition-colors">
                    +91 {CONTACT_INFO.phones[0]}
                  </a>
                  <a href={`tel:${CONTACT_INFO.phones[1]}`} className="hover:text-accent-gold transition-colors">
                    +91 {CONTACT_INFO.phones[1]}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent-leaf flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-accent-gold transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-forest-900 hover:bg-forest-800 text-accent-gold px-4 py-2 rounded-full text-xs font-semibold border border-forest-700 transition-colors"
              >
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-earth-400 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Maithili Agro Tourism. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/contact" className="hover:text-earth-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-earth-200 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/admin" className="hover:text-accent-gold transition-colors text-earth-400">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
