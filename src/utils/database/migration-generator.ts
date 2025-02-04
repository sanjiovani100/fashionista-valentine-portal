import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Migration } from './migrations';

/**
 * Migration generator options
 */
export interface MigrationGeneratorOptions {
  migrationsDir: string;
  templatePath?: string;
  verbose?: boolean;
}

/**
 * Migration generator result
 */
export interface MigrationGeneratorResult {
  success: boolean;
  error?: string;
  details?: {
    migrationPath?: string;
    migrationId?: string;
  };
}

/**
 * Migration generator utility class
 */
export class MigrationGenerator {
  private options: MigrationGeneratorOptions;

  constructor(options: MigrationGeneratorOptions) {
    this.options = options;
  }

  /**
   * Generate a new migration file
   */
  public async generate(
    name: string,
    description: string,
    dependencies?: string[]
  ): Promise<MigrationGeneratorResult> {
    try {
      // Create migrations directory if it doesn't exist
      await fs.mkdir(this.options.migrationsDir, { recursive: true });

      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
      const migrationId = uuidv4();
      const fileName = `${timestamp}_${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.ts`;
      const filePath = path.join(this.options.migrationsDir, fileName);

      // Get template content
      let template = await this.getMigrationTemplate();

      // Replace placeholders
      const migration: Migration = {
        id: migrationId,
        name,
        description,
        sql: '-- Add your SQL here',
        dependencies: dependencies || [],
      };

      template = template
        .replace('__MIGRATION_ID__', migrationId)
        .replace('__MIGRATION_NAME__', name)
        .replace('__MIGRATION_DESCRIPTION__', description)
        .replace('__MIGRATION_DEPENDENCIES__', JSON.stringify(dependencies || []));

      // Write migration file
      await fs.writeFile(filePath, template, 'utf8');

      if (this.options.verbose) {
        console.log(`Generated migration: ${fileName}`);
      }

      return {
        success: true,
        details: {
          migrationPath: filePath,
          migrationId,
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
   * Get migration template content
   */
  private async getMigrationTemplate(): Promise<string> {
    try {
      if (this.options.templatePath) {
        return await fs.readFile(this.options.templatePath, 'utf8');
      }

      // Default template
      return `import { Migration } from '../utils/database/migrations';

const migration: Migration = {
  id: '__MIGRATION_ID__',
  name: '__MIGRATION_NAME__',
  description: '__MIGRATION_DESCRIPTION__',
  dependencies: __MIGRATION_DEPENDENCIES__,
  sql: \`
    -- Add your SQL migration here
    -- Example:
    -- CREATE TABLE example (
    --   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    --   name TEXT NOT NULL,
    --   created_at TIMESTAMPTZ DEFAULT NOW()
    -- );

    -- Add your rollback SQL here as a comment
    -- Example:
    -- -- ROLLBACK: DROP TABLE IF EXISTS example;
  \`,
};

export default migration;
`;
    } catch (error) {
      throw new Error(`Failed to read migration template: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * List all migrations in the migrations directory
   */
  public async list(): Promise<Migration[]> {
    try {
      const files = await fs.readdir(this.options.migrationsDir);
      const migrations: Migration[] = [];

      for (const file of files) {
        if (file.endsWith('.ts')) {
          const filePath = path.join(this.options.migrationsDir, file);
          const migration = await this.loadMigration(filePath);
          if (migration) {
            migrations.push(migration);
          }
        }
      }

      return migrations.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      throw new Error(`Failed to list migrations: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Load a migration from a file
   */
  private async loadMigration(filePath: string): Promise<Migration | null> {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      
      // Extract migration details using regex
      const idMatch = content.match(/id:\s*['"]([^'"]+)['"]/);
      const nameMatch = content.match(/name:\s*['"]([^'"]+)['"]/);
      const descriptionMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
      const dependenciesMatch = content.match(/dependencies:\s*(\[[^\]]*\])/);
      const sqlMatch = content.match(/sql:\s*`([^`]+)`/s);

      if (!idMatch || !nameMatch || !sqlMatch) {
        console.warn(`Invalid migration file format: ${filePath}`);
        return null;
      }

      return {
        id: idMatch[1],
        name: nameMatch[1],
        description: descriptionMatch?.[1] || '',
        dependencies: dependenciesMatch ? JSON.parse(dependenciesMatch[1]) : [],
        sql: sqlMatch[1].trim(),
      };
    } catch (error) {
      console.error(`Failed to load migration ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Extract rollback SQL from a migration
   */
  public async extractRollbackSql(migration: Migration): Promise<string | null> {
    const rollbackMatch = migration.sql.match(/--\s*ROLLBACK:\s*(.+)$/m);
    return rollbackMatch ? rollbackMatch[1].trim() : null;
  }

  /**
   * Validate migration file
   */
  public async validate(migration: Migration): Promise<MigrationGeneratorResult> {
    try {
      // Check required fields
      if (!migration.id || !migration.name || !migration.sql) {
        throw new Error('Missing required fields in migration');
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(migration.id)) {
        throw new Error('Invalid migration ID format');
      }

      // Check SQL content
      if (migration.sql.trim().length === 0) {
        throw new Error('Empty SQL content');
      }

      // Validate dependencies
      if (migration.dependencies) {
        for (const depId of migration.dependencies) {
          if (!uuidRegex.test(depId)) {
            throw new Error(`Invalid dependency ID format: ${depId}`);
          }
        }
      }

      // Check for rollback SQL
      const hasRollback = await this.extractRollbackSql(migration);
      if (!hasRollback) {
        console.warn(`Warning: No rollback SQL found in migration ${migration.name}`);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
} 