import React from 'react';
import { db } from '@/db';
import { attractions, packages, stays } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { Card } from '@/components/ui/Card';

export default async function AdminDashboard() {
  // Fetch some quick stats for the dashboard
  const [{ count: attractionsCount }] = await db.select({ count: sql<number>`count(*)` }).from(attractions);
  const [{ count: packagesCount }] = await db.select({ count: sql<number>`count(*)` }).from(packages);
  const [{ count: staysCount }] = await db.select({ count: sql<number>`count(*)` }).from(stays);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif text-forest-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-l-accent-leaf">
          <h3 className="text-lg text-forest-700 font-medium">Total Attractions</h3>
          <p className="text-4xl font-serif text-forest-900 mt-2">{attractionsCount}</p>
        </Card>
        
        <Card className="p-6 border-l-4 border-l-accent-gold">
          <h3 className="text-lg text-forest-700 font-medium">Total Packages</h3>
          <p className="text-4xl font-serif text-forest-900 mt-2">{packagesCount}</p>
        </Card>
        
        <Card className="p-6 border-l-4 border-l-earth-700">
          <h3 className="text-lg text-forest-700 font-medium">Total Stays</h3>
          <p className="text-4xl font-serif text-forest-900 mt-2">{staysCount}</p>
        </Card>
      </div>
    </div>
  );
}
