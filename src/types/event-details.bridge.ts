import type { Json } from './database';
import type { EventName, EventSubtype, ImageCategory } from './supabase/database/enums';

export interface BeachPartyDetails {
  location: string;
  time: string;
  dress_code?: string;
  features: string[];
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

export interface SwimwearEventDetails {
  id: string;
  event_id: string | null;
  beach_party_details: BeachPartyDetails;
  pool_access_info: Record<string, unknown>;
  fitting_sessions: Record<string, unknown>[];
  beauty_workshops: Record<string, unknown>[];
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
  engagement_metrics?: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface FashionImage {
  id: string;
  category: ImageCategory;
  url: string;
  thumbnail_url?: string | null;
  alt_text: string;
  metadata?: Json | null;
  credits?: string | null;
  event_id: string | null;
  created_at: string;
  updated_at: string;
  dimensions?: Json | null;
  formats?: Json | null;
}

export interface EventDetails {
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
  venue_features: VenueFeatures;
  event_highlights: EventHighlight[];
  swimwear_event_details?: SwimwearEventDetails | null;
  fashion_images?: FashionImage[];
  event_content?: EventContent[];
}