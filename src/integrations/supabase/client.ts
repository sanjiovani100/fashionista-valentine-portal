import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Use environment variables for the URL and key
const SUPABASE_URL = "https://dssddsgypklubzkshkxo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzc2Rkc2d5cGtsdWJ6a3Noa3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MDkyNjEsImV4cCI6MjA1MzM4NTI2MX0.u3ObFcxAaqHKXVkw8stED2ZjZ7O85G2jkJpX9gPOMMk";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase URL or Anon Key');
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

// Add a simple test query to verify connection
export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase
      .from('fashion_events')
      .select('id')
      .limit(1);
      
    if (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }
    
    console.info('Supabase connection test successful');
    return true;
  } catch (err) {
    console.error('Supabase connection test error:', err);
    return false;
  }
};

// Run connection test in development
if (process.env.NODE_ENV === 'development') {
  testSupabaseConnection();
}