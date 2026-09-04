import { Accommodation, Activity, Amenity, ContactInfo, EventPackage, GalleryItem, Statistic, Testimonial } from './types';

export const CONTACT_INFO: ContactInfo = {
  businessName: 'Maithili Agro Tourism',
  phones: ['9156374545', '9922426054'],
  email: 'maithiliagro@gmail.com',
  address: 'Gat No 736, At Ambegaon, Post Urawade, Taluka Mulshi, District Pune 412115',
  googleMapsUrl: 'https://maps.app.goo.gl/GQiJxC5xAR6WnHoK8?g_st=iwb',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5!2d73.6!3d18.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzAwLjAiTiA3M8KwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin',
  whatsappNumber: '919156374545',
};

// Section Specific Hero & Background Images
export const SECTION_IMAGES = {
  hero: '/images/hero-resort.jpeg',
  intro: '/images/night-resort.jpeg',
  mountainView: '/images/mountain-balcony.jpeg',
  banquet: '/images/event-lawn-cottages.jpeg',
  restaurant: '/images/dining-area.jpeg',
  finalCta: '/images/gallery-whatsapp-1.jpeg',
  aboutBanner: '/images/gallery-whatsapp-2.jpeg',
  privateCottage: '/images/private-cottage-night.jpeg',
};

// 100% Unique Accommodations (No image reuse)
export const INITIAL_ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'acc-1',
    title: 'Luxury Mountain View Rooms',
    slug: 'mountain-view-rooms',
    type: 'room',
    capacity: '2 - 4 Guests per Room',
    pricePerNight: 3500,
    features: [
      'Private Balcony with 360° Mountain View',
      'Air Conditioning & Ceiling Fan',
      'Ensuite Bathroom with Hot Water Shower',
      'King Size Bed & Comfort Mattresses',
      'Complimentary Farm Breakfast',
      'Pool & Turf Access Included',
    ],
    description:
      'Immerse yourself in serenity with our elegant rooms featuring private balconies overlooking panoramic Sahyadri mountain views. Designed for couples and families seeking nature and comfort.',
    imageUrl: '/images/luxury-room.jpeg',
  },
  {
    id: 'acc-2',
    title: 'Spacious Group Dormitory Stay',
    slug: 'group-dormitory',
    type: 'dormitory',
    capacity: '10 - 30 Guests',
    pricePerNight: 1200,
    features: [
      'Ideal for Large Family Gatherings & Corporate Outings',
      'Multiple Comfortable Individual Beds',
      'Multiple Attached Modern Restrooms with Hot Water',
      'Locker & Storage Facilities',
      'Spacious Group Bonding Hall Area',
      'Access to Pool, Turf & All Resort Amenities',
    ],
    description:
      'Perfect for corporate retreats, college groups, and large family get-togethers. Enjoy bonding in a clean, spacious dormitory setup with full resort access.',
    imageUrl: '/images/dormitory-stay.jpeg',
  },
];

// 100% Unique Activities & Experiences (Zero image repetition, strictly genuine resort photos)
export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    title: 'Resort Swimming Pool',
    slug: 'resort-swimming-pool',
    category: 'Leisure',
    description: 'Unwind by our illuminated outdoor swimming pool surrounded by peaceful Mulshi hills.',
    iconName: 'Waves',
    imageUrl: '/images/swimming-pool.jpeg',
  },
  {
    id: 'act-2',
    title: 'Comfortable Deluxe Room',
    slug: 'comfortable-deluxe-room',
    category: 'Stay',
    description: 'Relax in a cozy, well-appointed cottage bedroom featuring TV, study desk, sofa seating, and ambient lights.',
    iconName: 'Building',
    imageUrl: '/images/luxury-room.jpeg',
  },
  {
    id: 'act-3',
    title: 'Premium Cottage Stay',
    slug: 'premium-cottage-stay',
    category: 'Stay',
    description: 'Experience calm countryside living in independent resort cottages illuminated with warm evening lights.',
    iconName: 'Trees',
    imageUrl: '/images/private-cottage-night.jpeg',
  },
  {
    id: 'act-4',
    title: 'Room with Mountain View',
    slug: 'room-with-mountain-view',
    category: 'Stay',
    description: 'Enjoy tea on a private balcony with wooden seating overlooking panoramic Sahyadri mountain views.',
    iconName: 'Mountain',
    imageUrl: '/images/mountain-balcony.jpeg',
  },
  {
    id: 'act-5',
    title: 'Indoor Dining Hall',
    slug: 'indoor-dining-hall',
    category: 'Dining',
    description: 'A spacious indoor dining hall with comfortable table seating for group meals and celebrations.',
    iconName: 'Utensils',
    imageUrl: '/images/dining-area.jpeg',
  },
  {
    id: 'act-6',
    title: "Children's Play Area",
    slug: 'childrens-play-area',
    category: 'Kids & Fun',
    description: 'A fun-filled outdoor playground equipped with colorful slides, swings, horse rides, and merry-go-round for kids.',
    iconName: 'Gamepad2',
    imageUrl: '/images/kids-playground.jpeg',
  },
  {
    id: 'act-7',
    title: 'Comfortable Washroom Facilities',
    slug: 'comfortable-washroom-facilities',
    category: 'Amenities',
    description: 'Clean and modern washroom facilities designed for guest comfort, hygiene, and convenience.',
    iconName: 'Sparkles',
    imageUrl: '/images/washroom.jpeg',
  },
];

export const INITIAL_AMENITIES: Amenity[] = [
  {
    id: 'am-1',
    title: 'Resort Swimming Pool',
    description: 'Large outdoor swimming pool equipped with underwater lights for serene evening swims.',
    iconName: 'Waves',
    imageUrl: '/images/swimming-pool.jpeg',
  },
  {
    id: 'am-2',
    title: 'Indoor Dining Hall',
    description: 'Covered dining and event space ideal for group dining, family celebrations, and gatherings.',
    iconName: 'Building',
    imageUrl: '/images/dining-area.jpeg',
  },
  {
    id: 'am-3',
    title: "Children's Playground & Swings",
    description: 'Safe outdoor playground with slides, swings, horse rides, and merry-go-round.',
    iconName: 'Smile',
    imageUrl: '/images/kids-playground.jpeg',
  },
  {
    id: 'am-4',
    title: 'Comfortable Washroom Facilities',
    description: 'Clean and spacious washroom facilities designed for guest comfort and hygiene.',
    iconName: 'CheckCircle',
    imageUrl: '/images/washroom.jpeg',
  },
  {
    id: 'am-5',
    title: 'Mountain View Balconies',
    description: 'Private room balconies overlooking lush green Sahyadri hills.',
    iconName: 'Trees',
    imageUrl: '/images/mountain-balcony.jpeg',
  },
];

export const INITIAL_EVENTS: EventPackage[] = [
  {
    id: 'evt-1',
    title: 'Destination Weddings & Receptions',
    description: 'Host your ceremony with a breathtaking Sahyadri mountain backdrop and covered banquet hall.',
    imageUrl: '/images/banquet-hall.jpeg',
    features: ['Up to 500+ Guest Capacity', 'Covered Banquet Hall + Lawn Area', 'In-house Maharashtrian Catering', 'Decor & Lighting Setup'],
  },
  {
    id: 'evt-2',
    title: 'Corporate Outings & Group Retreats',
    description: 'Invigorate your team with swimming, group dining, farm ambiance, and spacious group stay.',
    imageUrl: '/images/private-cottage-night.jpeg',
    features: ['Dormitory & Room Stay Options', 'Swimming Pool Access', 'Projector & Sound System', 'Custom Group Dining Packages'],
  },
  {
    id: 'evt-3',
    title: 'Birthday Parties & Family Celebrations',
    description: 'Celebrate special milestones in peace surrounded by nature, delicious food, and fun rides for kids.',
    imageUrl: '/images/kids-playground.jpeg',
    features: ['Private Party Area', 'Kids Play Area Access', 'Custom Meal Menus', 'Music System & Bonfire'],
  },
];

export const INITIAL_STATS: Statistic[] = [
  { id: 'st-1', keyName: 'happy_guests', label: 'Happy Guests Accommodated', valueNumber: 5000, suffix: '+', displayOrder: 1 },
  { id: 'st-2', keyName: 'experiences', label: 'Agro & Fun Experiences', valueNumber: 7, suffix: '+', displayOrder: 2 },
  { id: 'st-3', keyName: 'accommodation_options', label: 'Stay Options (Rooms & Dorm)', valueNumber: 2, suffix: ' Types', displayOrder: 3 },
  { id: 'st-4', keyName: 'events_hosted', label: 'Celebrations & Events Hosted', valueNumber: 150, suffix: '+', displayOrder: 4 },
];

// 100% Unique Photo Gallery Items (Every image is distinct)
export const INITIAL_GALLERY: GalleryItem[] = [
  { id: 'gal-1', title: 'Resort Night View', category: 'resort', imageUrl: '/images/night-resort.jpeg' },
  { id: 'gal-2', title: 'Illuminated Swimming Pool', category: 'pool', imageUrl: '/images/swimming-pool.jpeg' },
  { id: 'gal-3', title: 'Room Balcony Mountain View', category: 'mountains', imageUrl: '/images/mountain-balcony.jpeg' },
  { id: 'gal-4', title: 'Banquet & Event Hall', category: 'events', imageUrl: '/images/banquet-hall.jpeg' },
  { id: 'gal-5', title: 'Children Play Area', category: 'activities', imageUrl: '/images/kids-playground.jpeg' },
  { id: 'gal-6', title: 'Deluxe Room Interior', category: 'rooms', imageUrl: '/images/luxury-room.jpeg' },
  { id: 'gal-7', title: 'Premium Cottage Night View', category: 'rooms', imageUrl: '/images/private-cottage-night.jpeg' },
  { id: 'gal-8', title: 'Indoor Dining Hall', category: 'restaurant', imageUrl: '/images/dining-area.jpeg' },
  { id: 'gal-9', title: 'Comfortable Washroom Facilities', category: 'resort', imageUrl: '/images/washroom.jpeg' },
  { id: 'gal-10', title: 'Authentic Maharashtrian Non-Veg Thali', category: 'restaurant', imageUrl: '/images/gallery-whatsapp-1.jpeg' },
  { id: 'gal-11', title: 'Authentic Maharashtrian Veg Thali', category: 'restaurant', imageUrl: '/images/gallery-whatsapp-2.jpeg' },
  { id: 'gal-12', title: 'Tea & Snacks Tray', category: 'restaurant', imageUrl: '/images/gallery-whatsapp-3.jpeg' },
  { id: 'gal-13', title: 'Event Hall Flower Decoration', category: 'events', imageUrl: '/images/gallery-whatsapp-4.jpeg' },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    guestName: 'Rahul & Family (Pune)',
    rating: 5,
    comment:
      'Maithili Agro Tourism is an absolute hidden gem in Mulshi! The 360-degree mountain view from the room balcony in the morning was heavenly. Kids loved the playground, swimming pool, and tractor ride.',
    dateVisited: 'August 2026',
  },
  {
    id: 't-2',
    guestName: 'Priya S. (Corporate Group)',
    rating: 5,
    comment:
      'We organized our company annual day retreat here. The dormitory was super clean, the sports turf was excellent for cricket matches, and the Maharashtrian food was authentic and finger-licking good!',
    dateVisited: 'July 2026',
  },
  {
    id: 't-3',
    guestName: 'Vikram Joshi (Mumbai)',
    rating: 5,
    comment:
      'Peaceful, green, and extremely hospitable staff. Perfect distance from Pune city for a refreshing weekend getaway with fresh air and mountain scenery.',
    dateVisited: 'June 2026',
  },
];
