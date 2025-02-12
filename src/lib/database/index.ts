import { createClient } from '@supabase/supabase-js';
import { setupSchema } from './setup/schema';
import { runMigrations } from './setup/migrations';
import { validateSchema } from './setup/validation';
import type { DatabaseSetupOptions } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Main Supabase client instance
 */
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Sets up the database with schema, migrations, and validation
 */
export async function setupDatabase(options: DatabaseSetupOptions = {}) {
  try {
    console.log('Starting database setup...');

    // Validate environment
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing required environment variables');
    }

    // Setup schema
    await setupSchema();

    // Run migrations
    if (options.runMigrations !== false) {
      await runMigrations();
    }

    // Validate schema
    if (options.validateSchema !== false) {
      await validateSchema();
    }

    console.log('Database setup completed successfully');
    return { success: true };
  } catch (error) {
    console.error('Error setting up database:', error);
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined,
      },
    };
  }
}

export * from './types';
export * from './queries';
export * from './utils'; 


