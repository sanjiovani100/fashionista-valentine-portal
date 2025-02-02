import type { Json } from '@/types/database';
import type { EventName, EventSubtype, ImageCategory } from '@/types/supabase/enums.types';

export interface SwimwearEventDetails {
  id: string;
  event_id: string | null;
  beach_party_details: Json;
  pool_access_info: Json;
  fitting_sessions: Json;
  beauty_workshops: Json;
  created_at: string;
  updated_at: string;
}

export interface EventContent {
  id: string;
  event_id: string | null;
  content_type: string;
  title: string;
  content: string;
  media_urls?: string[] | null;
  publish_date?: string | null;
  engagement_metrics?: Json | null;
  created_at: string;
  updated_at: string;
}

export interface FashionCollection {
  id: string;
  collection_name: string;
  description: string;
  designer_id?: string | null;
  event_id?: string | null;
  piece_count: number;
  technical_requirements?: string | null;
  sustainability_info?: string | null;
  collection_type?: string | null;
  size_range?: Json | null;
  materials?: string[] | null;
  created_at?: string;
  updated_at?: string;
}

export interface FashionImage {
  id: string;
  url: string;
  category: ImageCategory;
  alt_text: string;
  thumbnail_url?: string | null;
  metadata?: Json | null;
  credits?: string | null;
  event_id: string | null;
  dimensions?: Json | null;
  formats?: Json | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface EventTicket {
  id: string;
  event_id: string | null;
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

export interface VenueFeatures {
  amenities: string[];
  accessibility: string[];
  technical_equipment?: string[];
  special_requirements?: string[];
}

export interface EventHighlight {
  title: string;
  description: string;
  icon?: string;
  order?: number;
}

export interface BeachPartyDetails {
  location: string;
  time: string;
  dress_code?: string;
  features: string[];
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
  swimwear_event_details?: SwimwearEventDetails | null;
  fashion_images?: FashionImage[];
  event_tickets?: EventTicket[];
  event_sponsors?: EventSponsor[];
  event_content?: EventContent[];
}