import { createClient } from '@supabase/supabase-js';
import { 
  TableSchemas, 
  TableIndexes, 
  RLSPolicies, 
  Triggers,
  TableConstraints,
  TableSchema 
} from './schema';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Creates a table with the specified schema
 */
async function createTable(tableName: string, schema: TableSchema) {
  const columns = Object.entries(schema)
    .map(([name, type]) => `"${name}" ${type}`)
    .join(',\n  ');

  const sql = `
    CREATE TABLE IF NOT EXISTS "${tableName}" (
      ${columns}
    );
  `;

  return supabase.rpc('exec_sql', { sql });
}

/**
 * Applies additional constraints to a table
 */
async function applyConstraints(tableName: string, constraints: string[]) {
  for (const constraintSql of constraints) {
    await supabase.rpc('exec_sql', { sql: constraintSql });
  }
}

/**
 * Creates indexes for a table
 */
async function createIndexes(tableName: string, indexes: string[]) {
  for (const indexSql of indexes) {
    await supabase.rpc('exec_sql', { sql: indexSql });
  }
}

/**
 * Applies RLS policies to a table
 */
async function applyRLSPolicies(tableName: string, policies: string[]) {
  // Enable RLS
  await supabase.rpc('exec_sql', {
    sql: `ALTER TABLE "${tableName}" ENABLE ROW LEVEL SECURITY;`,
  });

  // Drop existing policies
  await supabase.rpc('exec_sql', {
    sql: `
      DO $$ 
      BEGIN
        EXECUTE (
          SELECT string_agg('DROP POLICY IF EXISTS "' || polname || '" ON "${tableName}";', ' ')
          FROM pg_policies 
          WHERE tablename = '${tableName}'
        );
      END $$;
    `,
  });

  // Apply new policies
  for (const policySql of policies) {
    await supabase.rpc('exec_sql', { sql: policySql });
  }
}

/**
 * Creates database triggers
 */
async function createTriggers() {
  for (const [name, sql] of Object.entries(Triggers)) {
    await supabase.rpc('exec_sql', { sql });
  }
}

/**
 * Sets up the entire database schema
 */
export async function setupDatabase() {
  try {
    console.log('Starting database setup...');

    // Create tables
    for (const [tableName, schema] of Object.entries(TableSchemas)) {
      console.log(`Creating table: ${tableName}`);
      await createTable(tableName, schema);
    }

    // Apply additional constraints
    for (const [tableName, constraints] of Object.entries(TableConstraints)) {
      console.log(`Applying constraints for: ${tableName}`);
      await applyConstraints(tableName, constraints);
    }

    // Create indexes
    for (const [tableName, indexes] of Object.entries(TableIndexes)) {
      console.log(`Creating indexes for: ${tableName}`);
      await createIndexes(tableName, indexes);
    }

    // Apply RLS policies
    for (const [tableName, policies] of Object.entries(RLSPolicies)) {
      console.log(`Applying RLS policies for: ${tableName}`);
      await applyRLSPolicies(tableName, policies);
    }

    // Create triggers
    console.log('Creating triggers...');
    await createTriggers();

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

/**
 * Verifies the database setup
 */
export async function verifyDatabaseSetup() {
  const checks = [];

  // Check tables
  for (const tableName of Object.keys(TableSchemas)) {
    const { data, error } = await supabase
      .from(tableName)
      .select('count(*)')
      .limit(1);
    
    checks.push({
      name: `Table ${tableName}`,
      success: !error,
      error: error?.message,
    });
  }

  // Check constraints
  for (const [tableName, constraints] of Object.entries(TableConstraints)) {
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        SELECT COUNT(*) 
        FROM information_schema.table_constraints 
        WHERE table_name = '${tableName}' 
        AND constraint_type = 'UNIQUE';
      `,
    });

    checks.push({
      name: `Constraints for ${tableName}`,
      success: !error && data?.[0]?.count > 0,
      error: error?.message,
    });
  }

  // Check RLS
  for (const tableName of Object.keys(RLSPolicies)) {
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        SELECT COUNT(*) 
        FROM pg_policies 
        WHERE tablename = '${tableName}';
      `,
    });

    checks.push({
      name: `RLS policies for ${tableName}`,
      success: !error && data?.[0]?.count > 0,
      error: error?.message,
    });
  }

  return checks;
}

/**
 * Cleans up the database (for testing purposes)
 */
export async function cleanupDatabase() {
  try {
    // Drop tables in reverse order to handle dependencies
    const tables = Object.keys(TableSchemas).reverse();
    
    for (const tableName of tables) {
      await supabase.rpc('exec_sql', {
        sql: `DROP TABLE IF EXISTS "${tableName}" CASCADE;`,
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error cleaning up database:', error);
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined,
      },
    };
  }
} 


