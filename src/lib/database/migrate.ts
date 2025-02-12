import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

interface Migration {
  id: string;
  name: string;
  sql: string;
  description: string;
  dependencies?: string[];
}

/**
 * Creates the migrations table if it doesn't exist
 */
async function createMigrationsTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS "_migrations" (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      executed_at TIMESTAMPTZ DEFAULT now(),
      executed_by UUID REFERENCES auth.users(id),
      success BOOLEAN NOT NULL,
      error TEXT,
      duration INTEGER -- in milliseconds
    );
  `;

  return supabase.rpc('exec_sql', { sql });
}

/**
 * Gets a list of executed migrations
 */
async function getExecutedMigrations(): Promise<string[]> {
  const { data, error } = await supabase
    .from('_migrations')
    .select('id')
    .eq('success', true);

  if (error) throw error;
  return (data || []).map(m => m.id);
}

/**
 * Executes a single migration
 */
async function executeMigration(migration: Migration) {
  const startTime = Date.now();
  let success = false;
  let error: string | null = null;

  try {
    // Check dependencies
    if (migration.dependencies?.length) {
      const executed = await getExecutedMigrations();
      const missing = migration.dependencies.filter(d => !executed.includes(d));
      if (missing.length) {
        throw new Error(`Missing dependencies: ${missing.join(', ')}`);
      }
    }

    // Execute migration
    await supabase.rpc('exec_sql', { sql: migration.sql });
    success = true;
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error';
    throw e;
  } finally {
    // Record migration attempt
    const duration = Date.now() - startTime;
    await supabase.from('_migrations').insert({
      id: migration.id,
      name: migration.name,
      success,
      error,
      duration,
      executed_by: (await supabase.auth.getUser()).data.user?.id,
    });
  }
}

/**
 * Runs pending migrations
 */
export async function runMigrations(migrations: Migration[]) {
  try {
    console.log('Starting migrations...');

    // Create migrations table
    await createMigrationsTable();

    // Get executed migrations
    const executed = await getExecutedMigrations();

    // Filter and sort pending migrations
    const pending = migrations
      .filter(m => !executed.includes(m.id))
      .sort((a, b) => {
        // If b depends on a, b should come after a
        if (b.dependencies?.includes(a.id)) return -1;
        // If a depends on b, a should come after b
        if (a.dependencies?.includes(b.id)) return 1;
        return 0;
      });

    if (!pending.length) {
      console.log('No pending migrations');
      return { success: true };
    }

    // Execute pending migrations
    for (const migration of pending) {
      console.log(`Executing migration: ${migration.name}`);
      await executeMigration(migration);
      console.log(`Completed migration: ${migration.name}`);
    }

    console.log('Migrations completed successfully');
    return { success: true };
  } catch (error) {
    console.error('Error running migrations:', error);
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined,
      },
    };
  }
}

/**
 * Rolls back the last successful migration
 */
export async function rollbackLastMigration() {
  try {
    const { data, error } = await supabase
      .from('_migrations')
      .select('*')
      .eq('success', true)
      .order('executed_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    if (!data) {
      console.log('No migrations to roll back');
      return { success: true };
    }

    // Record rollback attempt
    await supabase.from('_migrations').insert({
      id: `${data.id}_rollback`,
      name: `Rollback: ${data.name}`,
      success: false,
      executed_by: (await supabase.auth.getUser()).data.user?.id,
    });

    // Delete the migration record
    await supabase
      .from('_migrations')
      .delete()
      .eq('id', data.id);

    console.log(`Rolled back migration: ${data.name}`);
    return { success: true };
  } catch (error) {
    console.error('Error rolling back migration:', error);
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined,
      },
    };
  }
}

/**
 * Gets migration status
 */
export async function getMigrationStatus() {
  try {
    const { data, error } = await supabase
      .from('_migrations')
      .select('*')
      .order('executed_at', { ascending: false });

    if (error) throw error;

    return {
      success: true,
      data: data || [],
    };
  } catch (error) {
    console.error('Error getting migration status:', error);
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined,
      },
    };
  }
} 


