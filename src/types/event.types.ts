import { LucideIcon } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

// Base Supabase types
export type EventContent = Database["public"]["Tables"]["event_content"]["Row"];
export type FashionImage = Database["public"]["Tables"]["fashion_images"]["Row"];
export type FashionCollection = Database["public"]["Tables"]["fashion_collections"]["Row"];
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
export interface Highlight extends EventContent {
  image: string;
}

export interface CollectionDisplay extends Omit<FashionCollection, 'image'> {
  image: string;
  designer_profiles?: DesignerProfile;
}

export interface TicketDisplay extends EventTicket {
  subtitle: string;
  perks: string[];
}

// Component Props Types
export interface EventDetailsProps {
  features: EventFeature[];
}

export interface EventHighlightsProps {
  highlights: Highlight[];
  images: FashionImage[];
}

export interface LingerieShowcaseProps {
  collections: CollectionDisplay[];
}

export interface TicketSelectionProps {
  tickets: TicketDisplay[];
  eventDate: string;
}