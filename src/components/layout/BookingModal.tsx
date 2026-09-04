'use client';

import React, { useState } from 'react';
import { X, Calendar, Phone, MessageSquare, CheckCircle2, MapPin, Mail } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/data';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAccommodation?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultAccommodation = 'Luxury Mountain View Room',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guestsCount: '2 Guests',
    preferredDate: '',
    accommodationType: defaultAccommodation,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please fill in your Name and Phone Number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError('An error occurred submitting your enquiry. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-forest-950 text-white rounded-3xl shadow-2xl border border-forest-800 p-6 md:p-8 z-10 my-8 overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-leaf/10 rounded-full filter blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-earth-300 hover:text-white bg-forest-900 p-1.5 rounded-full hover:bg-forest-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-accent-leaf/20 text-accent-leaf rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">Enquiry Received!</h3>
            <p className="text-sm text-earth-200 max-w-md mx-auto">
              Thank you, <span className="text-accent-gold font-semibold">{formData.name}</span>. Our team at Maithili Agro Tourism will process your enquiry. Click below to continue on WhatsApp to confirm availability immediately.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `Hello Maithili Agro Tourism,\n\nI just submitted an enquiry on your website.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nGuests: ${formData.guestsCount}\nDate: ${formData.preferredDate || 'Not specified'}\nInterest: ${formData.accommodationType}\n\nPlease confirm availability!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Continue on WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-forest-900 text-earth-100 px-6 py-2.5 rounded-full text-sm hover:bg-forest-800 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 border-b border-forest-800/80 pb-4">
              <span className="text-xs font-semibold text-accent-gold tracking-widest uppercase block mb-1">
                MAITHILI AGRO TOURISM
              </span>
              <h2 className="font-serif text-2xl font-bold text-white flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-accent-leaf" />
                <span>Book Your Stay</span>
              </h2>
              <p className="text-xs text-earth-300 mt-1">
                Fill in your details below and our resort reception will contact you immediately.
              </p>
            </div>

            {error && (
              <div className="mb-4 bg-red-900/40 border border-red-500/50 text-red-200 text-xs p-3 rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-earth-200 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-forest-900 border border-forest-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-earth-400 focus:outline-none focus:border-accent-leaf"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-earth-200 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9156374545"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-forest-900 border border-forest-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-earth-400 focus:outline-none focus:border-accent-leaf"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-earth-200 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-forest-900 border border-forest-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-earth-400 focus:outline-none focus:border-accent-leaf"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-earth-200 mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={formData.guestsCount}
                    onChange={(e) => setFormData({ ...formData, guestsCount: e.target.value })}
                    className="w-full bg-forest-900 border border-forest-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent-leaf"
                  >
                    <option value="1-2 Guests">1-2 Guests</option>
                    <option value="3-5 Family Guests">3-5 Family Guests</option>
                    <option value="6-10 Guests">6-10 Guests</option>
                    <option value="10-20 Group/Corporate">10-20 Group/Corporate</option>
                    <option value="20+ Large Group">20+ Large Group</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-earth-200 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-forest-900 border border-forest-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent-leaf"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-earth-200 mb-1">
                  Accommodation Preference
                </label>
                <select
                  value={formData.accommodationType}
                  onChange={(e) => setFormData({ ...formData, accommodationType: e.target.value })}
                  className="w-full bg-forest-900 border border-forest-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent-leaf"
                >
                  <option value="Luxury Mountain View Rooms">Luxury Mountain View Rooms</option>
                  <option value="Spacious Group Dormitory Stay">Spacious Group Dormitory Stay</option>
                  <option value="Banquet / Event Celebration">Banquet / Event Celebration</option>
                  <option value="Day Package / Farm Experience">Day Package / Farm Experience</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-earth-200 mb-1">
                  Special Requests / Message
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about food preferences, special occasions, or arrival time..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-forest-900 border border-forest-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-earth-400 focus:outline-none focus:border-accent-leaf"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent-leaf hover:bg-forest-500 text-forest-950 font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-glow flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>Submitting Enquiry...</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Submit Reservation Enquiry</span>
                  </>
                )}
              </button>
            </form>

            {/* Direct Quick Action Buttons */}
            <div className="mt-6 pt-4 border-t border-forest-800 flex flex-wrap gap-2 justify-between text-xs">
              <a
                href={`tel:${CONTACT_INFO.phones[0]}`}
                className="flex-1 bg-forest-900 hover:bg-forest-800 text-earth-100 py-2 px-3 rounded-lg border border-forest-800 flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-accent-leaf" />
                <span>Call Now</span>
              </a>

              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 py-2 px-3 rounded-lg border border-emerald-800 flex items-center justify-center space-x-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-forest-900 hover:bg-forest-800 text-accent-gold py-2 px-3 rounded-lg border border-forest-800 flex items-center justify-center space-x-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
