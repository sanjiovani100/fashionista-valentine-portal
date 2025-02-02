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

export interface FashionCollection {
  id: string;
  designer_id?: string | null;
  event_id?: string | null;
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
  fashion_collections?: FashionCollection[] | null;
  event_content?: any[] | null;
  event_tickets?: any[] | null;
  event_sponsors?: any[] | null;
  fashion_images?: any[] | null;
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
  
  return isVenueFeatures(json) ? json : { amenities: [], accessibility: [] };
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