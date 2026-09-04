import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  date,
  time,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// --- ENUMS ---
// We use simple text fields or pgEnum. For simplicity across environments, we'll use text fields with type checks in the app.

// --- SPINE TABLES ---

export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const siteSettings = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  businessName: varchar('business_name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  phoneAlt: varchar('phone_alt', { length: 50 }), // new for this build
  whatsappNumber: varchar('whatsapp_number', { length: 50 }), // new (trap 21)
  email: varchar('email', { length: 255 }),
  address: text('address'),
  homepageLimits: jsonb('homepage_limits').default({ attractions: 8, packages: 4, stays: 4, reviews: 6, videos: 3 }), // new (trap 25)
  announcement: text('announcement'),
  heroTitle: text('hero_title'),
  heroSubtitle: text('hero_subtitle'),
  heroMediaId: integer('hero_media_id'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  kind: varchar('kind', { length: 50 }).notNull(), // 'image' | 'video'
  publicId: varchar('public_id', { length: 255 }).notNull(),
  url: text('url').notNull(),
  width: integer('width'),
  height: integer('height'),
  format: varchar('format', { length: 50 }),
  altText: text('alt_text'),
  durationSeconds: integer('duration_seconds'), // new for video
  posterPublicId: varchar('poster_public_id', { length: 255 }), // new for video
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const mediaLinks = pgTable('media_links', {
  id: serial('id').primaryKey(),
  mediaId: integer('media_id').notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(), // 'stay', 'package', 'attraction'
  entityId: integer('entity_id').notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
});

export const galleryItems = pgTable('gallery_items', {
  id: serial('id').primaryKey(),
  mediaId: integer('media_id').notNull(),
  album: varchar('album', { length: 255 }),
  sortOrder: integer('sort_order').default(0).notNull(),
  isPublished: boolean('is_published').default(true).notNull(),
});

export const contentBlocks = pgTable('content_blocks', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 100 }).notNull().unique(), // 'intro', 'quick_facts', 'why_us', 'faq'
  content: jsonb('content').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const enquiries = pgTable('enquiries', {
  id: serial('id').primaryKey(),
  reference: varchar('reference', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  email: varchar('email', { length: 255 }),
  message: text('message'),
  stayId: integer('stay_id'),
  packageId: integer('package_id'),
  attractionId: integer('attraction_id'),
  checkIn: date('check_in').notNull(),
  checkOut: date('check_out'), // nullable for day picnic
  adults: integer('adults').notNull().default(1),
  children: integer('children').notNull().default(0),
  groupSize: integer('group_size').notNull(), // derived total (inbox only)
  occasion: text('occasion'), // birthday, corporate, wedding
  productNameSnapshot: text('product_name_snapshot'),
  productPriceSnapshotInr: integer('product_price_snapshot_inr'),
  status: varchar('status', { length: 50 }).default('new').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const closures = pgTable('closures', {
  id: serial('id').primaryKey(),
  level: varchar('level', { length: 50 }).notNull(), // 'global' | 'entity'
  entityType: varchar('entity_type', { length: 50 }),
  entityId: integer('entity_id'),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  authorName: varchar('author_name', { length: 255 }).notNull(),
  rating: integer('rating').notNull(),
  text: text('text').notNull(),
  source: varchar('source', { length: 50 }), // 'google', 'direct'
  sortOrder: integer('sort_order').default(0).notNull(),
  isPublished: boolean('is_published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const promotions = pgTable('promotions', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  discountType: varchar('discount_type', { length: 50 }),
  discountValue: integer('discount_value'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const auditLog = pgTable('audit_log', {
  id: serial('id').primaryKey(),
  adminUserId: integer('admin_user_id'),
  action: varchar('action', { length: 255 }).notNull(),
  entityType: varchar('entity_type', { length: 50 }),
  entityId: integer('entity_id'),
  details: jsonb('details'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// --- CATALOG TABLES ---

export const stays = pgTable('stays', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  summary: text('summary'),
  description: text('description'),
  compareAtPriceInr: integer('compare_at_price_inr'),
  quoteOnly: boolean('quote_only').default(false).notNull(),
  rating: varchar('rating', { length: 10 }),
  reviewCount: integer('review_count'),
  badge: varchar('badge', { length: 100 }),
  inclusions: jsonb('inclusions'),
  exclusions: jsonb('exclusions'),
  terms: jsonb('terms'),
  faqs: jsonb('faqs'),
  coverMediaId: integer('cover_media_id'),
  sortOrder: integer('sort_order').default(0).notNull(),
  isPublished: boolean('is_published').default(false).notNull(),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  kind: varchar('kind', { length: 50 }).notNull(), // room | dormitory | cottage | tent
  pricePerNightInr: integer('price_per_night_inr'),
  maxOccupancy: integer('max_occupancy'),
  bedConfig: text('bed_config'),
  unitCount: integer('unit_count'),
  hasBalcony: boolean('has_balcony').default(false).notNull(),
  ac: boolean('ac').default(true).notNull(),
  amenities: jsonb('amenities'), // array of strings
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const packages = pgTable('packages', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  summary: text('summary'),
  description: text('description'),
  compareAtPriceInr: integer('compare_at_price_inr'),
  quoteOnly: boolean('quote_only').default(false).notNull(),
  rating: varchar('rating', { length: 10 }),
  reviewCount: integer('review_count'),
  badge: varchar('badge', { length: 100 }),
  inclusions: jsonb('inclusions'),
  exclusions: jsonb('exclusions'),
  terms: jsonb('terms'),
  faqs: jsonb('faqs'),
  coverMediaId: integer('cover_media_id'),
  sortOrder: integer('sort_order').default(0).notNull(),
  isPublished: boolean('is_published').default(false).notNull(),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  kind: varchar('kind', { length: 50 }).notNull(), // day | overnight | corporate | school | event | birthday
  priceAdultInr: integer('price_adult_inr'),
  priceChildInr: integer('price_child_inr'),
  childAgeNote: text('child_age_note'),
  startsAtTime: time('starts_at_time'),
  endsAtTime: time('ends_at_time'),
  minPax: integer('min_pax'),
  durationNote: text('duration_note'),
  meals: jsonb('meals'), // array of strings
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const attractions = pgTable('attractions', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  summary: text('summary'),
  description: text('description'),
  compareAtPriceInr: integer('compare_at_price_inr'),
  quoteOnly: boolean('quote_only').default(false).notNull(),
  rating: varchar('rating', { length: 10 }),
  reviewCount: integer('review_count'),
  badge: varchar('badge', { length: 100 }),
  inclusions: jsonb('inclusions'),
  exclusions: jsonb('exclusions'),
  terms: jsonb('terms'),
  faqs: jsonb('faqs'),
  coverMediaId: integer('cover_media_id'),
  sortOrder: integer('sort_order').default(0).notNull(),
  isPublished: boolean('is_published').default(false).notNull(),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  kind: varchar('kind', { length: 50 }).notNull(), // water | sport | farm | kids | nature | dining | venue
  capacity: integer('capacity'),
  timings: text('timings'),
  ageRange: text('age_range'),
  isFree: boolean('is_free').default(true).notNull(),
  addonPriceInr: integer('addon_price_inr'),
  videoMediaId: integer('video_media_id'), // new for video-led attractions
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// --- NEW TABLE ---

export const blackoutDates = pgTable('blackout_dates', {
  id: serial('id').primaryKey(),
  entityType: varchar('entity_type', { length: 50 }), // nullable = whole resort
  entityId: integer('entity_id'),
  date: date('date').notNull(),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
