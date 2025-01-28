export interface FashionEvent {
  id: string;
  title: string;
  description: string;
  venue: string;
  capacity: number;
  start_time: string;
  end_time: string;
  registration_deadline: string;
  theme?: string;
  meta_description?: string;
  meta_keywords?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface EventTicket {
  id: string;
  event_id: string;
  ticket_type: string;
  price: number;
  quantity_available: number;
  benefits?: string[];
  early_bird_deadline?: string;
  early_bird_price?: number;
  group_discount_threshold?: number;
  group_discount_percentage?: number;
}

export interface DesignerProfile {
  id: string;
  brand_name: string;
  designer_name: string;
  bio: string;
  website?: string;
  social_media?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  achievements?: string[];
  contact_email: string;
  contact_phone?: string;
}