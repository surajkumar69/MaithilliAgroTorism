'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/data';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guestsCount: '2 Guests',
    preferredDate: '',
    accommodationType: 'Luxury Mountain View Room',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please fill in your Name and Phone Number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isSupabaseConfigured() && supabase) {
        const { error: dbError } = await supabase.from('enquiries').insert([
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            guests_count: formData.guestsCount,
            preferred_date: formData.preferredDate,
            accommodation_type: formData.accommodationType,
            message: formData.message,
            status: 'pending',
          },
        ]);
        if (dbError) throw dbError;
      } else {
        const localEnquiries = JSON.parse(localStorage.getItem('maithili_enquiries') || '[]');
        localEnquiries.push({
          ...formData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          status: 'pending',
        });
        localStorage.setItem('maithili_enquiries', JSON.stringify(localEnquiries));
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
    <div className="bg-earth-50 text-forest-900 min-h-screen py-16">
      
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-forest-950 text-white rounded-3xl p-8 sm:p-12 border border-forest-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-leaf/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-semibold tracking-widest text-accent-gold uppercase bg-forest-900 px-4 py-1.5 rounded-full border border-forest-800">
              GET IN TOUCH
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold">
              Contact & Reservation Enquiries
            </h1>
            <p className="text-sm sm:text-base text-earth-300 font-light leading-relaxed">
              We are here to assist with room reservations, group bookings, family day outings, and event celebrations.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Contact Info Cards + Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Contact Information & Direct Action Buttons */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-white p-8 rounded-3xl border border-earth-200 shadow-card space-y-6">
              <h2 className="font-serif text-2xl font-bold text-forest-950 border-l-4 border-accent-gold pl-3">
                Resort Contact Details
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-accent-leaf flex-shrink-0 mt-1" />
                  <div>
                    <span className="block font-bold text-forest-950 text-xs uppercase">Location Address</span>
                    <span className="text-forest-800/80 font-light">{CONTACT_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-accent-leaf flex-shrink-0" />
                  <div>
                    <span className="block font-bold text-forest-950 text-xs uppercase">Phone Numbers</span>
                    <div className="flex flex-col text-forest-800 font-medium">
                      <a href={`tel:${CONTACT_INFO.phones[0]}`} className="hover:text-accent-leaf">
                        +91 {CONTACT_INFO.phones[0]}
                      </a>
                      <a href={`tel:${CONTACT_INFO.phones[1]}`} className="hover:text-accent-leaf">
                        +91 {CONTACT_INFO.phones[1]}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-accent-leaf flex-shrink-0" />
                  <div>
                    <span className="block font-bold text-forest-950 text-xs uppercase">Email Address</span>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-forest-800 font-medium hover:text-accent-leaf">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Quick Action Buttons */}
              <div className="pt-4 border-t border-earth-200 grid grid-cols-2 gap-3">
                <a
                  href={`tel:${CONTACT_INFO.phones[0]}`}
                  className="bg-forest-900 hover:bg-forest-800 text-white font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center space-x-2 transition-colors shadow-md"
                >
                  <Phone className="w-4 h-4 text-accent-gold" />
                  <span>Call Reception</span>
                </a>

                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center space-x-2 transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Google Maps Button Box */}
            <div className="bg-forest-950 text-white p-8 rounded-3xl border border-forest-800 space-y-4">
              <h3 className="font-serif text-xl font-bold text-white">Find Us on Google Maps</h3>
              <p className="text-xs text-earth-300">
                Located at Ambegaon, Mulshi. Easily navigate via Google Maps link below.
              </p>
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-accent-leaf hover:bg-forest-500 text-forest-950 font-bold py-3.5 px-6 rounded-2xl text-xs flex items-center justify-center space-x-2 transition-colors shadow-lg"
              >
                <span>Open Google Maps Directions</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Side: Professional Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-earth-200 shadow-card space-y-6">
              
              <div className="border-b border-earth-200 pb-4">
                <h2 className="font-serif text-2xl font-bold text-forest-950 flex items-center space-x-2">
                  <Calendar className="w-6 h-6 text-accent-leaf" />
                  <span>Online Reservation Form</span>
                </h2>
                <p className="text-xs text-forest-800/70 mt-1">
                  Send us your preferred dates and guest details. Our team will verify room availability and confirm immediately.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-forest-950">Thank You!</h3>
                  <p className="text-sm text-forest-800/80 max-w-md mx-auto">
                    Your enquiry has been received. Our team will call you back at <span className="font-bold">{formData.phone}</span> shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-forest-900 text-white font-bold px-6 py-2.5 rounded-full text-xs hover:bg-forest-800 transition-colors"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-100 border border-red-300 text-red-800 text-xs p-3 rounded-xl">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-earth-50 border border-earth-300 rounded-xl px-4 py-3 text-sm text-forest-950 focus:outline-none focus:border-forest-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-forest-900 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="9156374545"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-earth-50 border border-earth-300 rounded-xl px-4 py-3 text-sm text-forest-950 focus:outline-none focus:border-forest-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-forest-900 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-earth-50 border border-earth-300 rounded-xl px-4 py-3 text-sm text-forest-950 focus:outline-none focus:border-forest-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-forest-900 mb-1">
                        Number of Guests
                      </label>
                      <select
                        value={formData.guestsCount}
                        onChange={(e) => setFormData({ ...formData, guestsCount: e.target.value })}
                        className="w-full bg-earth-50 border border-earth-300 rounded-xl px-4 py-3 text-sm text-forest-950 focus:outline-none focus:border-forest-700"
                      >
                        <option value="1-2 Guests">1-2 Guests</option>
                        <option value="3-5 Family Guests">3-5 Family Guests</option>
                        <option value="6-10 Guests">6-10 Guests</option>
                        <option value="10-20 Group/Corporate">10-20 Group/Corporate</option>
                        <option value="20+ Large Group">20+ Large Group</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-forest-900 mb-1">
                        Preferred Arrival Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-earth-50 border border-earth-300 rounded-xl px-4 py-3 text-sm text-forest-950 focus:outline-none focus:border-forest-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1">
                      Accommodation Type
                    </label>
                    <select
                      value={formData.accommodationType}
                      onChange={(e) => setFormData({ ...formData, accommodationType: e.target.value })}
                      className="w-full bg-earth-50 border border-earth-300 rounded-xl px-4 py-3 text-sm text-forest-950 focus:outline-none focus:border-forest-700"
                    >
                      <option value="Luxury Mountain View Room">Luxury Mountain View Room</option>
                      <option value="Group Dormitory Stay">Group Dormitory Stay</option>
                      <option value="Banquet & Event Function">Banquet & Event Function</option>
                      <option value="Day Package Experience">Day Package Experience</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1">
                      Your Message / Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write any special requests regarding food, room view, or arrival time..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-earth-50 border border-earth-300 rounded-xl px-4 py-3 text-sm text-forest-950 focus:outline-none focus:border-forest-700"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-forest-900 hover:bg-forest-800 text-white font-bold py-4 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <span>Sending Reservation Request...</span>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 text-accent-gold" />
                        <span>Submit Reservation Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Embedded Google Maps Container */}
        <div className="bg-white p-4 rounded-3xl border border-earth-200 shadow-card overflow-hidden">
          <div className="mb-4 px-4 pt-2">
            <h3 className="font-serif text-xl font-bold text-forest-950">Resort Location Map</h3>
            <p className="text-xs text-forest-800/70">Gat No 736, At Ambegaon, Post Urawade, Taluka Mulshi, District Pune 412115</p>
          </div>
          <div className="relative h-96 w-full rounded-2xl overflow-hidden border border-earth-200">
            <iframe
              src="https://maps.google.com/maps?q=18.5000,73.6000&hl=en&z=14&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Maithili Agro Tourism Google Maps Location"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
