import type { Json } from './supabase/base/json.types';
import type { EventName, EventSubtype, ImageCategory } from './supabase/base/enums.types';

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
  metadata?: Record<string, unknown> | null;
  credits?: string | null;
  event_id: string | null;
  created_at: string;
  updated_at: string;
  dimensions?: Record<string, unknown> | null;
  formats?: Record<string, unknown> | null;
  description?: string | null;
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
  created_at: string;
  updated_at: string;
}

export interface EventSponsor {
  id: string;
  event_id: string;
  sponsor_id: string;
  sponsorship_tier: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  ad_placement?: string[];
  display_priority?: number;
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
  size_range?: Record<string, string>;
  materials?: string[];
  created_at: string;
  updated_at: string;
}

export interface SwimwearEventDetails {
  id: string;
  event_id: string;
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
  fashion_collections?: FashionCollection[] | null;
  event_content?: EventContent[] | null;
  event_tickets?: EventTicket[] | null;
  event_sponsors?: EventSponsor[] | null;
  fashion_images?: FashionImage[] | null;
}

// Type guards with improved validation
export function isVenueFeatures(value: unknown): value is VenueFeatures {
  if (!value || typeof value !== 'object') return false;
  const features = value as Record<string, unknown>;
  
  return (
    Array.isArray(features.amenities) &&
    features.amenities.every(item => typeof item === 'string') &&
    Array.isArray(features.accessibility) &&
    features.accessibility.every(item => typeof item === 'string')
  );
}

export function isEventHighlight(value: unknown): value is EventHighlight {
  if (!value || typeof value !== 'object') return false;
  const highlight = value as Record<string, unknown>;
  
  return (
    typeof highlight.title === 'string' &&
    typeof highlight.description === 'string'
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

// Transform functions
export function transformVenueFeatures(json: Json): VenueFeatures {
  if (typeof json !== 'object' || !json) {
    return { amenities: [], accessibility: [] };
  }
  
  const features = json as Record<string, unknown>;
  return {
    amenities: Array.isArray(features.amenities) ? features.amenities.filter(item => typeof item === 'string') : [],
    accessibility: Array.isArray(features.accessibility) ? features.accessibility.filter(item => typeof item === 'string') : [],
    technical_equipment: Array.isArray(features.technical_equipment) ? features.technical_equipment.filter(item => typeof item === 'string') : undefined,
    special_requirements: Array.isArray(features.special_requirements) ? features.special_requirements.filter(item => typeof item === 'string') : undefined
  };
}

export function transformEventHighlights(json: Json): EventHighlight[] {
  if (!Array.isArray(json)) {
    return [];
  }

  return json.filter(isEventHighlight);
}

export function transformBeachPartyDetails(json: Json): BeachPartyDetails {
  const defaultDetails: BeachPartyDetails = {
    location: '',
    time: '',
    features: []
  };

  return isBeachPartyDetails(json) ? json : defaultDetails;
}