import { Json } from './supabase/base/json.types';
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
  metadata?: Record<string, unknown>;
  credits?: string | null;
  event_id: string | null;
  dimensions?: Record<string, unknown>;
  formats?: Record<string, unknown>;
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
  engagement_metrics?: Record<string, unknown>;
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
}

// Type guards with improved validation
export function isVenueFeatures(value: unknown): value is VenueFeatures {
  if (!value || typeof value !== 'object') return false;
  const features = value as Record<string, unknown>;
  
  return (
    Array.isArray(features.amenities) &&
    features.amenities.every(item => typeof item === 'string') &&
    Array.isArray(features.accessibility) &&
    features.accessibility.every(item => typeof item === 'string') &&
    (!features.technical_equipment || (
      Array.isArray(features.technical_equipment) &&
      features.technical_equipment.every(item => typeof item === 'string')
    )) &&
    (!features.special_requirements || (
      Array.isArray(features.special_requirements) &&
      features.special_requirements.every(item => typeof item === 'string')
    ))
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
    Array.isArray(details.features) &&
    details.features.every(item => typeof item === 'string')
  );
}

export function transformVenueFeatures(json: Json): VenueFeatures {
  if (!isVenueFeatures(json)) {
    throw new Error('Invalid venue features format');
  }
  return json;
}

export function transformEventHighlights(json: Json[]): EventHighlight[] {
  if (!Array.isArray(json) || !json.every(isEventHighlight)) {
    throw new Error('Invalid event highlights format');
  }
  return json;
}

export function transformBeachPartyDetails(json: Json): BeachPartyDetails {
  if (!isBeachPartyDetails(json)) {
    throw new Error('Invalid beach party details format');
  }
  return json;
}