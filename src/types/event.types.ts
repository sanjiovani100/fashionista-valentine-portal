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
export interface Highlight extends Omit<EventContent, 'image'> {
  image: string;
  engagement_metrics?: Json | null;
  media_urls?: string[] | null;
  publish_date?: string | null;
  event_id?: string | null;
}

export interface CollectionDisplay extends FashionCollection {
  designer_profiles?: DesignerProfile;
  designer_id?: string | null;
  event_id?: string | null;
  technical_requirements?: string | null;
  sustainability_info?: string | null;
}

export interface TicketDisplay extends Partial<EventTicket> {
  id: string;
  ticket_type: string;
  price: number;
  quantity_available: number;
  subtitle?: string;
  perks?: string[];
  benefits?: string[] | null;
  early_bird_deadline?: string | null;
  early_bird_price?: number | null;
  group_discount_threshold?: number | null;
  group_discount_percentage?: number | null;
}

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