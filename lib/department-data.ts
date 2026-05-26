/**
 * Kaelin's Market — Department detail data
 * Used by /departments page. Anchors match the home-page DepartmentsGrid slug pattern.
 *
 * IMAGES: All currently Tier 2 (Unsplash subject-verified placeholders).
 * Tier 1 audit + replacements documented in MEDIA_INVENTORY.md.
 */

export type CulturalTrack = 'mexican' | 'arabic' | 'shared';

export interface DepartmentDetailData {
  slug: string;
  en: string;
  es: string;
  ar?: string;
  descShort: string;
  descLong: string[]; // paragraphs
  highlights: string[]; // "signature items" list
  images: { src: string; alt: string }[]; // 3-5 images
  cultural: CulturalTrack;
  hasHalal?: boolean;
  hasMadeToOrder?: boolean;
  sourceClaims?: { text: string; source: string }[];
}

export const DEPARTMENT_DETAILS: DepartmentDetailData[] = [
  {
    slug: 'tortilleria',
    en: 'Tortiller\u00eda',
    es: 'Tortiller\u00eda',
    descShort: 'Made by hand. All day, every day.',
    descLong: [
      'Our tortillas are pressed and griddled by hand from the time we open at 7 AM until close. No factory bags, no day-old stock — if it\u2019s on the counter, it was made today.',
      'Buy them warm by the dozen or by the pound. They go fast.',
    ],
    highlights: ['Corn tortillas — daily', 'Flour tortillas — daily', 'Tortillas para t\u00f3stadas', 'Sopes & gorditas (on request)'],
    images: [
      { src: 'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=1600&q=85&auto=format&fit=crop', alt: 'Fresh handmade corn tortillas stacked' },
      { src: 'https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?w=1600&q=85&auto=format&fit=crop', alt: 'Tortilla press in motion' },
      { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=85&auto=format&fit=crop', alt: 'Warm tortillas in a basket' },
    ],
    cultural: 'mexican',
    hasMadeToOrder: true,
  },
  {
    slug: 'carniceria',
    en: 'Carnicer\u00eda',
    es: 'Carnicer\u00eda',
    ar: '\u0644\u062d\u0648\u0645',
    descShort: 'Largest butcher in El Cajon. Mexican cuts + halal selection.',
    descLong: [
      'The largest butcher counter in El Cajon. Mexican specialty cuts you won\u2019t find at chain grocery — carne asada, pollo asado, machaca, cecina, lengua, suadero.',
      'Halal options are kept distinct and clearly labeled.',
      'Whole cuts available on request. Just ask.',
    ],
    highlights: ['Carne asada (marinated)', 'Pollo asado', 'Machaca', 'Cecina', 'Whole goat / cabrito (on request)', 'Halal beef + lamb'],
    images: [
      { src: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1600&q=85&auto=format&fit=crop', alt: 'Butcher counter with marinated meats' },
      { src: 'https://images.unsplash.com/photo-1607623488775-3d51b6dc7f8b?w=1600&q=85&auto=format&fit=crop', alt: 'Marinated carne asada' },
      { src: 'https://images.unsplash.com/photo-1588347818111-a5c4d2e6e0e3?w=1600&q=85&auto=format&fit=crop', alt: 'Specialty cuts case' },
    ],
    cultural: 'shared',
    hasHalal: true,
    hasMadeToOrder: true,
    sourceClaims: [
      {
        text: 'Largest butcher shop in El Cajon',
        source: 'kaelinsmarket.com/departments/meat',
      },
    ],
  },
  {
    slug: 'panaderia',
    en: 'Panader\u00eda',
    es: 'Panader\u00eda',
    ar: '\u0645\u062e\u0628\u0632',
    descShort: 'Conchas, pan dulce, khubz arabi. Baked fresh daily.',
    descLong: [
      'Mexican pan dulce — conchas, orejas, cuernitos, polvorones — baked on premises through the morning. Custom cakes for quincea\u00f1eras, birthdays, and graduations available by order.',
      'Arabic flatbreads (khubz arabi) baked daily.',
    ],
    highlights: ['Conchas (vanilla / chocolate / strawberry)', 'Orejas', 'Custom cakes (order in advance)', 'Pastels & pasteles', 'Khubz arabi (Arabic flatbread)'],
    images: [
      { src: 'https://images.unsplash.com/photo-1568471173242-461f0a730452?w=1600&q=85&auto=format&fit=crop', alt: 'Mexican pan dulce on bakery racks' },
      { src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&q=85&auto=format&fit=crop', alt: 'Conchas in pink and brown' },
      { src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1600&q=85&auto=format&fit=crop', alt: 'Custom celebration cake' },
    ],
    cultural: 'shared',
    hasMadeToOrder: true,
    sourceClaims: [
      { text: 'A staple of the community, our bakery in El Cajon is widely recognized as the most popular, affordable, and delicious place to find baked goods', source: 'kaelinsmarket.com/departments/bakery' },
    ],
  },
  {
    slug: 'produce-dairy',
    en: 'Produce & Dairy',
    es: 'Frutas y Verduras',
    ar: '\u062e\u0636\u0627\u0631',
    descShort: 'Local, seasonal, stacked high. Priced for the neighborhood.',
    descLong: [
      'We stock produce the way an old-school mercado does — piled high, rotated daily, priced low. Mexican varieties (chiles, tomatillos, nopales, jicama) and Arabic staples (eggplant, parsley by the bunch, mint, sumac herbs) side-by-side.',
      'Traditional Mexican cheeses available in the dairy case: queso fresco, queso oaxaca, panela, cotija.',
    ],
    highlights: ['Fresh chiles (jalape\u00f1o / serrano / habanero / poblano)', 'Tomatillos', 'Nopales', 'Mexican cheeses (queso fresco, oaxaca, cotija, panela)', 'Fresh herbs by the bunch'],
    images: [
      { src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=85&auto=format&fit=crop', alt: 'Fresh tomatoes piled high' },
      { src: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=1600&q=85&auto=format&fit=crop', alt: 'Chiles assortment' },
      { src: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=1600&q=85&auto=format&fit=crop', alt: 'Produce wall full assortment' },
    ],
    cultural: 'shared',
  },
  {
    slug: 'hot-foods',
    en: 'Hot Foods',
    es: 'Comida Caliente',
    ar: '\u0627\u0644\u0645\u0637\u0628\u062e',
    descShort: 'Carnitas, barbacoa, shawarma, rotisserie chicken. Cooked daily.',
    descLong: [
      'The hot food counter is the heart of the store. Rotisserie chickens come out of the oven all afternoon. Carnitas are slow-cooked in copper pots. Barbacoa on weekends.',
      'Arabic options include shawarma and stews depending on the day.',
      'Catering trays available for family gatherings, parties, and quincea\u00f1eras — call to discuss quantities.',
    ],
    highlights: ['Rotisserie chicken (afternoons)', 'Carnitas', 'Barbacoa (weekends)', 'Shawarma', 'Tamales', 'Ceviche de camar\u00f3n (made-to-order)', 'Catering trays (call)'],
    images: [
      { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=85&auto=format&fit=crop', alt: 'Hot food counter display' },
      { src: 'https://images.unsplash.com/photo-1564767655658-4e6b365884ff?w=1600&q=85&auto=format&fit=crop', alt: 'Carnitas in a copper pot' },
      { src: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=1600&q=85&auto=format&fit=crop', alt: 'Fresh salsa bar' },
    ],
    cultural: 'shared',
    hasMadeToOrder: true,
    sourceClaims: [
      { text: 'Rotisserie chickens — so much better than Costco and the supermarkets', source: 'Mel M., Yelp review' },
      { text: 'We ordered carnitas for a large family gathering, on time, courteous, made sure everything was hot', source: 'D. M., Yelp Q&A' },
    ],
  },
  {
    slug: 'dulceria',
    en: 'Dulcer\u00eda',
    es: 'Dulcer\u00eda',
    descShort: 'Pi\u00f1atas, Mexican candy, Arabic sweets. Quincea\u00f1era essentials.',
    descLong: [
      'Walk to the back of the store and you\u2019ll find the dulcer\u00eda — a wall of pi\u00f1atas (custom shapes available on request), Mexican candy by the bag, dulces de leche, tamarindo, chamoy.',
      'Arabic sweets seasonally.',
    ],
    highlights: ['Pi\u00f1atas (custom shapes on request)', 'Mexican candy by the bag', 'Dulce de leche', 'Tamarindo', 'Arabic sweets (seasonal)'],
    images: [
      { src: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=1600&q=85&auto=format&fit=crop', alt: 'Dulcer\u00eda candy display' },
      { src: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=1600&q=85&auto=format&fit=crop', alt: 'Mexican candy assortment' },
    ],
    cultural: 'mexican',
    hasMadeToOrder: true,
  },
  {
    slug: 'mexican-arabic-food',
    en: 'Mexican & Arabic Food',
    es: 'Comida Mexicana & \u00c1rabe',
    ar: '\u0637\u0639\u0627\u0645',
    descShort: 'Made-to-order trays for parties, catering, and weeknight dinners.',
    descLong: [
      'This is the corner of the store where two cuisines meet. Order trays for events, grab a quick plate for dinner, or have us prep a custom menu for a quincea\u00f1era, baptism, or family gathering.',
      'Call (619) 440-1423 to discuss catering — we\u2019ll talk through portions and pricing.',
    ],
    highlights: ['Catering trays', 'Custom menus for events', 'Daily prepared plates', 'Hummus, tabouleh, baba ghanoush', 'Tacos al pastor station (on request)'],
    images: [
      { src: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1600&q=85&auto=format&fit=crop', alt: 'Tabouleh and hummus' },
      { src: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=1600&q=85&auto=format&fit=crop', alt: 'Salsa bar selection' },
    ],
    cultural: 'shared',
    hasMadeToOrder: true,
  },
];
