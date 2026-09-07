import React from 'react';
import { db } from '@/db';
import { attractions } from '@/db/schema';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

// Server Action for deleting
async function deleteAttraction(id: number) {
  'use server';
  await db.delete(attractions).where(eq(attractions.id, id));
  revalidatePath('/admin/attractions');
}

export default async function AttractionsAdmin() {
  const allAttractions = await db.select().from(attractions);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-forest-900">Manage Attractions</h1>
        <Button>+ Add Attraction</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allAttractions.map((attr) => (
          <Card key={attr.id} className="overflow-hidden flex flex-col">
            <div className="h-40 bg-earth-200 flex items-center justify-center text-forest-500 relative">
              {attr.mainImageUrl ? (
                <span className="text-xs">Media: {attr.mainImageUrl}</span>
              ) : (
                <span>No Image</span>
              )}
              {!attr.isPublished && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Draft</span>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-forest-900">{attr.name}</h3>
                <p className="text-sm text-forest-700 capitalize">{attr.kind}</p>
              </div>
              <div className="mt-4 flex gap-2 justify-end">
                <Button variant="outline" size="sm">Edit</Button>
                <form action={deleteAttraction.bind(null, attr.id)}>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Delete</Button>
                </form>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
