import { db } from '@/db';
import { 
  siteSettings, 
  attractions, 
  packages, 
  stays,
  contentBlocks
} from '@/db/schema';
import { eq } from 'drizzle-orm';

// Static Fallback Data
const fallbackSettings = {
  businessName: 'Maithili Agro Tourism',
  phone: '9156374545',
  phoneAlt: '9175684545',
  whatsappNumber: '9156374545',
  email: 'maithiliagro@gmail.com',
  address: 'Gat No 736, At Ambegaon, Post Urawade, Tal. Mulshi, Dist. Pune 412115',
  homepageLimits: { attractions: 8, packages: 4, stays: 4, reviews: 6, videos: 3 },
  heroTitle: 'Experience Nature in Mulshi',
  heroSubtitle: 'A perfect getaway with 360° Sahyadri views.',
};

const fallbackAttractions = [
  { id: 1, slug: 'swimming-pool', name: 'Swimming Pool', kind: 'water', isFree: true, isPublished: true },
  { id: 2, slug: 'sports-turf', name: 'Turf', kind: 'sport', isFree: true, isPublished: true },
  { id: 3, slug: 'mountain-view', name: '360° Mountain View', kind: 'nature', isFree: true, isPublished: true },
];

const fallbackContentBlocks = {
  quick_facts: {
    facts: ['45 min from Pune', '25 acres', '360° view', 'open all year']
  }
};

/**
 * Fetch site settings with static fallback.
 */
export async function getSiteSettings() {
  try {
    const res = await db.select().from(siteSettings).limit(1);
    if (res.length > 0) return res[0];
  } catch (error) {
    console.error('Failed to fetch site settings from DB. Using fallback.', error);
  }
  return fallbackSettings;
}

/**
 * Fetch published attractions with static fallback.
 */
export async function getPublishedAttractions(limit?: number) {
  try {
    let query = db.select().from(attractions).where(eq(attractions.isPublished, true));
    if (limit) {
      // @ts-ignore
      query = query.limit(limit);
    }
    const res = await query;
    if (res.length > 0) return res;
  } catch (error) {
    console.error('Failed to fetch attractions from DB. Using fallback.', error);
  }
  return fallbackAttractions;
}

/**
 * Fetch a content block by key with static fallback.
 */
export async function getContentBlock(key: string) {
  try {
    const res = await db.select().from(contentBlocks).where(eq(contentBlocks.key, key)).limit(1);
    if (res.length > 0) return res[0].content;
  } catch (error) {
    console.error(`Failed to fetch content block ${key} from DB. Using fallback.`, error);
  }
  // @ts-ignore
  return fallbackContentBlocks[key] || {};
}
