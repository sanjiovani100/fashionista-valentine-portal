import type { PostgrestError } from '@supabase/supabase-js'

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
          id: string;
          created_at: string;
          created_by: string | null;
          updated_by: string | null;
          title: string;
          description: string;
          venue: string;
          capacity: number;
          start_time: string;
          end_time: string;
          registration_deadline: string;
          theme: string;
          status: 'draft' | 'published' | 'cancelled' | 'deleted';
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
          created_by?: string | null;
          updated_by?: string | null;
          status?: 'draft' | 'published' | 'cancelled' | 'deleted';
          meta_description?: string | null;
          meta_keywords?: string[] | null;
          venue_features?: Json | null;
          event_highlights?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      };
      event_registrations: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          ticket_id: string;
          status: 'pending' | 'confirmed' | 'cancelled';
          payment_status: 'pending' | 'paid' | 'refunded' | 'cancelled';
          payment_intent_id?: string;
          attendee_details: Json[];
          created_at: string;
          updated_at: string;
          created_by?: string;
          updated_by?: string;
        };
        Insert: {
          event_id: string;
          user_id: string;
          ticket_id: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          payment_status?: 'pending' | 'paid' | 'refunded' | 'cancelled';
          payment_intent_id?: string;
          attendee_details: Json[];
          created_by?: string;
          updated_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_ticket_id_fkey"
            columns: ["ticket_id"]
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
          created_at: string;
          updated_at: string;
          created_by?: string;
          updated_by?: string;
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
          created_by?: string;
          updated_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tickets_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      };
      sponsor_ticket_allocations: {
        Row: {
          id: string;
          sponsor_id: string;
          event_id: string;
          ticket_type: string;
          quantity_allocated: number;
          quantity_used: number;
          allocation_expiry: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          sponsor_id: string;
          event_id: string;
          ticket_type: string;
          quantity_allocated: number;
          quantity_used?: number;
          allocation_expiry?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sponsor_ticket_allocations_sponsor_id_fkey"
            columns: ["sponsor_id"]
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sponsor_ticket_allocations_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      };
      sponsor_ticket_redemptions: {
        Row: {
          id: string;
          allocation_id: string;
          redeemed_by: string;
          redeemed_at: string;
          ticket_code: string;
          status: 'active' | 'used' | 'expired' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          allocation_id: string;
          redeemed_by: string;
          ticket_code: string;
          status: 'active' | 'used' | 'expired' | 'cancelled';
        };
        Relationships: [
          {
            foreignKeyName: "sponsor_ticket_redemptions_allocation_id_fkey"
            columns: ["allocation_id"]
            referencedRelation: "sponsor_ticket_allocations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sponsor_ticket_redemptions_redeemed_by_fkey"
            columns: ["redeemed_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      };
      users: {
        Row: {
          id: string;
          email: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
} 


