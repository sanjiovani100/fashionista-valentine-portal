import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';
import { env } from '@/config/env';
import { logger } from '@/config/logger';

// Create Supabase client with environment-specific configuration
export const supabase = createClient<Database>(
  env.SUPABASE_URL || 'http://localhost:54321',
  env.SUPABASE_KEY || 'dummy-key-for-development',
  {
    auth: {
      persistSession: env.NODE_ENV !== 'test',
      autoRefreshToken: env.NODE_ENV !== 'test',
      detectSessionInUrl: env.NODE_ENV !== 'test'
    }
  }
);

// Mock data for development
const mockData = {
  events: [
    {
      id: '1',
      title: 'Fashion Week 2025',
      description: 'Annual fashion showcase',
      date: new Date().toISOString(),
      location: 'Paris',
      capacity: 1000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
};

// Type-safe database functions with mock support
export const db = {
  events: {
    create: async (data: Database['public']['Tables']['events']['Insert']) => {
      if (env.NODE_ENV === 'development') {
        logger.info('Using mock data for events.create');
        return { ...data, id: Date.now().toString() };
      }
      const { data: result, error } = await supabase
        .from('events')
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    getById: async (id: string) => {
      if (env.NODE_ENV === 'development') {
        logger.info('Using mock data for events.getById');
        return mockData.events.find(e => e.id === id);
      }
      const { data: result, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return result;
    },
    list: async () => {
      if (env.NODE_ENV === 'development') {
        logger.info('Using mock data for events.list');
        return mockData.events;
      }
      const { data: result, error } = await supabase
        .from('events')
        .select('*');
      if (error) throw error;
      return result;
    },
  },
  tickets: {
    create: async (data: Database['public']['Tables']['tickets']['Insert']) => {
      const { data: result, error } = await supabase
        .from('tickets')
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    purchase: async (data: Database['public']['Tables']['transactions']['Insert']) => {
      const { data: result, error } = await supabase
        .from('transactions')
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
  },
  sponsors: {
    create: async (data: Database['public']['Tables']['sponsors']['Insert']) => {
      const { data: result, error } = await supabase
        .from('sponsors')
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    getAnalytics: async (sponsorId: string) => {
      const { data: result, error } = await supabase
        .from('sponsor_analytics')
        .select('*')
        .eq('sponsor_id', sponsorId);
      if (error) throw error;
      return result;
    },
  }
};

// Types
export interface InsertEvent {
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
}

export interface InsertTicket {
  event_id: string;
  type: 'regular' | 'vip' | 'early_bird';
  price: number;
  quantity: number;
}

export interface TicketPurchase {
  ticket_id: string;
  user_id: string;
  quantity: number;
  total_amount: number;
  payment_intent_id: string;
}

export interface InsertSponsor {
  name: string;
  level: 'gold' | 'silver' | 'bronze';
  benefits: string[];
  contact_email: string;
} 