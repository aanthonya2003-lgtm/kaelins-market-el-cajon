/** Kaelin's Market — shared types */

export interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  thumbnail_url?: string;
}

export interface FacebookPost {
  id: string;
  message?: string;
  permalink_url: string;
  full_picture?: string;
  created_time: string;
}

export interface Department {
  en: string;
  es: string;
  ar?: string;
  desc: string;
  imgSrc: string;
  cultural: 'mexican' | 'arabic' | 'shared';
  inStock?: boolean;
}

export interface SignatureDish {
  name: string;
  sub: string;
  imgSrc: string;
  cultural: 'mexican' | 'arabic';
  freshToday?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  source: 'Yelp' | 'Google' | 'NextDoor' | 'Tripadvisor';
  rating?: number;
}
