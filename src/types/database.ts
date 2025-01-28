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
  created_at: string;
  updated_at: string;
  name: "valentines_fashion_show" | "spring_fling_fashion_show" | "summer_splash_fashion_show" | "fall_fantasy_fashion_show" | "swim_paradise_show";
  subtype: "main_show" | "vip_session" | "workshop" | "networking" | "photo_session" | "after_party";
  event_content: Array<{
    id: string;
    event_id: string;
    content_type: string;
    title: string;
    content: string;
    media_urls: string[];
    publish_date: string;
    engagement_metrics: any;
    created_at: string;
    updated_at: string;
  }>;
  fashion_collections: Array<{
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
  }>;
  fashion_images: Array<{
    id: string;
    category: "event_hero" | "event_gallery" | "backstage" | "designer_profile" | "model_profile" | "promotional" | "press_kit";
    url: string;
    thumbnail_url: string;
    alt_text: string;
    metadata: any;
    credits: string;
    event_id: string;
    created_at: string;
    updated_at: string;
    dimensions: any;
    formats: any;
  }>;
  event_tickets: Array<{
    id: string;
    event_id: string;
    ticket_type: string;
    price: number;
    quantity_available: number;
    benefits: string[];
    early_bird_deadline: string;
    early_bird_price: number;
    group_discount_threshold: number;
    group_discount_percentage: number;
    created_at: string;
    updated_at: string;
  }>;
}