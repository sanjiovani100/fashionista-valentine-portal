import type { Json } from "../common.types";
import type { ImageCategory } from "../enums.types";

export interface EventContentRow {
  content: string;
  content_type: string;
  created_at: string | null;
  engagement_metrics: Json | null;
  event_id: string | null;
  id: string;
  media_urls: string[] | null;
  publish_date: string | null;
  title: string;
  updated_at: string | null;
}

export interface EventTicketRow {
  benefits: string[] | null;
  created_at: string | null;
  early_bird_deadline: string | null;
  early_bird_price: number | null;
  event_id: string | null;
  group_discount_percentage: number | null;
  group_discount_threshold: number | null;
  id: string;
  price: number;
  quantity_available: number;
  ticket_type: string;
  updated_at: string | null;
}

export interface FashionEventRow {
  capacity: number;
  created_at: string | null;
  description: string;
  end_time: string;
  id: string;
  meta_description: string | null;
  meta_keywords: string[] | null;
  name: string;
  registration_deadline: string;
  start_time: string;
  subtype: string;
  theme: string | null;
  title: string;
  updated_at: string | null;
  venue: string;
}

export interface FashionImageRow {
  alt_text: string;
  category: ImageCategory;
  created_at: string | null;
  credits: string | null;
  dimensions: Json | null;
  event_id: string | null;
  formats: Json | null;
  id: string;
  metadata: Json | null;
  thumbnail_url: string | null;
  updated_at: string | null;
  url: string;
}


