import type { Json } from '@/types/database';
import type { EventName, EventSubtype, ImageCategory } from '@/types/supabase/enums.types';

export interface EventContent {
  id: string;
  event_id: string;
  content_type: string;
  title: string;
  content: string;
  media_urls?: string[] | null;
  publish_date?: string | null;
  engagement_metrics?: Json;
  created_at: string;
  updated_at: string;
}

export interface FashionCollection {
  id: string;
  collection_name: string;
  description: string;
  designer_id?: string;
  event_id?: string;
  piece_count: number;
  technical_requirements?: string;
  sustainability_info?: string;
  collection_type?: string;
  size_range?: Json;
  materials?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface FashionImage {
  id: string;
  url: string;
  category: ImageCategory;
  alt_text: string;
  thumbnail_url?: string | null;
  metadata?: Json;
  credits?: string | null;
  event_id: string;
  dimensions?: Json;
  formats?: Json;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface EventTicket {
  id: string;
  event_id: string;
  ticket_type: string;
  price: number;
  quantity_available: number;
  benefits?: string[] | null;
  early_bird_deadline?: string | null;
  early_bird_price?: number | null;
  group_discount_threshold?: number | null;
  group_discount_percentage?: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface EventSponsor {
  id: string;
  sponsor_profiles?: {
    company_name: string;
  };
}

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
  theme?: string | null;
  meta_description?: string | null;
  meta_keywords?: string[] | null;
  created_at: string;
  updated_at: string;
  swimwear_specific_requirements?: string | null;
  venue_features: Json;
  event_highlights: Json;
  fashion_images?: FashionImage[];
  event_tickets?: EventTicket[];
  event_sponsors?: EventSponsor[];
  event_content?: EventContent[];
}