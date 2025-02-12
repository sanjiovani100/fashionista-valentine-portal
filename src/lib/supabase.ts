import { createClient } from '@supabase/supabase-js';
import config from '@/config';

// Create a single instance of the Supabase client
const supabase = createClient(config.supabase.url, config.supabase.serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Create a client with anonymous key for public operations
const supabasePublic = createClient(config.supabase.url, config.supabase.anonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

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


