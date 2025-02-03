import { LucideIcon } from "lucide-react";
import type { Json } from '@/types/supabase/base/json.types';
import type { EventName, EventSubtype } from '@/types/supabase/enums.types';

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
  venue_features: VenueFeatures;
  event_highlights: EventHighlight[];
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

// Transform functions with improved error handling
export function transformVenueFeatures(json: Json): VenueFeatures {
  if (typeof json !== 'object' || !json) {
    console.warn('Invalid venue features data:', json);
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
    console.warn('Invalid event highlights data:', json);
    return [];
  }

  return json.filter(isEventHighlight);
}