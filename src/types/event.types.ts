import { LucideIcon } from "lucide-react";
import type { Json } from "@/types/database";

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

export interface FashionCollection {
  id: string;
  designer_id: string;
  event_id: string;
  collection_name: string;
  description: string;
  piece_count: number;
  technical_requirements: string;
  sustainability_info: string;
  created_at: string;
  updated_at: string;
  collection_type: string;
  materials: string[];
  size_range: Json;
}

export interface FashionImage {
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
}

export interface EventContent {
  id: string;
  event_id: string;
  content_type: string;
  title: string;
  content: string;
  media_urls?: string[];
  publish_date: string;
  engagement_metrics: Json;
  created_at: string;
  updated_at: string;
}

export interface EventTicket {
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
}

export interface SponsorProfile {
  id: string;
  company_name: string;
  logo_url?: string;
  website?: string;
  description: string;
}

export interface EventSponsor {
  id: string;
  sponsor_profiles: SponsorProfile;
}

export interface FashionEvent {
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
  event_sponsors?: EventSponsor[];
}