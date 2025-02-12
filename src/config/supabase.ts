import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';
import type { Database } from '../types/database.types.js';

if (!env.SUPABASE_URL || !env.SUPABASE_KEY) {
  throw new Error('Missing required environment variables for Supabase connection');
}

export const supabase = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  }
); 


