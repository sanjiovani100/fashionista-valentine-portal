import type { EventName, EventSubtype, ImageCategory } from '@/types/supabase/enums.types';

export type SwimwearEventDetails = {
  id: string;
  event_id: string;
  beach_party_details: {
    time: string;
    location: string;
    features: string[];
    dress_code: string;
  };
  pool_access_info: Record<string, unknown>;
  fitting_sessions: Array<{
    date: string;
    slots: Array<{
      time: string;
      designer: string;
    }>;
    location: string;
  }>;
  beauty_workshops: Array<{
    time: string;
    title: string;
    location: string;
    instructor: string;
    description: string;
  }>;
  created_at: string;
  updated_at: string;
};

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
  created_at: string;
  updated_at: string;
  swimwear_specific_requirements?: string;
  venue_features: Record<string, unknown>;
  event_highlights: Record<string, unknown>;
  swimwear_event_details?: SwimwearEventDetails;
  fashion_images?: FashionImage[];
  event_tickets?: EventTicket[];
  event_sponsors?: EventSponsor[];
  event_content?: EventContent[];
}

export interface EventContent {
  id: string;
  event_id: string;
  content_type: string;
  title: string;
  content: string;
  media_urls?: string[];
  publish_date?: string;
  engagement_metrics: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface FashionCollection {
  id: string;
  collection_name: string;
  description: string;
  designer_id?: string;
  event_id?: string;
  piece_count?: number;
  technical_requirements?: string;
  sustainability_info?: string;
  collection_type?: string;
  size_range?: Record<string, unknown>;
  materials?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface FashionImage {
  id: string;
  url: string;
  category: ImageCategory;
  alt_text: string;
  thumbnail_url?: string;
  metadata?: Record<string, unknown>;
  credits?: string;
  event_id?: string;
  dimensions?: Record<string, unknown>;
  formats?: Record<string, unknown>;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface EventTicket {
  id: string;
  ticket_type: string;
  price: number;
  benefits?: string[];
  quantity_available?: number;
  early_bird_deadline?: string;
  early_bird_price?: number;
  group_discount_threshold?: number;
  group_discount_percentage?: number;
  created_at?: string;
  updated_at?: string;
}

export interface EventSponsor {
  id: string;
  sponsor_profiles?: {
    company_name: string;
  };
}