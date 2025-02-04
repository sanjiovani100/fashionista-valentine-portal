export interface EventImage {
  id: string;
  event_id: string;
  category: 'event_hero' | 'event_gallery' | 'backstage' | 'designer_profile' | 'model_profile' | 'promotional' | 'press_kit';
  url: string;
  alt_text: string;
  metadata: Record<string, any>;
}

export interface EventScheduleItem {
  time: string;
  title: string;
  description: string;
  location: string;
  speakers?: string[];
}

export interface TicketTier {
  id: string;
  event_id: string;
  ticket_type: string;
  price: number;
  quantity_available: number;
  benefits: string[];
  early_bird_deadline?: string;
  early_bird_price?: number;
  group_discount_threshold?: number;
  group_discount_percentage?: number;
}

export interface Sponsor {
  id: string;
  company_name: string;
  description: string;
  logo_url: string;
  sponsorship_level: string;
  marketing_materials: Record<string, any>;
}

export interface EventSponsor {
  id: string;
  event_id: string;
  sponsor_id: string;
  sponsorship_tier: string;
  is_featured: boolean;
  ad_placement: string[];
  display_priority: number;
  sponsor: Sponsor;
}

export interface EventDetails {
  id: string;
  name: string;
  title: string;
  description: string;
  venue: string;
  capacity: number;
  start_time: string;
  end_time: string;
  registration_deadline: string;
  theme: string;
  meta_description: string;
  meta_keywords: string[];
  venue_features: {
    pool_specs?: {
      dimensions: string;
      depth: string;
      temperature: string;
    };
    changing_facilities?: {
      capacity: number;
      amenities: string[];
    };
    photography_zones?: Array<{
      name: string;
      capacity: number;
      equipment_allowed: string[];
    }>;
  };
  event_highlights: {
    key_attractions: string[];
    special_guests?: string[];
    featured_designers?: string[];
  };
  images: EventImage[];
  schedule: EventScheduleItem[];
  tickets: TicketTier[];
  sponsors: EventSponsor[];
} 