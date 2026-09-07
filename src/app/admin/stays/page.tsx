import React from 'react';
import { db } from '@/db';
import { stays } from '@/db/schema';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { updateStayMainImage, addStayAdditionalImage, removeStayAdditionalImage } from '../actions';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

export default async function StaysAdmin() {
  const allStays = await db.select().from(stays).orderBy(stays.sortOrder);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-serif text-forest-900">Stay & Rooms Images</h1>
      <p className="text-earth-500">Manage main and additional photos for each room type.</p>
      
      <div className="space-y-8">
        {allStays.map((stay) => {
          const additionalPhotos = (stay.additionalImagesUrls as string[]) || [];

          async function handleMainUpload(url: string) {
            'use server';
            await updateStayMainImage(stay.id, url);
          }

          async function handleAddPhoto(url: string) {
            'use server';
            await addStayAdditionalImage(stay.id, url);
          }

          return (
            <Card key={stay.id} className="p-6">
              <h3 className="font-bold text-xl text-forest-950 mb-1">{stay.name}</h3>
              <p className="text-sm text-earth-500 mb-6">{stay.kind} | {stay.summary}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold text-forest-900 mb-3">Main Cover Photo</h4>
                  <ImageUploader 
                    label=""
                    currentImageUrl={stay.mainImageUrl} 
                    onUploadSuccess={handleMainUpload}
                  />
                </div>
                
                <div>
                  <h4 className="text-sm font-bold text-forest-900 mb-3">Additional Photos ({additionalPhotos.length})</h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {additionalPhotos.map((url, idx) => {
                      async function handleRemove() {
                        'use server';
                        await removeStayAdditionalImage(stay.id, url);
                      }
                      return (
                        <div key={idx} className="relative aspect-video rounded-lg overflow-hidden group border border-earth-300">
                          <Image src={url} alt="Room view" fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <form action={handleRemove}>
                              <button type="submit" className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </form>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <ImageUploader 
                    label="Add New Photo"
                    onUploadSuccess={handleAddPhoto}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
