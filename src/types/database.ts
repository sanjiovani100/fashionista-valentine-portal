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
  // Add the missing relations
  event_content: Array<{
    id: string;
    content_type: string;
    title: string;
    content: string;
    media_urls?: string[];
    publish_date?: string;
  }>;
  fashion_collections: Array<{
    id: string;
    collection_name: string;
    description: string;
    piece_count: number;
    technical_requirements?: string;
    sustainability_info?: string;
  }>;
  fashion_images: Array<{
    id: string;
    url: string;
    category: string;
    alt_text: string;
    thumbnail_url?: string;
    credits?: string;
  }>;
  event_tickets: Array<{
    id: string;
    ticket_type: string;
    price: number;
    quantity_available: number;
    benefits?: string[];
    early_bird_deadline?: string;
    early_bird_price?: number;
    group_discount_threshold?: number;
    group_discount_percentage?: number;
  }>;
}