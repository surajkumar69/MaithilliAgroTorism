export interface Accommodation {
  id: string;
  title: string;
  slug: string;
  type: 'room' | 'dormitory';
  capacity: string;
  pricePerNight?: number;
  features: string[];
  description: string;
  imageUrl: string;
}

export interface Activity {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  iconName: string;
  imageUrl: string;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  iconName: string;
  imageUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'resort' | 'rooms' | 'pool' | 'garden' | 'activities' | 'mountains' | 'restaurant' | 'events';
  imageUrl: string;
}

export interface Statistic {
  id: string;
  keyName: string;
  label: string;
  valueNumber: number;
  suffix: string;
  displayOrder: number;
}

export interface Testimonial {
  id: string;
  guestName: string;
  rating: number;
  comment: string;
  dateVisited: string;
}

export interface EventPackage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
}

export interface Enquiry {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  guestsCount?: string;
  preferredDate?: string;
  accommodationType?: string;
  message?: string;
  status?: 'pending' | 'contacted' | 'confirmed' | 'archived';
  createdAt?: string;
}

export interface ContactInfo {
  businessName: string;
  phones: string[];
  email: string;
  address: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  whatsappNumber: string;
}
