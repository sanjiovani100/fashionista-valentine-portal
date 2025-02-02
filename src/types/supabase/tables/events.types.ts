import type { Json } from '../base/json.types';
import type { EventName, EventSubtype, ImageCategory } from '../base/enums.types';

export interface FashionEventRow {
  id: string;
  name: EventName;
  subtype: EventSubtype;
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
  created_at: string;
  updated_at: string;
  swimwear_specific_requirements?: string | null;
  venue_features: Json;
  event_highlights: Json;
}

export interface FashionImageRow {
  id: string;
  category: ImageCategory;
  url: string;
  thumbnail_url?: string | null;
  alt_text: string;
  metadata?: Json | null;
  credits?: string | null;
  event_id: string | null;
  created_at: string;
  updated_at: string;
  dimensions?: Json | null;
  formats?: Json | null;
  description?: string | null;
}

export interface EventContentRow {
  id: string;
  event_id: string | null;
  content_type: string;
  title: string;
  content: string;
  media_urls?: string[] | null;
  publish_date?: string | null;
  engagement_metrics?: Json | null;
  created_at: string;
  updated_at: string;
}

export interface EventTicketRow {
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