/**
 * Kaelin's Market — Verified Business Data
 * Every value below is research-verified or directly stated by the owner.
 * Sources cited inline. Do not modify without re-verification.
 */

export const BUSINESS = {
  name: "Kaelin's Market",
  alternateName: "Kaelin's Supermercado",
  legalName: 'Alpine Twisters Inc', // Source: BBB
  owner: 'Hani Garmo', // Source: BBB owner record
  founded: 1958, // Source: kaelinsmarket.com/about-us "Family owned and operated since 1958"
  foundedNote: "Originally called Kaelin's Valley Center", // Source: same
  firstSupermarketClaim: 'First supermarket in El Cajon, CA', // Source: same

  // CONTACT
  phone: '(619) 440-1423',
  phoneE164: '+16194401423',
  email: null, // 🔴 NOT YET VERIFIED — forms blocked per Iron Law #1

  // ADDRESS
  address: {
    street: '1435 E Main St',
    city: 'El Cajon',
    region: 'CA',
    postalCode: '92021',
    country: 'US',
  },
  geo: { lat: 32.8011144, lng: -116.9312736 }, // Source: Google Maps embed in kaelinsmarket.com

  // HOURS (Source: Yelp + Roadtrippers — confirmed Mon-Sun 7-9pm)
  hours: {
    open: '07:00',
    close: '21:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const,
  },

  // RATINGS (Source: Birdeye + RestaurantGuru + ChamberOfCommerce, cross-verified)
  rating: {
    value: 4.4,
    count: 2762,
    source: 'Google',
  },
  healthScore: 93, // Source: Yelp "Health Score 93 out of 100"

  // EXTERNAL LINKS
  urls: {
    legacy: 'https://kaelinsmarket.com',
    appcard: 'https://kaelinsmarket.com/appcard/',
    weeklyAdPage: 'https://kaelinsmarket.com/category/weekly-ad/',
    weeklyAdRSS: 'https://kaelinsmarket.com/category/weekly-ad/feed/',
    fisherPrintingFallback:
      'https://unified.fisherads.com/KaelinsSupermarket/weekly/v1.aspx',
    googleMaps:
      'https://www.google.com/maps/place/Kaelin%27s+Market/@32.8011144,-116.9312736,17z',
    yelp: 'https://www.yelp.com/biz/kaelins-market-el-cajon',
  },

  // DIFFERENTIATORS (Source: kaelinsmarket.com + Loc8NearMe + Yelp)
  differentiators: [
    "First supermarket in El Cajon · Est. 1958",
    'Largest butcher shop in El Cajon',
    'Mexican AND Arabic groceries under one roof',
    'Handmade tortillas daily',
    'Fresh salsa bar',
    'Hot food counter (carnitas, shawarma, rotisserie)',
    'Car wash on premises',
    'Family owned three generations',
  ],

  // DEPARTMENTS (Source: kaelinsmarket.com/departments)
  departments: [
    'Produce & Dairy',
    'Meat / Carnicería',
    'Groceries',
    'Bakery / Panadería',
    'Mexican & Arabic Food',
    'Tortillería',
    'Hot Foods',
  ],
} as const;

export type Business = typeof BUSINESS;
