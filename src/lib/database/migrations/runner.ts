import { createClient } from '@supabase/supabase-js';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials');
}

// Initialize Supabase client with service key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface Migration {
  id: string;
  name: string;
  sql: string;
}

interface MigrationResult {
  id: string;
  name: string;
  success: boolean;
  error?: string;
  duration: number;
}

async function loadMigrations(): Promise<Migration[]> {
  const migrationsPath = join(__dirname, '.');
  const migrationFiles = readdirSync(migrationsPath)
    .filter(file => file.endsWith('.sql'))
    .sort();

  return migrationFiles.map(file => ({
    id: file.replace('.sql', ''),
    name: file,
    sql: readFileSync(join(migrationsPath, file), 'utf-8')
  }));
}

async function getExecutedMigrations(): Promise<string[]> {
  const { data, error } = await supabase
    .from('_migrations')
    .select('id')
    .eq('success', true);

  if (error) throw error;
  return data.map(m => m.id);
}

async function executeMigration(migration: Migration): Promise<MigrationResult> {
  const startTime = Date.now();
  let success = false;
  let error: string | undefined;

  try {
    // Split migration SQL into individual statements
    const statements = migration.sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    // Execute each statement
    for (const statement of statements) {
      const { error: stmtError } = await supabase.rpc('exec_sql', {
        sql: statement
      });

      if (stmtError) throw stmtError;
    }

    // Record successful migration
    const { error: recordError } = await supabase
      .from('_migrations')
      .insert({
        id: migration.id,
        name: migration.name,
        success: true,
        executed_by: 'system',
        duration: Date.now() - startTime
      });

    if (recordError) throw recordError;
    success = true;
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error';
    
    // Record failed migration
    await supabase
      .from('_migrations')
      .insert({
        id: migration.id,
        name: migration.name,
        success: false,
        error,
        executed_by: 'system',
        duration: Date.now() - startTime
      });
  }

  return {
    id: migration.id,
    name: migration.name,
    success,
    error,
    duration: Date.now() - startTime
  };
}

export async function runMigrations(): Promise<MigrationResult[]> {
  try {
    // Load all migrations
    const migrations = await loadMigrations();
    console.log(`Found ${migrations.length} migrations`);

    // Get executed migrations
    const executedMigrations = await getExecutedMigrations();
    console.log(`${executedMigrations.length} migrations already executed`);

    // Filter pending migrations
    const pendingMigrations = migrations.filter(
      m => !executedMigrations.includes(m.id)
    );
    console.log(`${pendingMigrations.length} migrations pending`);

    // Execute pending migrations
    const results: MigrationResult[] = [];
    for (const migration of pendingMigrations) {
      console.log(`Executing migration: ${migration.name}`);
      const result = await executeMigration(migration);
      results.push(result);

      if (!result.success) {
        console.error(`Migration failed: ${result.error}`);
        break;
      }
    }

    return results;
  } catch (error) {
    console.error('Migration runner failed:', error);
    throw error;
  }
} 


