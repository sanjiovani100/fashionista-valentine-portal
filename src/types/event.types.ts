import { LucideIcon } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import type { Json } from "@/types/database";

// Base Supabase types
export type EventContent = Database["public"]["Tables"]["event_content"]["Row"] & {
  image?: string;
};

export type FashionImage = Database["public"]["Tables"]["fashion_images"]["Row"];
export type FashionCollection = Database["public"]["Tables"]["fashion_collections"]["Row"] & {
  image?: string;
};
export type EventTicket = Database["public"]["Tables"]["event_tickets"]["Row"];
export type DesignerProfile = Database["public"]["Tables"]["designer_profiles"]["Row"];

// Feature types for the EventDetails component
export interface EventFeature {
  icon: LucideIcon;
  title: string;
  content: string;
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