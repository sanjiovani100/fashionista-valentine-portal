export type ImageCategory = 
  | 'event_hero'
  | 'event_gallery'
  | 'backstage'
  | 'designer_profile'
  | 'model_profile'
  | 'promotional'
  | 'press_kit'
  | 'collection';

export interface EventImage {
  id: string;
  event_id: string;
  category: ImageCategory;
  url: string;
  alt_text: string;
  metadata: Record<string, any>;
}

export interface EventScheduleItem {
  time: string;
  title: string;
  description: string;
  location: string;
  category?: string;
  speakers?: string[];
  duration?: string;
  capacity?: number;
  isHighlight?: boolean;
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
  logo_url: string;
  description: string;
  marketing_materials?: {
    website?: string;
    brochure?: string;
    special_offer?: string;
    discount_code?: string;
    [key: string]: string | undefined;
  };
}

export interface EventSponsor {
  id: string;
  event_id: string;
  sponsor: Sponsor;
  sponsorship_tier: 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
  is_featured: boolean;
  display_priority: number;
  contribution_amount?: number;
  benefits?: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'tickets' | 'venue' | 'schedule' | 'guidelines';
}

export interface SupportContact {
  email: string;
  phone: string;
  hours: string;
  response_time: string;
  live_chat_available: boolean;
  support_ticket_url?: string;
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
  faqs: FAQItem[];
  support: SupportContact;
} 