import { LucideIcon } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

export type EventContent = Database["public"]["Tables"]["event_content"]["Row"];
export type FashionImage = Database["public"]["Tables"]["fashion_images"]["Row"];
export type FashionCollection = Database["public"]["Tables"]["fashion_collections"]["Row"];
export type EventTicket = Database["public"]["Tables"]["event_tickets"]["Row"];
export type DesignerProfile = Database["public"]["Tables"]["designer_profiles"]["Row"];

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Highlight {
  title: string;
  description: string;
  image: string;
}

export interface CollectionDisplay extends FashionCollection {
  image: string;
  designer_profiles?: DesignerProfile;
}

export interface TicketDisplay {
  title: string;
  subtitle: string;
  price: string;
  perks: string[];
  limited?: boolean;
}

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