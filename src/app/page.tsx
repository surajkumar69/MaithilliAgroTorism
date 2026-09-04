import React from 'react';
import { HomePageClient } from '@/components/home/HomePageClient';
import { getSiteSettings, getPublishedAttractions, getContentBlock } from '@/lib/content';
import { db } from '@/db';
import { packages, stays } from '@/db/schema';

export const revalidate = 60; // Revalidate static generation every 60 seconds

export default async function HomePage() {
  const settings = await getSiteSettings();
  const limits = settings.homepageLimits as any;
  const publishedAttractions = await getPublishedAttractions(limits?.attractions || 8);
  const quickFacts = await getContentBlock('quick_facts');
  
  // Fetch packages and stays directly from DB for the homepage
  let allPackages: any[] = [];
  let allStays: any[] = [];
  try {
    allPackages = await db.select().from(packages).limit(limits?.packages || 4);
    allStays = await db.select().from(stays).limit(limits?.stays || 4);
  } catch (e) {
    console.error('Error fetching packages/stays', e);
  }

  return (
    <HomePageClient
      settings={settings}
      attractions={publishedAttractions}
      packages={allPackages}
      stays={allStays}
      quickFacts={quickFacts}
    />
  );
}
