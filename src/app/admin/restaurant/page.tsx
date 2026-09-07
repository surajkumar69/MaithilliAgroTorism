import React from 'react';
import { db } from '@/db';
import { sectionImages } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { updateSectionImage, deleteSectionImage } from '../actions';
import { Card } from '@/components/ui/Card';

export default async function RestaurantAdmin() {
  const res = await db.select().from(sectionImages).where(eq(sectionImages.sectionKey, 'restaurant')).limit(1);
  const currentImage = res.length > 0 ? res[0].imageUrl : null;

  async function handleUpload(url: string) {
    'use server';
    await updateSectionImage('restaurant', url);
  }

  async function handleDelete() {
    'use server';
    await deleteSectionImage('restaurant');
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-serif text-forest-900">Restaurant Section</h1>
      <p className="text-earth-500">Manage the main restaurant and dining image.</p>
      
      <Card className="p-6">
        <ImageUploader 
          label="Restaurant Image"
          currentImageUrl={currentImage} 
          onUploadSuccess={handleUpload}
          onDelete={handleDelete}
        />
      </Card>
    </div>
  );
}
