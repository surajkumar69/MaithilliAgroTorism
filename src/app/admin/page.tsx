'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Trees,
  Lock,
  LayoutDashboard,
  BedDouble,
  Compass,
  Camera,
  MessageSquare,
  BarChart3,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Database,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import {
  INITIAL_ACCOMMODATIONS,
  INITIAL_ACTIVITIES,
  INITIAL_GALLERY,
  INITIAL_STATS,
} from '@/lib/data';
import { Accommodation, Activity, GalleryItem, Statistic, Enquiry } from '@/lib/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<
    'enquiries' | 'accommodations' | 'activities' | 'gallery' | 'stats'
  >('enquiries');

  // State arrays initialized with default mock or database state
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>(INITIAL_ACCOMMODATIONS);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [stats, setStats] = useState<Statistic[]>(INITIAL_STATS);

  // New Item Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAccTitle, setNewAccTitle] = useState('');
  const [newAccCapacity, setNewAccCapacity] = useState('2-4 Guests');
  const [newAccDesc, setNewAccDesc] = useState('');
  const [newAccType, setNewAccType] = useState<'room' | 'dormitory'>('room');

  useEffect(() => {
    // Check if authenticated via NextAuth session cookie
    if (typeof window !== 'undefined') {
      const cookies = document.cookie || '';
      if (
        cookies.includes('authjs.session-token') ||
        cookies.includes('next-auth.session-token') ||
        cookies.includes('__Secure-authjs.session-token') ||
        cookies.includes('__Secure-next-auth.session-token')
      ) {
        setAuthenticated(true);
      }
    }
    loadEnquiries();
  }, [authenticated]);

  const handleLogout = () => {
    setAuthenticated(false);
    // Clear session cookies
    document.cookie = 'authjs.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/admin/login';
  };

  const loadEnquiries = async () => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('enquiries')
          .select('*')
          .order('created_at', { ascending: false });
        if (data) setEnquiries(data as any);
      } catch (err) {
        console.error('Supabase fetch error:', err);
      }
    } else {
      const local = JSON.parse(localStorage.getItem('maithili_enquiries') || '[]');
      if (local.length > 0) {
        setEnquiries(local);
      } else {
        // Sample default lead for admin preview
        setEnquiries([
          {
            id: 'demo-1',
            name: 'Rajesh Patil',
            phone: '9822012345',
            email: 'rajesh.patil@example.com',
            guestsCount: '4 Family Guests',
            preferredDate: '2026-09-15',
            accommodationType: 'Luxury Mountain View Rooms',
            message: 'Looking for a weekend stay with pool access and tractor ride for kids.',
            status: 'pending',
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'maithili2026' || passcode === 'password') {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid admin passcode. Try: password or admin123');
    }
  };

  const handleDeleteEnquiry = (id: string) => {
    const updated = enquiries.filter((item) => item.id !== id);
    setEnquiries(updated);
    if (!isSupabaseConfigured()) {
      localStorage.setItem('maithili_enquiries', JSON.stringify(updated));
    }
  };

  const handleAddAccommodation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccTitle) return;

    const newItem: Accommodation = {
      id: Date.now().toString(),
      title: newAccTitle,
      slug: newAccTitle.toLowerCase().replace(/\s+/g, '-'),
      type: newAccType,
      capacity: newAccCapacity,
      description: newAccDesc || 'Newly added accommodation option.',
      features: ['Air Conditioning', 'Ensuite Bathroom', 'Valley View', 'Pool Access'],
      imageUrl: '/images/hero-resort.jpeg',
    };

    setAccommodations([newItem, ...accommodations]);
    setNewAccTitle('');
    setNewAccDesc('');
    setShowAddModal(false);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-forest-950 flex items-center justify-center p-4">
        <div className="bg-forest-900 border border-forest-800 p-8 rounded-3xl max-w-md w-full text-white space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-forest-800 border border-accent-gold/50 flex items-center justify-center text-accent-leaf mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-2xl font-bold">Resort Admin Portal</h1>
            <p className="text-xs text-earth-300">
              Maithili Agro Tourism Content & Enquiry Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="bg-red-900/50 border border-red-500/50 text-red-200 text-xs p-3 rounded-xl">
                {authError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-earth-200 mb-1">
                Admin Passcode
              </label>
              <input
                type="password"
                placeholder="Enter passcode (default: admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-forest-950 border border-forest-800 rounded-xl px-4 py-3 text-sm text-white placeholder-earth-400 focus:outline-none focus:border-accent-leaf"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent-leaf hover:bg-forest-500 text-forest-950 font-bold py-3 rounded-xl text-sm transition-all shadow-lg"
            >
              Sign In to Dashboard
            </button>
          </form>

          <p className="text-[11px] text-earth-400 text-center">
            Hint: Default passkey is <code className="text-accent-gold font-mono">admin123</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* Main Admin Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-6">
        
        {/* Supabase Configuration Guidance Banner */}
        {!isSupabaseConfigured() && (
          <div className="bg-amber-900/20 border border-amber-500/40 p-4 rounded-2xl flex items-start justify-between gap-4 text-xs text-amber-900">
            <div className="space-y-1">
              <span className="font-bold flex items-center space-x-1">
                <Database className="w-4 h-4 text-amber-700" />
                <span>Supabase PostgreSQL Integration Ready</span>
              </span>
              <p className="text-amber-800">
                To link your live database, add your Supabase project keys to <code className="bg-amber-200/60 px-1 py-0.5 rounded font-mono">.env.local</code> and run <code className="bg-amber-200/60 px-1 py-0.5 rounded font-mono">supabase/schema.sql</code> in your Supabase SQL Editor.
              </p>
            </div>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 border-b border-earth-200 pb-3">
          {[
            { id: 'enquiries', label: `Customer Enquiries (${enquiries.length})`, icon: MessageSquare },
            { id: 'accommodations', label: `Accommodations (${accommodations.length})`, icon: BedDouble },
            { id: 'activities', label: `Activities (${activities.length})`, icon: Compass },
            { id: 'gallery', label: `Gallery (${gallery.length})`, icon: Camera },
            { id: 'stats', label: 'Resort Statistics', icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-forest-900 text-accent-gold shadow-md'
                    : 'bg-white text-forest-800 border border-earth-200 hover:bg-earth-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ENQUIRIES MANAGEMENT */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl border border-earth-200 shadow-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-earth-200">
              <h2 className="font-serif text-xl font-bold text-forest-950">
                Customer Booking Enquiries
              </h2>
              <button
                onClick={loadEnquiries}
                className="text-xs bg-earth-100 hover:bg-earth-200 text-forest-900 font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Leads</span>
              </button>
            </div>

            {enquiries.length === 0 ? (
              <div className="py-12 text-center text-xs text-forest-800/60">
                No customer enquiries submitted yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-earth-100 text-forest-900 font-bold uppercase border-b border-earth-200">
                    <tr>
                      <th className="p-3">Guest Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Accommodation</th>
                      <th className="p-3">Guests</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Message</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-earth-100">
                    {enquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-earth-50">
                        <td className="p-3 font-bold text-forest-950">{enq.name}</td>
                        <td className="p-3">
                          <a href={`tel:${enq.phone}`} className="text-forest-700 font-semibold underline">
                            {enq.phone}
                          </a>
                        </td>
                        <td className="p-3">{enq.accommodationType || 'General Stay'}</td>
                        <td className="p-3">{enq.guestsCount || '-'}</td>
                        <td className="p-3">{enq.preferredDate || '-'}</td>
                        <td className="p-3 max-w-xs truncate">{enq.message || '-'}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleDeleteEnquiry(enq.id!)}
                            className="text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ACCOMMODATIONS MANAGEMENT */}
        {activeTab === 'accommodations' && (
          <div className="bg-white rounded-3xl border border-earth-200 shadow-card p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-earth-200">
              <h2 className="font-serif text-xl font-bold text-forest-950">
                Manage Accommodations
              </h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-forest-900 text-accent-gold hover:bg-forest-800 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Accommodation</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accommodations.map((acc) => (
                <div
                  key={acc.id}
                  className="bg-earth-50 p-5 rounded-2xl border border-earth-200 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase text-accent-gold bg-forest-950 px-2.5 py-1 rounded-full">
                      {acc.type}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-forest-950">{acc.title}</h3>
                    <p className="text-xs text-forest-800/80">{acc.description}</p>
                    <p className="text-xs font-semibold text-forest-900">Capacity: {acc.capacity}</p>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2 border-t border-earth-200">
                    <button
                      onClick={() =>
                        setAccommodations(accommodations.filter((item) => item.id !== acc.id))
                      }
                      className="text-red-600 hover:text-red-800 text-xs font-semibold flex items-center space-x-1 px-3 py-1.5 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ACTIVITIES MANAGEMENT */}
        {activeTab === 'activities' && (
          <div className="bg-white rounded-3xl border border-earth-200 shadow-card p-6 space-y-6">
            <h2 className="font-serif text-xl font-bold text-forest-950 pb-4 border-b border-earth-200">
              Manage Activities & Experiences
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {activities.map((act) => (
                <div key={act.id} className="bg-earth-50 p-4 rounded-2xl border border-earth-200 space-y-2">
                  <span className="text-[10px] font-semibold text-forest-700 uppercase bg-earth-200 px-2 py-0.5 rounded">
                    {act.category}
                  </span>
                  <h4 className="font-bold text-sm text-forest-950">{act.title}</h4>
                  <p className="text-xs text-forest-800/70">{act.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-3xl border border-earth-200 shadow-card p-6 space-y-6">
            <h2 className="font-serif text-xl font-bold text-forest-950 pb-4 border-b border-earth-200">
              Gallery Images
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {gallery.map((img) => (
                <div key={img.id} className="relative h-40 rounded-2xl overflow-hidden border border-earth-200">
                  <Image src={img.imageUrl} alt={img.title} fill className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-black/70 p-2 text-[10px] text-white font-semibold truncate">
                    {img.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: STATS MANAGEMENT */}
        {activeTab === 'stats' && (
          <div className="bg-white rounded-3xl border border-earth-200 shadow-card p-6 space-y-6">
            <h2 className="font-serif text-xl font-bold text-forest-950 pb-4 border-b border-earth-200">
              Resort Display Counters & Statistics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((st) => (
                <div key={st.id} className="bg-earth-50 p-4 rounded-2xl border border-earth-200 space-y-2">
                  <label className="block text-xs font-bold text-forest-900">{st.label}</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={st.valueNumber}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setStats(
                          stats.map((item) =>
                            item.id === st.id ? { ...item, valueNumber: val } : item
                          )
                        );
                      }}
                      className="bg-white border border-earth-300 rounded-lg px-3 py-1.5 text-sm font-bold text-forest-950 w-32"
                    />
                    <span className="text-sm font-bold text-forest-700">{st.suffix}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Add Accommodation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="font-serif text-xl font-bold text-forest-950">Add New Accommodation</h3>
            <form onSubmit={handleAddAccommodation} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-forest-900 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deluxe Family Villa"
                  value={newAccTitle}
                  onChange={(e) => setNewAccTitle(e.target.value)}
                  className="w-full border border-earth-300 rounded-lg p-2 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-forest-900 mb-1">Type</label>
                <select
                  value={newAccType}
                  onChange={(e: any) => setNewAccType(e.target.value)}
                  className="w-full border border-earth-300 rounded-lg p-2 text-sm"
                >
                  <option value="room">Luxury Room</option>
                  <option value="dormitory">Group Dormitory</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-forest-900 mb-1">Capacity</label>
                <input
                  type="text"
                  placeholder="e.g. 4 Guests"
                  value={newAccCapacity}
                  onChange={(e) => setNewAccCapacity(e.target.value)}
                  className="w-full border border-earth-300 rounded-lg p-2 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-forest-900 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newAccDesc}
                  onChange={(e) => setNewAccDesc(e.target.value)}
                  className="w-full border border-earth-300 rounded-lg p-2 text-sm"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-earth-200 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-forest-900 text-white rounded-lg font-bold">
                  Save Accommodation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
