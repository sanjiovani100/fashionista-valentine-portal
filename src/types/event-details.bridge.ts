import type { Database } from '@/integrations/supabase/types';

// Base database types
type DbFashionEvent = Database['public']['Tables']['fashion_events']['Row'];
type DbFashionImage = Database['public']['Tables']['fashion_images']['Row'];
type DbEventContent = Database['public']['Tables']['event_content']['Row'];
type DbSwimwearDetails = Database['public']['Tables']['swimwear_event_details']['Row'];
type DbEventTicket = Database['public']['Tables']['event_tickets']['Row'];
type DbEventSponsor = Database['public']['Tables']['event_sponsors']['Row'];

// Specific JSON structure types
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

// Frontend types that extend database types
export interface EventDetails extends Omit<DbFashionEvent, 'venue_features' | 'event_highlights'> {
  venue_features: VenueFeatures;
  event_highlights: EventHighlight[];
  fashion_images?: DbFashionImage[] | null;
  event_content?: DbEventContent[] | null;
  swimwear_event_details?: (DbSwimwearDetails & {
    beach_party_details: BeachPartyDetails;
  }) | null;
  event_tickets?: DbEventTicket[] | null;
  event_sponsors?: (DbEventSponsor & {
    sponsor_profiles: {
      company_name: string;
    };
  })[] | null;
}