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
  FashionCollection
} from './event.types';

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
  event_tickets?: EventTicket[];
  event_sponsors?: EventSponsor[];
  fashion_collections?: FashionCollection[];
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
  FashionCollection
};