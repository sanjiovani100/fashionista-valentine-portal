import { Database } from "@/integrations/supabase/types";

export type EventContent = Database["public"]["Tables"]["event_content"]["Row"];
export type FashionImage = Database["public"]["Tables"]["fashion_images"]["Row"];
export type FashionCollection = Database["public"]["Tables"]["fashion_collections"]["Row"];
export type EventTicket = Database["public"]["Tables"]["event_tickets"]["Row"];
export type DesignerProfile = Database["public"]["Tables"]["designer_profiles"]["Row"];

export interface EventHighlightsProps {
  highlights?: EventContent[];
  images?: FashionImage[];
}

export interface EventDetailsProps {
  features?: EventContent[];
}

export interface LingerieShowcaseProps {
  collections?: (FashionCollection & {
    designer_profiles: DesignerProfile;
  })[];
}

export interface TicketSelectionProps {
  tickets?: EventTicket[];
  eventDate?: string;
}

export interface CtaProps {
  title?: string;
  description?: string;
  eventDate?: string;
}