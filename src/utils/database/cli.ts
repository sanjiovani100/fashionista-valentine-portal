#!/usr/bin/env node
import { Command } from 'commander';
import { config } from 'dotenv';
import { DatabaseMigration } from './migrations';
import { MigrationGenerator } from './migration-generator';
import { DatabaseSetup } from './setup';
import path from 'path';

// Load environment variables
config();

const program = new Command();

// Validate environment variables
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_SERVICE_KEY'];
const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar]
);

if (missingEnvVars.length > 0) {
  console.error(
    'Missing required environment variables:',
    missingEnvVars.join(', ')
  );
  process.exit(1);
}

// Initialize utilities
const migrationGenerator = new MigrationGenerator({
  migrationsDir: path.join(process.cwd(), 'src/migrations'),
  verbose: true,
});

const databaseMigration = new DatabaseMigration({
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseKey: process.env.SUPABASE_SERVICE_KEY!,
  verbose: true,
});

const databaseSetup = new DatabaseSetup({
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseKey: process.env.SUPABASE_SERVICE_KEY!,
  enableRLS: true,
  createIndexes: true,
  applyConstraints: true,
  createTriggers: true,
  verbose: true,
});

program
  .name('db-tools')
  .description('Database management tools for the Fashionista Valentine Portal')
  .version('1.0.0');

// Initialize database
program
  .command('init')
  .description('Initialize the database with schema and initial setup')
  .option('--no-rls', 'Disable Row Level Security')
  .option('--no-indexes', 'Skip index creation')
  .option('--no-constraints', 'Skip constraint application')
  .option('--no-triggers', 'Skip trigger creation')
  .action(async (options) => {
    try {
      const setup = new DatabaseSetup({
        supabaseUrl: process.env.SUPABASE_URL!,
        supabaseKey: process.env.SUPABASE_SERVICE_KEY!,
        enableRLS: options.rls,
        createIndexes: options.indexes,
        applyConstraints: options.constraints,
        createTriggers: options.triggers,
        verbose: true,
      });

      const result = await setup.initialize();
      if (result.success) {
        console.log('Database initialized successfully');
      } else {
        console.error('Failed to initialize database:', result.error);
        process.exit(1);
      }
    } catch (error) {
      console.error('Error initializing database:', error);
      process.exit(1);
    }
  });

// Generate new migration
program
  .command('generate')
  .description('Generate a new migration file')
  .argument('<name>', 'Name of the migration')
  .option('-d, --description <description>', 'Migration description')
  .option(
    '--deps <dependencies>',
    'Comma-separated list of migration dependencies'
  )
  .action(async (name, options) => {
    try {
      const dependencies = options.deps
        ? options.deps.split(',').map((d: string) => d.trim())
        : undefined;

      const result = await migrationGenerator.generate(
        name,
        options.description || '',
        dependencies
      );

      if (result.success) {
        console.log('Generated migration file:', result.details?.migrationPath);
        console.log('Migration ID:', result.details?.migrationId);
      } else {
        console.error('Failed to generate migration:', result.error);
        process.exit(1);
      }
    } catch (error) {
      console.error('Error generating migration:', error);
      process.exit(1);
    }
  });

// Run migrations
program
  .command('migrate')
  .description('Run pending migrations')
  .action(async () => {
    try {
      const migrations = await migrationGenerator.list();
      const result = await databaseMigration.runMigrations(migrations);

      if (result.success) {
        console.log('Migrations completed successfully');
        console.log('Details:', result.details);
      } else {
        console.error('Migration failed:', result.error);
        process.exit(1);
      }
    } catch (error) {
      console.error('Error running migrations:', error);
      process.exit(1);
    }
  });

// Rollback migrations
program
  .command('rollback')
  .description('Rollback the last batch of migrations')
  .action(async () => {
    try {
      const result = await databaseMigration.rollback();

      if (result.success) {
        console.log('Rollback completed successfully');
        console.log('Details:', result.details);
      } else {
        console.error('Rollback failed:', result.error);
        process.exit(1);
      }
    } catch (error) {
      console.error('Error rolling back migrations:', error);
      process.exit(1);
    }
  });

// Show migration status
program
  .command('status')
  .description('Show migration status')
  .action(async () => {
    try {
      const result = await databaseMigration.status();

      if (result.success) {
        console.log('Migration Status:');
        console.log('Total migrations:', result.details?.totalCount);
        console.log('Successful migrations:', result.details?.successCount);
        console.log('Failed migrations:', result.details?.failedCount);
        console.log('\nMigration History:');
        result.details?.migrations.forEach((migration: any) => {
          console.log(
            `- ${migration.name} (${migration.id}): ${
              migration.success ? 'Success' : 'Failed'
            }`
          );
        });
      } else {
        console.error('Failed to get migration status:', result.error);
        process.exit(1);
      }
    } catch (error) {
      console.error('Error getting migration status:', error);
      process.exit(1);
    }
  });

// Verify database setup
program
  .command('verify')
  .description('Verify database setup')
  .action(async () => {
    try {
      const result = await databaseSetup.verify();

      if (result.success) {
        console.log('Database verification successful');
        console.log('Details:', result.details);
      } else {
        console.error('Database verification failed:', result.error);
        console.error('Details:', result.details);
        process.exit(1);
      }
    } catch (error) {
      console.error('Error verifying database:', error);
      process.exit(1);
    }
  });

program.parse(process.argv); 


