import type { Metadata, Viewport } from 'next';
import { BUSINESS } from '@/lib/business-data';
import { LenisProvider } from '@/components/global/LenisProvider';
import { Nav } from '@/components/global/Nav';
import { Footer } from '@/components/global/Footer';
import { ScrollProgressCounter } from '@/components/global/ScrollProgressCounter';
import { WeeklyAdFAB } from '@/components/global/WeeklyAdFAB';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://kaelins-market-el-cajon.vercel.app'),
  title: {
    default: "Kaelin's Market · El Cajon's Original Mercado since 1958",
    template: "%s · Kaelin's Market",
  },
  description:
    "El Cajon's first supermarket. Family owned since 1958. Mexican & Arabic groceries, handmade tortillas, fresh salsa, largest butcher shop in El Cajon. 1435 E Main St.",
  keywords: [
    'Mexican grocery El Cajon',
    'Arabic grocery El Cajon',
    'mercado near me',
    'supermercado El Cajon',
    'halal meat El Cajon',
    'handmade tortillas',
    'carniceria El Cajon',
    'panaderia El Cajon',
  ],
  authors: [{ name: "Kaelin's Market" }],
  creator: "Kaelin's Market",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_MX', 'ar'],
    url: 'https://kaelins-market-el-cajon.vercel.app',
    siteName: "Kaelin's Market",
    title: "Kaelin's Market · El Cajon's Original Mercado since 1958",
    description:
      'Mexican & Arabic groceries · Handmade tortillas · Fresh salsa · Largest butcher shop in El Cajon · Est. 1958',
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  alternates: { canonical: 'https://kaelins-market-el-cajon.vercel.app' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#1F1A14',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GroceryStore',
  '@id': 'https://kaelins-market-el-cajon.vercel.app/#store',
  name: BUSINESS.name,
  alternateName: BUSINESS.alternateName,
  description:
    "El Cajon's first supermarket. Mexican & Arabic groceries, handmade tortillas, fresh salsa, largest butcher shop in El Cajon. Family owned since 1958.",
  url: 'https://kaelins-market-el-cajon.vercel.app',
  telephone: BUSINESS.phoneE164,
  foundingDate: String(BUSINESS.founded),
  paymentAccepted: 'Cash, Credit Card, Apple Pay',
  currenciesAccepted: 'USD',
  priceRange: '$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.geo.lat,
    longitude: BUSINESS.geo.lng,
  },
  hasMap: BUSINESS.urls.googleMaps,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: BUSINESS.hours.open,
      closes: BUSINESS.hours.close,
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: BUSINESS.rating.value,
    reviewCount: BUSINESS.rating.count,
    bestRating: 5,
    worstRating: 1,
  },
  department: BUSINESS.departments.map((d) => ({
    '@type': 'GroceryStore',
    name: d,
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LenisProvider>
          <Nav />
          <ScrollProgressCounter />
          <main id="main">{children}</main>
          <Footer />
          <WeeklyAdFAB />
        </LenisProvider>
      </body>
    </html>
  );
}
