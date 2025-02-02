import type { Json } from './database';
import type { EventName, EventSubtype, ImageCategory } from './supabase/database/enums';
import type { VenueFeatures, EventHighlight, BeachPartyDetails, EventContent, FashionImage, EventTicket, EventSponsor } from './event.types';

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
  swimwear_event_details?: {
    id: string;
    event_id: string | null;
    beach_party_details: BeachPartyDetails;
    pool_access_info: Record<string, unknown>;
    fitting_sessions: Record<string, unknown>[];
    beauty_workshops: Record<string, unknown>[];
    created_at: string;
    updated_at: string;
  } | null;
  fashion_images?: FashionImage[];
  event_content?: EventContent[];
  event_tickets?: EventTicket[];
  event_sponsors?: EventSponsor[];
}