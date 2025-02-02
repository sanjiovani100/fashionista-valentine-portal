import type { Json, JsonObject } from './supabase/common.types';
import type { EventName, EventSubtype, ImageCategory } from './supabase/enums.types';

export interface VenueFeatures extends JsonObject {
  amenities: string[];
  accessibility: string[];
  technical_equipment?: string[];
  special_requirements?: string[];
}

export interface EventHighlight extends JsonObject {
  title: string;
  description: string;
  icon?: string;
  order?: number;
}

export interface BeachPartyDetails extends JsonObject {
  location: string;
  time: string;
  dress_code?: string;
  features: string[];
}

export interface EventContent {
  id: string;
  event_id: string | null;
  content_type: string;
  title: string;
  content: string;
  media_urls?: string[] | null;
  publish_date?: string | null;
  engagement_metrics?: JsonObject | null;
  created_at: string;
  updated_at: string;
}

export interface FashionImage {
  id: string;
  url: string;
  category: ImageCategory;
  alt_text: string;
  thumbnail_url?: string | null;
  metadata?: JsonObject | null;
  credits?: string | null;
  event_id: string | null;
  dimensions?: JsonObject | null;
  formats?: JsonObject | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SwimwearEventDetails {
  id: string;
  event_id: string | null;
  beach_party_details: BeachPartyDetails;
  pool_access_info: JsonObject;
  fitting_sessions: JsonObject[];
  beauty_workshops: JsonObject[];
  created_at: string;
  updated_at: string;
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
  venue_features: VenueFeatures;
  event_highlights: EventHighlight[];
  swimwear_event_details?: SwimwearEventDetails | null;
  fashion_images?: FashionImage[];
  event_tickets?: EventTicket[];
  event_sponsors?: EventSponsor[];
  event_content?: EventContent[];
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