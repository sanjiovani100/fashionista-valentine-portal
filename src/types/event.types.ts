import { Json, JsonObject } from './supabase/base/json.types';
import { EventName, EventSubtype, ImageCategory } from './supabase/base/enums.types';

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

export interface FashionImage {
  id: string;
  url: string;
  category: ImageCategory;
  alt_text: string;
  thumbnail_url?: string | null;
  metadata?: JsonObject;
  credits?: string | null;
  event_id: string | null;
  dimensions?: JsonObject;
  formats?: JsonObject;
  description?: string | null;
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
  engagement_metrics?: JsonObject;
  created_at: string;
  updated_at: string;
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
  created_at: string;
  updated_at: string;
}

export interface FashionCollection {
  id: string;
  designer_id?: string | null;
  event_id: string;
  collection_name: string;
  description: string;
  piece_count: number;
  technical_requirements?: string | null;
  sustainability_info?: string | null;
  collection_type?: string | null;
  size_range?: JsonObject;
  materials?: string[];
  created_at: string;
  updated_at: string;
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
  event_content?: EventContent[];
  event_tickets?: EventTicket[];
  fashion_collections?: FashionCollection[];
}

// Type guards
export function isVenueFeatures(value: unknown): value is VenueFeatures {
  if (!value || typeof value !== 'object') return false;
  const features = value as Record<string, unknown>;
  return (
    Array.isArray(features.amenities) &&
    Array.isArray(features.accessibility) &&
    (!features.technical_equipment || Array.isArray(features.technical_equipment)) &&
    (!features.special_requirements || Array.isArray(features.special_requirements))
  );
}

export function isEventHighlight(value: unknown): value is EventHighlight {
  if (!value || typeof value !== 'object') return false;
  const highlight = value as Record<string, unknown>;
  return (
    typeof highlight.title === 'string' &&
    typeof highlight.description === 'string' &&
    (!highlight.icon || typeof highlight.icon === 'string') &&
    (!highlight.order || typeof highlight.order === 'number')
  );
}

export function isBeachPartyDetails(value: unknown): value is BeachPartyDetails {
  if (!value || typeof value !== 'object') return false;
  const details = value as Record<string, unknown>;
  return (
    typeof details.location === 'string' &&
    typeof details.time === 'string' &&
    (!details.dress_code || typeof details.dress_code === 'string') &&
    Array.isArray(details.features)
  );
}