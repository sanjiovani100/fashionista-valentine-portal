export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string;
          venue: string;
          capacity: number;
          start_time: string;
          end_time: string;
          registration_deadline: string;
          theme: string;
          meta_description: string | null;
          meta_keywords: string[] | null;
          venue_features: Json | null;
          event_highlights: Json | null;
        };
        Insert: {
          title: string;
          description: string;
          venue: string;
          capacity: number;
          start_time: string;
          end_time: string;
          registration_deadline: string;
          theme: string;
          meta_description?: string | null;
          meta_keywords?: string[] | null;
          venue_features?: Json | null;
          event_highlights?: Json | null;
        };
      };
      tickets: {
        Row: {
          id: string;
          event_id: string;
          type: string;
          price: number;
          quantity_available: number;
          benefits: string[];
          early_bird_deadline?: string;
          early_bird_price?: number;
          group_discount_threshold?: number;
          group_discount_percentage?: number;
        };
        Insert: {
          event_id: string;
          type: string;
          price: number;
          quantity_available: number;
          benefits: string[];
          early_bird_deadline?: string;
          early_bird_price?: number;
          group_discount_threshold?: number;
          group_discount_percentage?: number;
        };
      };
    };
  };
} 


