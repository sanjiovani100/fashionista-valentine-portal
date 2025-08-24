import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wnjudgmhabzhcttgyxou.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduanVkZ21oYWJ6aGN0dGd5eG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTIzODIsImV4cCI6MjA2ODY2ODM4Mn0.0Qmbqqq2h4-WzoknUdcdL6WPyKaaAF6HSgxJkggRwGA';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create main Supabase client for public operations
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public' // Explicitly use public schema
  },
  global: {
    headers: {
      'x-application-name': 'fashionos'
    }
  }
});

// Legacy alias for compatibility
const supabasePublic = supabase;

// Helper function to execute SQL with proper error handling
export async function execSQL(sql: string, values?: any[]): Promise<any> {
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql, values });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('SQL execution error:', error);
    throw error;
  }
}

// Helper function to get a single row by ID
export async function getById<T>(table: string, id: string): Promise<T | null> {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Helper function to get multiple rows with pagination
export async function getMany<T>(
  table: string,
  options: {
    page?: number;
    limit?: number;
    orderBy?: string;
    filters?: Record<string, any>;
  } = {}
): Promise<{ data: T[]; count: number }> {
  const {
    page = 1,
    limit = 10,
    orderBy = 'created_at',
    filters = {},
  } = options;

  let query = supabase
    .from(table)
    .select('*', { count: 'exact' });

  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query = query.eq(key, value);
    }
  });

  // Apply pagination and ordering
  query = query
    .order(orderBy)
    .range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;

  if (error) throw error;
  return { data, count: count || 0 };
}

// Helper function to insert a new record
export async function insert<T>(
  table: string,
  data: Partial<T>
): Promise<T> {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return result;
}

// Helper function to update a record
export async function update<T>(
  table: string,
  id: string,
  data: Partial<T>
): Promise<T> {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

// Helper function to delete a record
export async function remove(
  table: string,
  id: string
): Promise<void> {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Helper function to check if a record exists
export async function exists(
  table: string,
  filters: Record<string, any>
): Promise<boolean> {
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true })
    .match(filters);

  if (error) throw error;
  return (count || 0) > 0;
}

export { supabase, supabasePublic }; 


