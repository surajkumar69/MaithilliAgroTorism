import React from 'react';
import { db } from '@/db';
import { packages, stays } from '@/db/schema';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default async function PackagesStaysAdmin() {
  const allPackages = await db.select().from(packages);
  const allStays = await db.select().from(stays);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      {/* Packages Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-forest-900">Day Packages</h2>
          <Button>+ Add Package</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allPackages.length === 0 && (
            <p className="text-forest-700 italic">No packages found. Create one to get started.</p>
          )}
          {allPackages.map((pkg) => (
            <Card key={pkg.id} className="p-6">
              <h3 className="font-bold text-xl text-forest-900">{pkg.name}</h3>
              <p className="text-forest-700 mt-2">{pkg.description}</p>
              <div className="mt-4 flex gap-4 text-sm font-medium">
                <div>Adult: ₹{pkg.priceAdultInr}</div>
                <div>Child: ₹{pkg.priceChildInr}</div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-200">Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Stays Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-forest-900">Overnight Stays</h2>
          <Button>+ Add Stay</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allStays.length === 0 && (
            <p className="text-forest-700 italic">No stays found. Create one to get started.</p>
          )}
          {allStays.map((stay) => (
            <Card key={stay.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl text-forest-900">{stay.name}</h3>
                  <span className="inline-block bg-earth-200 text-forest-800 text-xs px-2 py-1 rounded mt-1 capitalize">{stay.kind}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">₹{stay.pricePerNightInr}/night</div>
                  <div className="text-xs text-forest-700">Capacity: {stay.maxOccupancy}</div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-200">Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
