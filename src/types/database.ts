export type EventName = 
  | 'valentines_fashion_show'
  | 'spring_fling_fashion_show'
  | 'summer_splash_fashion_show'
  | 'fall_fantasy_fashion_show'
  | 'swim_paradise_show';

export type EventSubtype = 
  | 'main_show'
  | 'vip_session'
  | 'workshop'
  | 'networking'
  | 'photo_session'
  | 'after_party';

export type ImageCategory = 
  | 'event_hero'
  | 'event_gallery'
  | 'backstage'
  | 'designer_profile'
  | 'model_profile'
  | 'promotional'
  | 'press_kit';

export interface FashionEvent {
  id: string;
  name: EventName;
  subtype: EventSubtype;
  title: string;
  description: string;
  venue: string;
  capacity: number;
  start_time: string;
  end_time: string;
  registration_deadline: string;
  theme?: string;
  meta_description?: string;
  meta_keywords?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface DesignerProfile {
  id: string;
  brand_name: string;
  designer_name: string;
  bio: string;
  website?: string;
  social_media?: Record<string, any>;
  achievements?: string[];
  contact_email: string;
  contact_phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface FashionCollection {
  id: string;
  designer_id?: string;
  event_id?: string;
  collection_name: string;
  description: string;
  piece_count: number;
  technical_requirements?: string;
  sustainability_info?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SponsorProfile {
  id: string;
  company_name: string;
  description: string;
  logo_url?: string;
  website?: string;
  sponsorship_level: string;
  marketing_materials?: Record<string, any>;
  contact_email: string;
  contact_phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface FashionImage {
  id: string;
  category: ImageCategory;
  url: string;
  thumbnail_url?: string;
  alt_text: string;
  metadata?: Record<string, any>;
  credits?: string;
  event_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface EventTicket {
  id: string;
  event_id?: string;
  ticket_type: string;
  price: number;
  quantity_available: number;
  benefits?: string[];
  early_bird_deadline?: string;
  early_bird_price?: number;
  group_discount_threshold?: number;
  group_discount_percentage?: number;
  created_at?: string;
  updated_at?: string;
}

export interface EventContent {
  id: string;
  event_id?: string;
  content_type: string;
  title: string;
  content: string;
  media_urls?: string[];
  publish_date?: string;
  engagement_metrics?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface ActiveFashionEvent extends FashionEvent {
  designers: DesignerProfile[];
  tickets: EventTicket[];
  content: EventContent[];
}