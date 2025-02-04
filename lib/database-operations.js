import { db } from './supabase-client.js'

/**
 * Database table operations with improved error handling and validation
 */
export const dbOps = {
  /**
   * Creates a table with the specified schema
   * @param {string} tableName - Name of the table to create
   * @param {Object} schema - Table schema definition
   */
  async createTable(tableName, schema) {
    try {
      // Create table SQL
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS "${tableName}" (
          ${Object.entries(schema)
            .map(([column, definition]) => `"${column}" ${definition}`)
            .join(',\n          ')}
        );
      `

      const { error } = await db.executeSQL(createTableSQL)
      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error(`Error creating table ${tableName}:`, error)
      return { 
        success: false, 
        error: {
          message: error.message,
          details: error.details || error.hint || 'Unknown error occurred'
        }
      }
    }
  },

  /**
   * Enables Row Level Security on a table
   * @param {string} tableName - Name of the table
   */
  async enableRLS(tableName) {
    try {
      // First check if RLS is already enabled
      const { data: rlsStatus } = await db.executeSQL(`
        SELECT relrowsecurity 
        FROM pg_class 
        WHERE relname = '${tableName}' 
        AND relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public');
      `)

      let policiesSQL = `
        -- Enable RLS
        ALTER TABLE "${tableName}" ENABLE ROW LEVEL SECURITY;

        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "Allow select for authenticated users" ON "${tableName}";
        DROP POLICY IF EXISTS "Allow insert for authenticated users" ON "${tableName}";
        DROP POLICY IF EXISTS "Allow update for owners" ON "${tableName}";
        DROP POLICY IF EXISTS "Allow delete for owners" ON "${tableName}";
      `

      // Add table-specific policies
      switch (tableName) {
        case 'events':
          policiesSQL += `
            CREATE POLICY "Allow select for authenticated users" ON "${tableName}"
              FOR SELECT TO authenticated USING (true);

            CREATE POLICY "Allow insert for authenticated users" ON "${tableName}"
              FOR INSERT TO authenticated
              WITH CHECK (auth.uid() IS NOT NULL);

            CREATE POLICY "Allow update for owners" ON "${tableName}"
              FOR UPDATE TO authenticated
              USING (created_by = auth.uid());

            CREATE POLICY "Allow delete for owners" ON "${tableName}"
              FOR DELETE TO authenticated
              USING (created_by = auth.uid());
          `
          break;

        case 'profiles':
          policiesSQL += `
            CREATE POLICY "Allow select for authenticated users" ON "${tableName}"
              FOR SELECT TO authenticated USING (true);

            CREATE POLICY "Allow insert for authenticated users" ON "${tableName}"
              FOR INSERT TO authenticated
              WITH CHECK (auth.uid() = user_id);

            CREATE POLICY "Allow update for owners" ON "${tableName}"
              FOR UPDATE TO authenticated
              USING (auth.uid() = user_id);

            CREATE POLICY "Allow delete for owners" ON "${tableName}"
              FOR DELETE TO authenticated
              USING (auth.uid() = user_id);
          `
          break;

        case 'registrations':
          policiesSQL += `
            CREATE POLICY "Allow select for authenticated users" ON "${tableName}"
              FOR SELECT TO authenticated USING (true);

            CREATE POLICY "Allow insert for authenticated users" ON "${tableName}"
              FOR INSERT TO authenticated
              WITH CHECK (auth.uid() = user_id);

            CREATE POLICY "Allow update for owners" ON "${tableName}"
              FOR UPDATE TO authenticated
              USING (auth.uid() = user_id);

            CREATE POLICY "Allow delete for owners" ON "${tableName}"
              FOR DELETE TO authenticated
              USING (auth.uid() = user_id);
          `
          break;

        case 'collections':
          policiesSQL += `
            CREATE POLICY "Allow select for authenticated users" ON "${tableName}"
              FOR SELECT TO authenticated USING (true);

            CREATE POLICY "Allow insert for authenticated users" ON "${tableName}"
              FOR INSERT TO authenticated
              WITH CHECK (auth.uid() = user_id);

            CREATE POLICY "Allow update for owners" ON "${tableName}"
              FOR UPDATE TO authenticated
              USING (auth.uid() = user_id);

            CREATE POLICY "Allow delete for owners" ON "${tableName}"
              FOR DELETE TO authenticated
              USING (auth.uid() = user_id);
          `
          break;

        default:
          // Default policies for any other table
          policiesSQL += `
            CREATE POLICY "Allow select for authenticated users" ON "${tableName}"
              FOR SELECT TO authenticated USING (true);

            CREATE POLICY "Allow insert for authenticated users" ON "${tableName}"
              FOR INSERT TO authenticated
              WITH CHECK (auth.uid() IS NOT NULL);

            CREATE POLICY "Allow update for owners" ON "${tableName}"
              FOR UPDATE TO authenticated
              USING (true);

            CREATE POLICY "Allow delete for owners" ON "${tableName}"
              FOR DELETE TO authenticated
              USING (true);
          `
      }

      const { error } = await db.executeSQL(policiesSQL)
      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error(`Error enabling RLS on table ${tableName}:`, error)
      return { 
        success: false, 
        error: {
          message: error.message,
          details: error.details || error.hint || 'Unknown error occurred'
        }
      }
    }
  },

  /**
   * Creates indexes for a table
   * @param {string} tableName - Name of the table
   * @param {Array} columns - Columns to index
   */
  async createIndexes(tableName, columns = []) {
    try {
      // First check existing indexes
      const { data: existingIndexes } = await db.executeSQL(`
        SELECT indexname 
        FROM pg_indexes 
        WHERE tablename = '${tableName}' 
        AND schemaname = 'public';
      `)

      const existingNames = existingIndexes?.map(idx => idx.indexname) || []

      // Create indexes that don't exist yet
      const createIndexesSQL = columns
        .filter(column => !existingNames.includes(`idx_${tableName}_${column}`))
        .map(column => `
          CREATE INDEX IF NOT EXISTS "idx_${tableName}_${column}"
          ON "${tableName}" ("${column}");
        `)
        .join('\n')

      if (createIndexesSQL.trim()) {
        const { error } = await db.executeSQL(createIndexesSQL)
        if (error) throw error
      }

      return { success: true }
    } catch (error) {
      console.error(`Error creating indexes on table ${tableName}:`, error)
      return { 
        success: false, 
        error: {
          message: error.message,
          details: error.details || error.hint || 'Unknown error occurred'
        }
      }
    }
  },

  /**
   * Verifies a table exists and has the correct schema
   * @param {string} tableName - Name of the table to verify
   * @param {Object} expectedSchema - Expected schema definition
   */
  async verifyTable(tableName, expectedSchema) {
    try {
      // Get table information
      const { data: tableExists } = await db.executeSQL(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = '${tableName}'
        );
      `)

      if (!tableExists?.[0]?.exists) {
        return {
          exists: false,
          valid: false,
          schema: {
            actual: [],
            expected: Object.keys(expectedSchema),
            missing: Object.keys(expectedSchema)
          }
        }
      }

      // Get column information
      const { data: columns } = await db.executeSQL(`
        SELECT 
          column_name,
          data_type,
          column_default,
          is_nullable,
          character_maximum_length
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = '${tableName}'
        ORDER BY ordinal_position;
      `)

      const actualColumns = columns.map(col => col.column_name)
      const expectedColumns = Object.keys(expectedSchema)
      const missingColumns = expectedColumns.filter(col => !actualColumns.includes(col))

      return {
        exists: true,
        valid: missingColumns.length === 0,
        schema: {
          actual: actualColumns,
          expected: expectedColumns,
          missing: missingColumns,
          details: columns.map(col => ({
            name: col.column_name,
            type: col.data_type,
            nullable: col.is_nullable === 'YES',
            default: col.column_default,
            maxLength: col.character_maximum_length
          }))
        }
      }
    } catch (error) {
      console.error(`Error verifying table ${tableName}:`, error)
      return {
        exists: false,
        valid: false,
        schema: {
          actual: [],
          expected: Object.keys(expectedSchema),
          missing: Object.keys(expectedSchema)
        },
        error: {
          message: error.message,
          details: error.details || error.hint || 'Unknown error occurred'
        }
      }
    }
  }
}
