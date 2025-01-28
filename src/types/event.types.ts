import { LucideIcon } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

// Base Supabase types
export type EventContent = Database["public"]["Tables"]["event_content"]["Row"];
export type FashionImage = Database["public"]["Tables"]["fashion_images"]["Row"];
export type FashionCollection = Database["public"]["Tables"]["fashion_collections"]["Row"];
export type EventTicket = Database["public"]["Tables"]["event_tickets"]["Row"];
export type DesignerProfile = Database["public"]["Tables"]["designer_profiles"]["Row"];

// Transformed types for components
export interface Feature extends EventContent {
  icon: LucideIcon;
}

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
  features: Feature[];
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