export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          venue: string
          capacity: number
          start_time: string
          end_time: string
          registration_deadline: string
          theme: string
          meta_description: string | null
          meta_keywords: string[] | null
          venue_features: Json | null
          event_highlights: Json | null
        }
        Insert: {
          title: string
          description: string
          venue: string
          capacity: number
          start_time: string
          end_time: string
          registration_deadline: string
          theme: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          venue_features?: Json | null
          event_highlights?: Json | null
        }
      }
      fashion_images: {
        Row: {
          id: string
          event_id: string
          category: string
          url: string
          alt_text: string
          metadata: Json | null
        }
        Insert: {
          event_id: string
          category: string
          url: string
          alt_text: string
          metadata?: Json | null
        }
      }
      tickets: {
        Row: {
          id: string
          event_id: string
          ticket_type: string
          price: number
          quantity_available: number
          benefits: string[]
          early_bird_deadline?: string
          early_bird_price?: number
          group_discount_threshold?: number
          group_discount_percentage?: number
        }
        Insert: {
          event_id: string
          ticket_type: string
          price: number
          quantity_available: number
          benefits: string[]
          early_bird_deadline?: string
          early_bird_price?: number
          group_discount_threshold?: number
          group_discount_percentage?: number
        }
      }
      sponsor_ticket_allocations: {
        Row: {
          id: string;
          sponsor_id: string;
          event_id: string;
          ticket_type: string;
          quantity_allocated: number;
          quantity_used: number;
          allocation_expiry: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['sponsor_ticket_allocations']['Row'], 'id' | 'created_at' | 'updated_at'>;
      };
      sponsor_ticket_redemptions: {
        Row: {
          id: string;
          allocation_id: string;
          redeemed_by: string;
          redeemed_at: string;
          ticket_code: string;
          status: 'active' | 'used' | 'expired' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['sponsor_ticket_redemptions']['Row'], 'id' | 'created_at' | 'updated_at'>;
      };
    }
  }
} 


