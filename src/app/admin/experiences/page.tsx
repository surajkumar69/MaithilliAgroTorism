import React from 'react';
import { db } from '@/db';
import { attractions } from '@/db/schema';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { updateAttractionMainImage, updateAttractionDetails, addAttractionAdditionalImage, removeAttractionAdditionalImage } from '../actions';
import { Card } from '@/components/ui/Card';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

export default async function ExperiencesAdmin() {
  const allAttractions = await db.select().from(attractions).orderBy(attractions.sortOrder);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-serif text-forest-900">Experiences & Activities</h1>
      <p className="text-earth-500">Manage photos, titles, and descriptions for all activities.</p>
      
      <div className="space-y-8">
        {allAttractions.map((attr) => {
          const additionalPhotos = (attr.additionalImagesUrls as string[]) || [];

          async function handleMainUpload(url: string) {
            'use server';
            await updateAttractionMainImage(attr.id, url);
          }

          async function handleAddPhoto(url: string) {
            'use server';
            await addAttractionAdditionalImage(attr.id, url);
          }
          
          async function handleSaveDetails(formData: FormData) {
            'use server';
            const name = formData.get('name') as string;
            const summary = formData.get('summary') as string;
            const kind = formData.get('kind') as string;
            await updateAttractionDetails(attr.id, name, summary, kind);
          }

          return (
            <Card key={attr.id} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Col: Edit Details */}
                <div className="lg:col-span-1 space-y-4">
                  <h3 className="font-bold text-xl text-forest-950 mb-4 border-b pb-2">Edit Details</h3>
                  <form action={handleSaveDetails} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-forest-900 mb-1">Title</label>
                      <input type="text" name="name" defaultValue={attr.name} className="w-full border rounded px-3 py-2 text-sm" />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-forest-900 mb-1">Category</label>
                      <input type="text" name="kind" defaultValue={attr.kind} className="w-full border rounded px-3 py-2 text-sm" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-forest-900 mb-1">Description</label>
                      <textarea name="summary" defaultValue={attr.summary || ''} className="w-full border rounded px-3 py-2 text-sm h-32" />
                    </div>
                    
                    <button type="submit" className="bg-forest-900 text-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-forest-800 w-full">
                      Save Details
                    </button>
                  </form>
                </div>

                {/* Right Col: Images */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-bold text-forest-900 mb-3">Main Cover Photo</h4>
                    <ImageUploader 
                      label=""
                      currentImageUrl={attr.mainImageUrl} 
                      onUploadSuccess={handleMainUpload}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold text-forest-900 mb-3">Additional Photos ({additionalPhotos.length})</h4>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {additionalPhotos.map((url, idx) => {
                        async function handleRemove() {
                          'use server';
                          await removeAttractionAdditionalImage(attr.id, url);
                        }
                        return (
                          <div key={idx} className="relative aspect-video rounded-lg overflow-hidden group border border-earth-300">
                            <Image src={url} alt="Activity view" fill className="object-cover" />
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

              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
