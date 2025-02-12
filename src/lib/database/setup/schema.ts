import { supabase } from '..';
import { DatabaseResult } from '../types';
import { TableSchemas, TableIndexes, RLSPolicies, Triggers, TableConstraints } from '../../../types/database/schema';

/**
 * Creates a table with the specified schema
 */
async function createTable(tableName: string, schema: Record<string, string>): Promise<DatabaseResult> {
  try {
    const columns = Object.entries(schema)
      .map(([name, type]) => `"${name}" ${type}`)
      .join(',\n  ');

    const sql = `
      CREATE TABLE IF NOT EXISTS "${tableName}" (
        ${columns}
      );
    `;

    await supabase.rpc('exec_sql', { sql });
    return { success: true };
  } catch (error) {
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
 * Applies additional constraints to a table
 */
async function applyConstraints(tableName: string, constraints: string[]): Promise<DatabaseResult> {
  try {
    for (const constraintSql of constraints) {
      await supabase.rpc('exec_sql', { sql: constraintSql });
    }
    return { success: true };
  } catch (error) {
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
 * Creates indexes for a table
 */
async function createIndexes(tableName: string, indexes: string[]): Promise<DatabaseResult> {
  try {
    for (const indexSql of indexes) {
      await supabase.rpc('exec_sql', { sql: indexSql });
    }
    return { success: true };
  } catch (error) {
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
 * Applies RLS policies to a table
 */
async function applyRLSPolicies(tableName: string, policies: string[]): Promise<DatabaseResult> {
  try {
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

    return { success: true };
  } catch (error) {
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
 * Creates database triggers
 */
async function createTriggers(): Promise<DatabaseResult> {
  try {
    for (const [name, sql] of Object.entries(Triggers)) {
      await supabase.rpc('exec_sql', { sql });
    }
    return { success: true };
  } catch (error) {
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
 * Sets up the database schema
 */
export async function setupSchema(): Promise<DatabaseResult> {
  try {
    console.log('Setting up database schema...');

    // Create tables
    for (const [tableName, schema] of Object.entries(TableSchemas)) {
      console.log(`Creating table: ${tableName}`);
      const result = await createTable(tableName, schema);
      if (!result.success) throw result.error;
    }

    // Apply additional constraints
    for (const [tableName, constraints] of Object.entries(TableConstraints)) {
      console.log(`Applying constraints for: ${tableName}`);
      const result = await applyConstraints(tableName, constraints);
      if (!result.success) throw result.error;
    }

    // Create indexes
    for (const [tableName, indexes] of Object.entries(TableIndexes)) {
      console.log(`Creating indexes for: ${tableName}`);
      const result = await createIndexes(tableName, indexes);
      if (!result.success) throw result.error;
    }

    // Apply RLS policies
    for (const [tableName, policies] of Object.entries(RLSPolicies)) {
      console.log(`Applying RLS policies for: ${tableName}`);
      const result = await applyRLSPolicies(tableName, policies);
      if (!result.success) throw result.error;
    }

    // Create triggers
    console.log('Creating triggers...');
    const result = await createTriggers();
    if (!result.success) throw result.error;

    console.log('Schema setup completed successfully');
    return { success: true };
  } catch (error) {
    console.error('Error setting up schema:', error);
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined,
      },
    };
  }
} 


