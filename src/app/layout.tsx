import type { Metadata } from 'next';
import './globals.css';
import { NavbarWrapper } from '@/components/layout/NavbarWrapper';

export const metadata: Metadata = {
  metadataBase: new URL('https://maithiliagrotourism.com'),
  title: 'Maithili Agro Tourism | Resort & Nature Getaway in Mulshi, Pune',
  description:
    'Experience peaceful agro tourism surrounded by 360° Sahyadri mountain views in Ambegaon, Mulshi, Pune. Luxury rooms, group dormitory, swimming pool, sports turf, and farm experiences.',
  keywords: [
    'Maithili Agro Tourism',
    'Agro Tourism Pune',
    'Resort in Mulshi',
    'Resort near Ambegaon',
    'Group Dormitory Pune',
    'Resort with Swimming Pool Mulshi',
    'Resort with Sports Turf',
    'Sahyadri Mountain View Resort',
  ],
  authors: [{ name: 'Maithili Agro Tourism' }],
  openGraph: {
    title: 'Maithili Agro Tourism | Resort & Nature Getaway in Mulshi, Pune',
    description:
      'Stay close to nature. Experience luxury rooms, group dormitory, swimming pool, sports turf, tractor rides, and authentic Maharashtrian dining in Mulshi, Pune.',
    url: 'https://maithiliagrotourism.com',
    siteName: 'Maithili Agro Tourism',
    images: [
      {
        url: '/images/hero-resort.jpeg',
        width: 1200,
        height: 630,
        alt: 'Maithili Agro Tourism Resort View',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Resort',
              name: 'Maithili Agro Tourism',
              image: 'https://maithiliagrotourism.com/images/hero-resort.jpeg',
              telephone: ['9156374545', '9922426054'],
              email: 'maithiliagro@gmail.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Gat No 736, At Ambegaon, Post Urawade, Taluka Mulshi',
                addressLocality: 'Pune',
                addressRegion: 'Maharashtra',
                postalCode: '412115',
                addressCountry: 'IN',
              },
              hasMap: 'https://maps.app.goo.gl/GQiJxC5xAR6WnHoK8?g_st=iwb',
              priceRange: '₹₹',
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool' },
                { '@type': 'LocationFeatureSpecification', name: 'Sports Turf' },
                { '@type': 'LocationFeatureSpecification', name: 'Banquet Hall' },
                { '@type': 'LocationFeatureSpecification', name: 'Pickleball Court' },
                { '@type': 'LocationFeatureSpecification', name: 'Kids Playground' },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans bg-earth-50 text-forest-950 antialiased selection:bg-accent-gold selection:text-forest-950 flex flex-col min-h-screen">
        <NavbarWrapper>{children}</NavbarWrapper>
      </body>
    </html>
  );
}
