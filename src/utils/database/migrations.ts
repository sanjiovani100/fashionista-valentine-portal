import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Migration interface
 */
export interface Migration {
  id: string;
  name: string;
  sql: string;
  description: string;
  dependencies?: string[];
  batch?: number;
  executed_at?: string;
}

/**
 * Migration result type
 */
export interface MigrationResult {
  success: boolean;
  error?: string;
  details?: Record<string, any>;
}

/**
 * Migration options
 */
export interface MigrationOptions {
  supabaseUrl: string;
  supabaseKey: string;
  verbose?: boolean;
}

/**
 * Database migration utility class
 */
export class DatabaseMigration {
  private client: SupabaseClient;
  private options: MigrationOptions;

  constructor(options: MigrationOptions) {
    this.options = options;
    this.client = createClient(options.supabaseUrl, options.supabaseKey);
  }

  /**
   * Create migrations table if it doesn't exist
   */
  private async createMigrationsTable(): Promise<MigrationResult> {
    try {
      const { error } = await this.client.rpc('execute_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS _migrations (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            batch INTEGER NOT NULL,
            executed_at TIMESTAMPTZ DEFAULT NOW(),
            dependencies TEXT[] DEFAULT ARRAY[]::TEXT[],
            success BOOLEAN DEFAULT true,
            error_message TEXT
          );
        `,
      });

      if (error) throw error;

      if (this.options.verbose) {
        console.log('Created migrations table');
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
   * Get executed migrations
   */
  private async getExecutedMigrations(): Promise<string[]> {
    const { data, error } = await this.client
      .from('_migrations')
      .select('id')
      .eq('success', true);

    if (error) throw error;

    return data.map((m) => m.id);
  }

  /**
   * Execute a single migration
   */
  private async executeMigration(
    migration: Migration,
    batch: number
  ): Promise<MigrationResult> {
    try {
      // Begin transaction
      const { error: beginError } = await this.client.rpc('execute_sql', {
        sql: 'BEGIN;',
      });

      if (beginError) throw beginError;

      try {
        // Execute migration SQL
        const { error: sqlError } = await this.client.rpc('execute_sql', {
          sql: migration.sql,
        });

        if (sqlError) throw sqlError;

        // Record successful migration
        const { error: recordError } = await this.client
          .from('_migrations')
          .insert({
            id: migration.id,
            name: migration.name,
            description: migration.description,
            batch,
            dependencies: migration.dependencies || [],
            success: true,
          });

        if (recordError) throw recordError;

        // Commit transaction
        const { error: commitError } = await this.client.rpc('execute_sql', {
          sql: 'COMMIT;',
        });

        if (commitError) throw commitError;

        if (this.options.verbose) {
          console.log(`Executed migration: ${migration.name}`);
        }

        return { success: true };
      } catch (error) {
        // Rollback on error
        await this.client.rpc('execute_sql', {
          sql: 'ROLLBACK;',
        });

        // Record failed migration
        await this.client.from('_migrations').insert({
          id: migration.id,
          name: migration.name,
          description: migration.description,
          batch,
          dependencies: migration.dependencies || [],
          success: false,
          error_message: error instanceof Error ? error.message : 'Unknown error',
        });

        throw error;
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Run pending migrations
   */
  public async runMigrations(migrations: Migration[]): Promise<MigrationResult> {
    try {
      // Create migrations table
      const tableResult = await this.createMigrationsTable();
      if (!tableResult.success) {
        return tableResult;
      }

      // Get executed migrations
      const executedMigrations = await this.getExecutedMigrations();

      // Filter pending migrations
      const pendingMigrations = migrations.filter(
        (m) => !executedMigrations.includes(m.id)
      );

      if (pendingMigrations.length === 0) {
        return {
          success: true,
          details: { message: 'No pending migrations' },
        };
      }

      // Get current batch number
      const { data: batchData, error: batchError } = await this.client
        .from('_migrations')
        .select('batch')
        .order('batch', { ascending: false })
        .limit(1);

      if (batchError) throw batchError;

      const currentBatch = (batchData?.[0]?.batch || 0) + 1;

      // Sort migrations by dependencies
      const sortedMigrations = this.sortMigrationsByDependencies(pendingMigrations);

      // Execute migrations
      for (const migration of sortedMigrations) {
        const result = await this.executeMigration(migration, currentBatch);
        if (!result.success) {
          return result;
        }
      }

      return {
        success: true,
        details: {
          migrationsRun: sortedMigrations.length,
          batch: currentBatch,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Sort migrations by dependencies
   */
  private sortMigrationsByDependencies(migrations: Migration[]): Migration[] {
    const sorted: Migration[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();

    const visit = (migration: Migration) => {
      if (visiting.has(migration.id)) {
        throw new Error(`Circular dependency detected in migration ${migration.name}`);
      }

      if (visited.has(migration.id)) {
        return;
      }

      visiting.add(migration.id);

      if (migration.dependencies) {
        for (const depId of migration.dependencies) {
          const depMigration = migrations.find((m) => m.id === depId);
          if (depMigration) {
            visit(depMigration);
          }
        }
      }

      visiting.delete(migration.id);
      visited.add(migration.id);
      sorted.push(migration);
    };

    for (const migration of migrations) {
      if (!visited.has(migration.id)) {
        visit(migration);
      }
    }

    return sorted;
  }

  /**
   * Roll back the last batch of migrations
   */
  public async rollback(): Promise<MigrationResult> {
    try {
      // Get last batch number
      const { data: batchData, error: batchError } = await this.client
        .from('_migrations')
        .select('batch')
        .order('batch', { ascending: false })
        .limit(1);

      if (batchError) throw batchError;

      if (!batchData || batchData.length === 0) {
        return {
          success: true,
          details: { message: 'No migrations to roll back' },
        };
      }

      const lastBatch = batchData[0].batch;

      // Get migrations from last batch
      const { data: migrations, error: migrationsError } = await this.client
        .from('_migrations')
        .select('*')
        .eq('batch', lastBatch)
        .eq('success', true)
        .order('executed_at', { ascending: false });

      if (migrationsError) throw migrationsError;

      if (!migrations || migrations.length === 0) {
        return {
          success: true,
          details: { message: 'No successful migrations to roll back' },
        };
      }

      // Roll back each migration
      for (const migration of migrations) {
        const rollbackSql = `-- Roll back migration ${migration.name}\n${migration.sql}`;
        const { error: rollbackError } = await this.client.rpc('execute_sql', {
          sql: rollbackSql,
        });

        if (rollbackError) {
          return {
            success: false,
            error: `Failed to roll back migration ${migration.name}: ${rollbackError.message}`,
          };
        }

        // Delete migration record
        const { error: deleteError } = await this.client
          .from('_migrations')
          .delete()
          .eq('id', migration.id);

        if (deleteError) throw deleteError;

        if (this.options.verbose) {
          console.log(`Rolled back migration: ${migration.name}`);
        }
      }

      return {
        success: true,
        details: {
          migrationsRolledBack: migrations.length,
          batch: lastBatch,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get migration status
   */
  public async status(): Promise<MigrationResult> {
    try {
      const { data, error } = await this.client
        .from('_migrations')
        .select('*')
        .order('executed_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        details: {
          migrations: data,
          totalCount: data.length,
          successCount: data.filter((m) => m.success).length,
          failedCount: data.filter((m) => !m.success).length,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
} 


