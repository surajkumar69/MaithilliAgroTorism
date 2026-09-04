import React from 'react';
import Link from 'next/link';
import { Settings, Image as ImageIcon, Box, LogOut, MessageSquare } from 'lucide-react';
import { signOut } from '@/lib/auth'; // Wait, this needs to be a server action or client component. We will create a simple logout button component.

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-earth-100">
      {/* Sidebar */}
      <aside className="w-64 bg-forest-900 text-earth-50 flex flex-col">
        <div className="p-6 border-b border-forest-800">
          <h2 className="font-serif text-2xl">Maithili Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/attractions" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-forest-800 transition-colors">
            <ImageIcon size={20} />
            <span>Attractions</span>
          </Link>
          <Link href="/admin/packages" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-forest-800 transition-colors">
            <Box size={20} />
            <span>Packages & Stays</span>
          </Link>
          <Link href="/admin/enquiries" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-forest-800 transition-colors">
            <MessageSquare size={20} />
            <span>Enquiries</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-forest-800 transition-colors">
            <Settings size={20} />
            <span>Site Settings</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-forest-800">
          <form action={async () => {
            'use server';
            const { signOut } = await import('@/lib/auth');
            await signOut({ redirectTo: '/' });
          }}>
            <button type="submit" className="flex items-center gap-3 w-full px-4 py-3 rounded hover:bg-forest-800 transition-colors text-left">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-earth-50">
        {children}
      </main>
    </div>
  );
}
