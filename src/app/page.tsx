import React from 'react';
import { HomePageClient } from '@/components/home/HomePageClient';
import { getSiteSettings, getPublishedAttractions, getContentBlock, getSectionImagesMap, getGallery } from '@/lib/content';
import { db } from '@/db';
import { packages, stays, attractions } from '@/db/schema';

export const revalidate = 60; // Revalidate static generation every 60 seconds

export default async function HomePage() {
  const settings = await getSiteSettings();
  const limits = settings.homepageLimits as any;
  const publishedAttractions = await getPublishedAttractions(limits?.attractions || 8);
  const quickFacts = await getContentBlock('quick_facts');
  const sectionImagesMap = await getSectionImagesMap();
  const gallery = await getGallery();
  
  // Fetch packages, stays, and all attractions directly from DB
  let allPackages: any[] = [];
  let allStays: any[] = [];
  let allAttractions: any[] = [];
  try {
    allPackages = await db.select().from(packages).limit(limits?.packages || 4);
    allStays = await db.select().from(stays).limit(limits?.stays || 4);
    allAttractions = await db.select().from(attractions);
  } catch (e) {
    console.error('Error fetching data', e);
  }

  return (
    <HomePageClient
      settings={settings}
      attractions={allAttractions}
      packages={allPackages}
      stays={allStays}
      quickFacts={quickFacts}
      sectionImages={sectionImagesMap}
      gallery={gallery}
    />
  );
}
