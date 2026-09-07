'use server';

import { db } from '@/db';
import { sectionImages, stays, attractions, galleryItems } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';

async function verifyAuth() {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
}

export async function updateSectionImage(sectionKey: string, imageUrl: string) {
  await verifyAuth();
  const existing = await db.select().from(sectionImages).where(eq(sectionImages.sectionKey, sectionKey));
  
  if (existing.length > 0) {
    await db.update(sectionImages)
      .set({ imageUrl, updatedAt: new Date() })
      .where(eq(sectionImages.sectionKey, sectionKey));
  } else {
    await db.insert(sectionImages).values({ sectionKey, imageUrl });
  }
  revalidatePath('/');
  revalidatePath(`/admin/${sectionKey}`);
}

export async function deleteSectionImage(sectionKey: string) {
  await verifyAuth();
  await db.delete(sectionImages).where(eq(sectionImages.sectionKey, sectionKey));
  revalidatePath('/');
  revalidatePath(`/admin/${sectionKey}`);
}

export async function updateStayMainImage(id: number, imageUrl: string) {
  await verifyAuth();
  await db.update(stays).set({ mainImageUrl: imageUrl, updatedAt: new Date() }).where(eq(stays.id, id));
  revalidatePath('/');
  revalidatePath('/admin/stays');
}

export async function updateAttractionMainImage(id: number, imageUrl: string) {
  await verifyAuth();
  await db.update(attractions).set({ mainImageUrl: imageUrl, updatedAt: new Date() }).where(eq(attractions.id, id));
  revalidatePath('/');
  revalidatePath('/admin/experiences');
}

export async function addGalleryItem(imageUrl: string, title: string, category: string) {
  await verifyAuth();
  await db.insert(galleryItems).values({ imageUrl, title, category });
  revalidatePath('/');
  revalidatePath('/admin/gallery');
}

export async function deleteGalleryItem(id: number) {
  await verifyAuth();
  await db.delete(galleryItems).where(eq(galleryItems.id, id));
  revalidatePath('/');
  revalidatePath('/admin/gallery');
}

export async function updateAttractionDetails(id: number, name: string, summary: string, kind: string) {
  await verifyAuth();
  await db.update(attractions).set({ name, summary, kind, updatedAt: new Date() }).where(eq(attractions.id, id));
  revalidatePath('/');
  revalidatePath('/admin/experiences');
}

export async function addStayAdditionalImage(id: number, url: string) {
  await verifyAuth();
  const stay = await db.select().from(stays).where(eq(stays.id, id));
  if (stay[0]) {
    const current = (stay[0].additionalImagesUrls as string[]) || [];
    await db.update(stays).set({ additionalImagesUrls: [...current, url], updatedAt: new Date() }).where(eq(stays.id, id));
    revalidatePath('/');
    revalidatePath('/admin/stays');
  }
}

export async function removeStayAdditionalImage(id: number, urlToRemove: string) {
  await verifyAuth();
  const stay = await db.select().from(stays).where(eq(stays.id, id));
  if (stay[0]) {
    const current = (stay[0].additionalImagesUrls as string[]) || [];
    await db.update(stays).set({ additionalImagesUrls: current.filter(u => u !== urlToRemove), updatedAt: new Date() }).where(eq(stays.id, id));
    revalidatePath('/');
    revalidatePath('/admin/stays');
  }
}

export async function addAttractionAdditionalImage(id: number, url: string) {
  await verifyAuth();
  const attr = await db.select().from(attractions).where(eq(attractions.id, id));
  if (attr[0]) {
    const current = (attr[0].additionalImagesUrls as string[]) || [];
    await db.update(attractions).set({ additionalImagesUrls: [...current, url], updatedAt: new Date() }).where(eq(attractions.id, id));
    revalidatePath('/');
    revalidatePath('/admin/experiences');
  }
}

export async function removeAttractionAdditionalImage(id: number, urlToRemove: string) {
  await verifyAuth();
  const attr = await db.select().from(attractions).where(eq(attractions.id, id));
  if (attr[0]) {
    const current = (attr[0].additionalImagesUrls as string[]) || [];
    await db.update(attractions).set({ additionalImagesUrls: current.filter(u => u !== urlToRemove), updatedAt: new Date() }).where(eq(attractions.id, id));
    revalidatePath('/');
    revalidatePath('/admin/experiences');
  }
}
