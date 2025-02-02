import type { Json } from './supabase/base/json.types';
import type { EventName, EventSubtype } from './supabase/base/enums.types';
import type {
  VenueFeatures,
  EventHighlight,
  BeachPartyDetails,
  EventContent,
  FashionImage,
  EventTicket,
  EventSponsor,
  SwimwearEventDetails,
  FashionEvent
} from './event.types';

export interface EventDetails extends FashionEvent {
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
  event_sponsors?: EventSponsor[];
}

export type {
  VenueFeatures,
  EventHighlight,
  BeachPartyDetails,
  EventContent,
  FashionImage,
  EventTicket,
  EventSponsor,
  SwimwearEventDetails,
  FashionEvent
};

// Type guard for VenueFeatures
export function isVenueFeatures(value: unknown): value is VenueFeatures {
  if (typeof value !== 'object' || value === null) return false;
  const features = value as Record<string, unknown>;
  return (
    Array.isArray(features.amenities) &&
    Array.isArray(features.accessibility) &&
    (!features.technical_equipment || Array.isArray(features.technical_equipment)) &&
    (!features.special_requirements || Array.isArray(features.special_requirements))
  );
}

// Type guard for EventHighlight
export function isEventHighlight(value: unknown): value is EventHighlight {
  if (typeof value !== 'object' || value === null) return false;
  const highlight = value as Record<string, unknown>;
  return (
    typeof highlight.title === 'string' &&
    typeof highlight.description === 'string' &&
    (!highlight.icon || typeof highlight.icon === 'string') &&
    (!highlight.order || typeof highlight.order === 'number')
  );
}

// Type guard for BeachPartyDetails
export function isBeachPartyDetails(value: unknown): value is BeachPartyDetails {
  if (typeof value !== 'object' || value === null) return false;
  const details = value as Record<string, unknown>;
  return (
    typeof details.location === 'string' &&
    typeof details.time === 'string' &&
    (!details.dress_code || typeof details.dress_code === 'string') &&
    Array.isArray(details.features)
  );
}

// Type guard for SwimwearEventDetails
export function isSwimwearEventDetails(value: unknown): value is SwimwearEventDetails {
  if (typeof value !== 'object' || value === null) return false;
  const details = value as Partial<SwimwearEventDetails>;
  return (
    typeof details.id === 'string' &&
    (details.event_id === null || typeof details.event_id === 'string') &&
    isBeachPartyDetails(details.beach_party_details) &&
    Array.isArray(details.fitting_sessions) &&
    Array.isArray(details.beauty_workshops)
  );
}