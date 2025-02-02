import { LucideIcon } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import type { Json } from "@/types/database";

// Base Supabase types
export type EventContent = Database["public"]["Tables"]["event_content"]["Row"] & {
  event_id: string;
  media_urls: string[];
  publish_date: string;
  engagement_metrics: Json;
};

export type FashionImage = {
  id: string;
  category: "event_hero" | "event_gallery" | "backstage" | "designer_profile" | "model_profile" | "promotional" | "press_kit";
  url: string;
  thumbnail_url?: string | null;
  alt_text: string;
  metadata?: Json | null;
  credits?: string | null;
  event_id?: string | null;
  created_at: string;
  updated_at: string;
  dimensions?: Json | null;
  formats?: Json | null;
};

export type FashionCollection = Database["public"]["Tables"]["fashion_collections"]["Row"] & {
  designer_id: string;
  event_id: string;
  technical_requirements: string;
  sustainability_info: string;
};

export type EventTicket = {
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
};

export type DesignerProfile = Database["public"]["Tables"]["designer_profiles"]["Row"];

// Add the FashionEvent type
export type FashionEvent = {
  id: string;
  name: string;
  subtype: string;
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
  created_at?: string;
  updated_at?: string;
  fashion_images?: FashionImage[];
  fashion_collections?: FashionCollection[];
  event_content?: EventContent[];
  event_tickets?: EventTicket[];
  event_sponsors?: {
    id: string;
    sponsor_profiles: {
      id: string;
      company_name: string;
      logo_url?: string;
      website?: string;
      description: string;
    };
  }[];
};

// Feature types for the EventDetails component
export interface EventFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface EventDetails {
  title: string;
  date: string;
  description: string;
  features: EventFeature[];
}

// Extended types for components
export type Highlight = {
  id: string;
  event_id?: string | null;
  content_type: string;
  title: string;
  content: string;
  media_urls?: string[] | null;
  publish_date?: string | null;
  engagement_metrics?: Json | null;
  created_at: string;
  updated_at: string;
  image: string;
};

export type CollectionDisplay = {
  id: string;
  designer_id?: string | null;
  event_id?: string | null;
  collection_name: string;
  description: string;
  piece_count: number;
  technical_requirements?: string | null;
  sustainability_info?: string | null;
  created_at: string;
  updated_at: string;
  image?: string;
  designer_profiles?: DesignerProfile;
};

export type TicketDisplay = {
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
  subtitle?: string;
  perks?: string[];
};

// Component Props Types
export interface EventDetailsProps {
  features: EventFeature[];
}

export interface EventHighlightsProps {
  highlights: (EventContent & { image: string })[];
  images: FashionImage[];
}

export interface LingerieShowcaseProps {
  collections: (FashionCollection & { image?: string })[];
}

export interface TicketSelectionProps {
  tickets: TicketDisplay[];
  eventDate: string;
}
