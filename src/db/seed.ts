import { db } from './index';
import { 
  siteSettings, 
  attractions, 
  adminUsers, 
  contentBlocks 
} from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  // 1. Site Settings
  await db.insert(siteSettings).values({
    businessName: 'Maithili Agro Tourism',
    phone: '9156374545',
    phoneAlt: '9922426054',
    whatsappNumber: '9156374545', // Defaulting to first, adjust later based on feedback
    email: 'maithiliagro@gmail.com',
    address: 'Gat No 736, At Ambegaon, Post Urawade, Tal. Mulshi, Dist. Pune 412115',
    heroTitle: 'Experience Nature in Mulshi',
    heroSubtitle: 'A perfect getaway with 360° Sahyadri views.',
  }).onConflictDoNothing();

  // 2. Attractions
  const attractionsData = [
    { slug: 'swimming-pool', name: 'Swimming Pool', kind: 'water', isFree: true },
    { slug: 'sports-turf', name: 'Turf', kind: 'sport', isFree: true },
    { slug: 'pickle-ball', name: 'Pickle Ball', kind: 'sport', isFree: true },
    { slug: 'garden-lawn', name: 'Garden / Lawn', kind: 'nature', isFree: true },
    { slug: 'mountain-view', name: '360° Mountain View', kind: 'nature', isFree: true },
    { slug: 'trekking', name: 'Trekking', kind: 'nature', isFree: true },
    { slug: 'tractor-ride', name: 'Tractor Ride', kind: 'farm', isFree: true },
    { slug: 'bullock-cart-ride', name: 'Bullock Cart Ride', kind: 'farm', isFree: true },
    { slug: 'childrens-play', name: 'Children\'s Play Equipment', kind: 'kids', isFree: true },
    { slug: 'trampoline', name: 'Trampoline', kind: 'kids', isFree: true },
    { slug: 'restaurant', name: 'Restaurant', kind: 'dining', isFree: false },
    { slug: 'banquet-hall', name: 'Banquet Hall', kind: 'venue', isFree: false },
  ];

  for (const attr of attractionsData) {
    await db.insert(attractions).values({
      ...attr,
      isPublished: true,
    }).onConflictDoNothing({ target: attractions.slug });
  }

  // 3. Admin Account
  await db.insert(adminUsers).values({
    name: 'Admin',
    email: 'maithiliagro@gmail.com',
    passwordHash: '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // Placeholder bcrypt hash for "password", normally we'd hash in code or let admin set it via a setup screen.
  }).onConflictDoNothing({ target: adminUsers.email });

  // 4. Content Blocks
  await db.insert(contentBlocks).values({
    key: 'quick_facts',
    content: {
      facts: [
        '45 min from Pune',
        '25 acres',
        '360° view',
        'open all year',
      ]
    }
  }).onConflictDoNothing({ target: contentBlocks.key });

  console.log('✅ Seeding complete!');
}

seed()
  .catch((e) => {
    console.error('Seeding failed');
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
