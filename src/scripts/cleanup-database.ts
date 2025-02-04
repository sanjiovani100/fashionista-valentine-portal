import { config } from 'dotenv';
import { DatabaseSetup } from '../utils/database/setup';
import { DatabaseMigration } from '../utils/database/migrations';
import chalk from 'chalk';
import readline from 'readline';

// Load environment variables
config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function cleanupDatabase() {
  try {
    console.log(chalk.red('⚠️  Database Cleanup\n'));
    console.log(chalk.yellow('This will remove all tables, functions, triggers, and policies.'));
    console.log(chalk.yellow('All data will be permanently deleted.\n'));

    const confirm = await question('Are you sure you want to proceed? (yes/NO): ');
    if (confirm.toLowerCase() !== 'yes') {
      console.log(chalk.blue('Cleanup cancelled'));
      process.exit(0);
    }

    // Initialize utilities
    const setup = new DatabaseSetup({
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_KEY!,
      verbose: true,
    });

    console.log(chalk.yellow('\nStep 1: Dropping tables...'));
    const dropTablesResult = await setup.client.rpc('execute_sql', {
      sql: `
        DO $$ 
        DECLARE 
          r RECORD;
        BEGIN
          -- Drop all tables in public schema
          FOR r IN (
            SELECT tablename 
            FROM pg_tables 
            WHERE schemaname = 'public'
          ) LOOP
            EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
          END LOOP;
        END $$;
      `,
    });

    if (dropTablesResult.error) {
      throw new Error(`Failed to drop tables: ${dropTablesResult.error.message}`);
    }
    console.log(chalk.green('✓ Tables dropped successfully'));

    console.log(chalk.yellow('\nStep 2: Dropping functions...'));
    const dropFunctionsResult = await setup.client.rpc('execute_sql', {
      sql: `
        DO $$ 
        DECLARE 
          r RECORD;
        BEGIN
          -- Drop all functions in public schema
          FOR r IN (
            SELECT ns.nspname, p.proname, pg_get_function_identity_arguments(p.oid) as args
            FROM pg_proc p 
            JOIN pg_namespace ns ON p.pronamespace = ns.oid
            WHERE ns.nspname = 'public'
          ) LOOP
            EXECUTE 'DROP FUNCTION IF EXISTS public.' || 
                    quote_ident(r.proname) || 
                    '(' || r.args || ') CASCADE';
          END LOOP;
        END $$;
      `,
    });

    if (dropFunctionsResult.error) {
      throw new Error(`Failed to drop functions: ${dropFunctionsResult.error.message}`);
    }
    console.log(chalk.green('✓ Functions dropped successfully'));

    console.log(chalk.yellow('\nStep 3: Dropping triggers...'));
    const dropTriggersResult = await setup.client.rpc('execute_sql', {
      sql: `
        DO $$ 
        DECLARE 
          r RECORD;
        BEGIN
          -- Drop all triggers in public schema
          FOR r IN (
            SELECT DISTINCT trigger_name, event_object_table
            FROM information_schema.triggers
            WHERE trigger_schema = 'public'
          ) LOOP
            EXECUTE 'DROP TRIGGER IF EXISTS ' || 
                    quote_ident(r.trigger_name) || 
                    ' ON public.' || 
                    quote_ident(r.event_object_table) || 
                    ' CASCADE';
          END LOOP;
        END $$;
      `,
    });

    if (dropTriggersResult.error) {
      throw new Error(`Failed to drop triggers: ${dropTriggersResult.error.message}`);
    }
    console.log(chalk.green('✓ Triggers dropped successfully'));

    console.log(chalk.yellow('\nStep 4: Dropping policies...'));
    const dropPoliciesResult = await setup.client.rpc('execute_sql', {
      sql: `
        DO $$ 
        DECLARE 
          r RECORD;
        BEGIN
          -- Drop all policies in public schema
          FOR r IN (
            SELECT tablename, policyname
            FROM pg_policies
            WHERE schemaname = 'public'
          ) LOOP
            EXECUTE 'DROP POLICY IF EXISTS ' || 
                    quote_ident(r.policyname) || 
                    ' ON public.' || 
                    quote_ident(r.tablename);
          END LOOP;
        END $$;
      `,
    });

    if (dropPoliciesResult.error) {
      throw new Error(`Failed to drop policies: ${dropPoliciesResult.error.message}`);
    }
    console.log(chalk.green('✓ Policies dropped successfully'));

    console.log(chalk.yellow('\nStep 5: Cleaning up migrations table...'));
    const dropMigrationsResult = await setup.client.rpc('execute_sql', {
      sql: 'DROP TABLE IF EXISTS _migrations CASCADE;',
    });

    if (dropMigrationsResult.error) {
      throw new Error(`Failed to drop migrations table: ${dropMigrationsResult.error.message}`);
    }
    console.log(chalk.green('✓ Migrations table dropped successfully'));

    console.log(chalk.green('\n✓ Database cleanup completed successfully!'));
    console.log(chalk.blue('\nTo rebuild the database:'));
    console.log('1. Run npm run db:init');
    console.log('2. Run npm run db:migrate');
    console.log('3. Run npm run db:verify');
  } catch (error) {
    console.error(chalk.red('\nCleanup failed:'), error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run cleanup
cleanupDatabase(); 