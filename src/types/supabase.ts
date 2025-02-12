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
          date: string
          location: string
          capacity: number
          organizer_id: string
          status: 'draft' | 'published' | 'cancelled'
        }
        Insert: {
          title: string
          description: string
          date: string
          location: string
          capacity: number
          organizer_id: string
          status?: 'draft' | 'published' | 'cancelled'
        }
      }
      tickets: {
        Row: {
          id: string
          event_id: string
          type: 'regular' | 'vip' | 'early_bird'
          price: number
          quantity: number
          sold: number
          created_at: string
        }
        Insert: {
          event_id: string
          type: 'regular' | 'vip' | 'early_bird'
          price: number
          quantity: number
        }
      }
      sponsors: {
        Row: {
          id: string
          name: string
          level: 'gold' | 'silver' | 'bronze'
          benefits: string[]
          contact_email: string
          created_at: string
        }
        Insert: {
          name: string
          level: 'gold' | 'silver' | 'bronze'
          benefits: string[]
          contact_email: string
        }
      }
      transactions: {
        Row: {
          id: string
          ticket_id: string
          user_id: string
          quantity: number
          total_amount: number
          payment_intent_id: string
          status: 'pending' | 'completed' | 'failed'
          created_at: string
        }
        Insert: {
          ticket_id: string
          user_id: string
          quantity: number
          total_amount: number
          payment_intent_id: string
          status?: 'pending' | 'completed' | 'failed'
        }
      }
    }
  }
} 


