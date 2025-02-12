import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { TableSchemas, TableIndexes, RLSPolicies, TableConstraints, Triggers } from '../../types/database/schema';

/**
 * Database setup options
 */
export interface DatabaseSetupOptions {
  supabaseUrl: string;
  supabaseKey: string;
  enableRLS?: boolean;
  createIndexes?: boolean;
  applyConstraints?: boolean;
  createTriggers?: boolean;
  verbose?: boolean;
}

/**
 * Setup result type
 */
export interface SetupResult {
  success: boolean;
  error?: string;
  details?: Record<string, any>;
}

/**
 * Database setup utility class
 */
export class DatabaseSetup {
  public client: SupabaseClient;
  private options: DatabaseSetupOptions;

  constructor(options: DatabaseSetupOptions) {
    this.options = options;
    this.client = createClient(options.supabaseUrl, options.supabaseKey);
  }

  /**
   * Initialize the database setup
   */
  public async initialize(): Promise<SetupResult> {
    try {
      // Create tables
      for (const [tableName, schema] of Object.entries(TableSchemas)) {
        const result = await this.createTable(tableName, schema);
        if (!result.success) {
          return result;
        }
      }

      // Apply constraints if enabled
      if (this.options.applyConstraints) {
        for (const [tableName, constraints] of Object.entries(TableConstraints)) {
          const result = await this.applyConstraints(tableName, constraints);
          if (!result.success) {
            return result;
          }
        }
      }

      // Create indexes if enabled
      if (this.options.createIndexes) {
        for (const [tableName, indexes] of Object.entries(TableIndexes)) {
          const result = await this.createIndexes(tableName, indexes);
          if (!result.success) {
            return result;
          }
        }
      }

      // Enable RLS and apply policies if enabled
      if (this.options.enableRLS) {
        for (const [tableName, policies] of Object.entries(RLSPolicies)) {
          const result = await this.enableRLSAndPolicies(tableName, policies);
          if (!result.success) {
            return result;
          }
        }
      }

      // Create triggers if enabled
      if (this.options.createTriggers) {
        for (const [triggerName, definition] of Object.entries(Triggers)) {
          const result = await this.createTrigger(triggerName, definition);
          if (!result.success) {
            return result;
          }
        }
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Create a database table
   */
  private async createTable(
    tableName: string,
    schema: Record<string, string>
  ): Promise<SetupResult> {
    try {
      const columns = Object.entries(schema)
        .map(([name, type]) => `${name} ${type}`)
        .join(',\n  ');

      const { error } = await this.client.rpc('execute_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS ${tableName} (
            ${columns}
          );
        `,
      });

      if (error) throw error;

      if (this.options.verbose) {
        console.log(`Created table: ${tableName}`);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Failed to create table ${tableName}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Apply table constraints
   */
  private async applyConstraints(
    tableName: string,
    constraints: string[]
  ): Promise<SetupResult> {
    try {
      for (const constraint of constraints) {
        const { error } = await this.client.rpc('execute_sql', {
          sql: constraint,
        });

        if (error) throw error;
      }

      if (this.options.verbose) {
        console.log(`Applied constraints to table: ${tableName}`);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Failed to apply constraints to ${tableName}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Create table indexes
   */
  private async createIndexes(
    tableName: string,
    indexes: string[]
  ): Promise<SetupResult> {
    try {
      for (const index of indexes) {
        const { error } = await this.client.rpc('execute_sql', {
          sql: index,
        });

        if (error) throw error;
      }

      if (this.options.verbose) {
        console.log(`Created indexes for table: ${tableName}`);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Failed to create indexes for ${tableName}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Enable RLS and apply policies
   */
  private async enableRLSAndPolicies(
    tableName: string,
    policies: string[]
  ): Promise<SetupResult> {
    try {
      // Enable RLS
      const { error: rlsError } = await this.client.rpc('execute_sql', {
        sql: `ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY;`,
      });

      if (rlsError) throw rlsError;

      // Drop existing policies
      const { error: dropError } = await this.client.rpc('execute_sql', {
        sql: `DROP POLICY IF EXISTS ON ${tableName};`,
      });

      if (dropError) throw dropError;

      // Create new policies
      for (const policy of policies) {
        const { error } = await this.client.rpc('execute_sql', {
          sql: policy,
        });

        if (error) throw error;
      }

      if (this.options.verbose) {
        console.log(`Enabled RLS and applied policies for table: ${tableName}`);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Failed to enable RLS and apply policies for ${tableName}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Create database trigger
   */
  private async createTrigger(
    triggerName: string,
    definition: string
  ): Promise<SetupResult> {
    try {
      const { error } = await this.client.rpc('execute_sql', {
        sql: definition,
      });

      if (error) throw error;

      if (this.options.verbose) {
        console.log(`Created trigger: ${triggerName}`);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Failed to create trigger ${triggerName}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Verify database setup
   */
  public async verify(): Promise<SetupResult> {
    try {
      const tables = Object.keys(TableSchemas);
      const verificationResults: Record<string, any> = {};

      for (const table of tables) {
        // Check if table exists
        const { data, error: tableError } = await this.client
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_name', table)
          .single();

        if (tableError || !data) {
          return {
            success: false,
            error: `Table ${table} does not exist`,
            details: verificationResults,
          };
        }

        // Check RLS if enabled
        if (this.options.enableRLS) {
          const { data: rlsData, error: rlsError } = await this.client
            .from('information_schema.tables')
            .select('row_security')
            .eq('table_name', table)
            .single();

          if (rlsError || !rlsData || !rlsData.row_security) {
            return {
              success: false,
              error: `RLS not enabled for table ${table}`,
              details: verificationResults,
            };
          }
        }

        verificationResults[table] = { exists: true, rls: this.options.enableRLS };
      }

      return {
        success: true,
        details: verificationResults,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
} 


