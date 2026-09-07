'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, Image as ImageIcon, Info, Home, 
  Map, PartyPopper, Utensils, Mountain, LayoutGrid, 
  MessageSquare, Settings, LogOut, Menu, X
} from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Hero', href: '/admin/hero', icon: ImageIcon },
  { name: 'About', href: '/admin/about', icon: Info },
  { name: 'Stay / Rooms', href: '/admin/stays', icon: Home },
  { name: 'Experiences', href: '/admin/experiences', icon: Map },
  { name: 'Banquet & Events', href: '/admin/banquet', icon: PartyPopper },
  { name: 'Restaurant', href: '/admin/restaurant', icon: Utensils },
  { name: 'Mountain View', href: '/admin/mountain-view', icon: Mountain },
  { name: 'Gallery', href: '/admin/gallery', icon: LayoutGrid },
  { name: 'Bookings / Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-earth-50 text-forest-900 overflow-hidden relative">
      {/* Mobile Header */}
      <div className="md:hidden absolute top-0 left-0 right-0 h-16 bg-forest-950 flex items-center justify-between px-4 z-20 border-b border-forest-800">
        <div className="flex items-center space-x-3">
          <div className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5 overflow-hidden">
            <Image src="/images/logo.png" alt="Maithili Logo" fill className="object-contain p-0.5" />
          </div>
          <span className="font-serif text-lg font-bold text-white">Maithili CMS</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2 focus:outline-none">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative z-40 w-64 h-full bg-forest-950 text-white flex flex-col border-r border-forest-800 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="hidden md:flex p-6 border-b border-forest-800 items-center space-x-3">
          <div className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5 overflow-hidden">
            <Image src="/images/logo.png" alt="Maithili Logo" fill className="object-contain p-0.5" />
          </div>
          <span className="font-serif text-lg font-bold text-white">
            Maithili CMS
          </span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 pt-20 md:pt-4">
          <ul className="space-y-1 px-3">
            {MENU_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                      isActive 
                        ? 'bg-accent-gold text-forest-950 shadow-md' 
                        : 'text-earth-300 hover:text-white hover:bg-forest-800/50'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-forest-900' : 'text-accent-gold'}`} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-forest-800 bg-forest-950">
          <button
            onClick={() => window.location.href = '/api/auth/signout'}
            className="flex items-center space-x-2 text-earth-300 hover:text-white transition-colors w-full px-3 py-2 text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-earth-50 pt-16 md:pt-0 w-full relative">
        {children}
      </main>
    </div>
  );
}
