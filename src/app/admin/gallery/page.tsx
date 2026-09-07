import React from 'react';
import { db } from '@/db';
import { galleryItems } from '@/db/schema';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { addGalleryItem, deleteGalleryItem } from '../actions';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

export default async function GalleryAdmin() {
  const items = await db.select().from(galleryItems).orderBy(galleryItems.sortOrder, galleryItems.id);

  async function handleUpload(url: string) {
    'use server';
    // Simplified gallery upload (adds a generic title/category, admin can edit later if needed, or we just keep it simple)
    await addGalleryItem(url, 'New Gallery Image', 'Resort');
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-serif text-forest-900">Gallery Management</h1>
      
      <Card className="p-6">
        <h3 className="font-bold mb-4">Upload New Photo to Gallery</h3>
        <ImageUploader onUploadSuccess={handleUpload} label="Upload Image" />
      </Card>

      <div>
        <h3 className="font-bold text-lg mb-4 text-forest-950">Current Gallery Photos ({items.length})</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => {
            async function handleDelete() {
              'use server';
              await deleteGalleryItem(item.id);
            }
            
            return (
              <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden border border-earth-300 group">
                <Image src={item.imageUrl} alt={item.title || 'Gallery item'} fill className="object-cover" />
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-3 transition-opacity">
                  <div className="text-white text-xs font-medium">
                    <p>{item.title}</p>
                    <p className="text-accent-gold">{item.category}</p>
                  </div>
                  
                  <form action={handleDelete}>
                    <button type="submit" className="bg-red-500 w-full py-2 rounded-lg text-white hover:bg-red-600 transition flex items-center justify-center space-x-1">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
