import { config } from 'dotenv';
import { DatabaseSetup } from '../utils/database/setup';
import { DatabaseMigration } from '../utils/database/migrations';
import chalk from 'chalk';

// Load environment variables
config();

async function verifyDatabase() {
  try {
    console.log(chalk.blue('Database Verification\n'));

    // Initialize utilities
    const setup = new DatabaseSetup({
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_KEY!,
      enableRLS: true,
      createIndexes: true,
      applyConstraints: true,
      createTriggers: true,
      verbose: true,
    });

    const migration = new DatabaseMigration({
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_KEY!,
      verbose: true,
    });

    // Step 1: Verify database setup
    console.log(chalk.yellow('Step 1: Verifying database setup...'));
    const setupResult = await setup.verify();
    
    if (setupResult.success) {
      console.log(chalk.green('✓ Database setup verification passed'));
      console.log('Details:');
      for (const [table, details] of Object.entries(setupResult.details || {})) {
        console.log(`- ${table}:`, details);
      }
    } else {
      console.log(chalk.red('✗ Database setup verification failed'));
      console.error('Error:', setupResult.error);
      if (setupResult.details) {
        console.log('Details:', setupResult.details);
      }
      process.exit(1);
    }

    // Step 2: Check migration status
    console.log(chalk.yellow('\nStep 2: Checking migration status...'));
    const statusResult = await migration.status();
    
    if (statusResult.success) {
      console.log(chalk.green('✓ Migration status check passed'));
      console.log('Migration Status:');
      console.log(`- Total migrations: ${statusResult.details?.totalCount}`);
      console.log(`- Successful migrations: ${statusResult.details?.successCount}`);
      console.log(`- Failed migrations: ${statusResult.details?.failedCount}`);
      
      if (statusResult.details?.migrations.length) {
        console.log('\nMigration History:');
        statusResult.details.migrations.forEach((m: any) => {
          const status = m.success
            ? chalk.green('Success')
            : chalk.red('Failed');
          console.log(`- ${m.name} (${m.id}): ${status}`);
          if (m.error_message) {
            console.log(chalk.red(`  Error: ${m.error_message}`));
          }
        });
      }
    } else {
      console.log(chalk.red('✗ Migration status check failed'));
      console.error('Error:', statusResult.error);
      process.exit(1);
    }

    // Step 3: Verify database constraints
    console.log(chalk.yellow('\nStep 3: Verifying database constraints...'));
    const constraintsResult = await setup.client.rpc('execute_sql', {
      sql: `
        SELECT 
          tc.table_name, 
          tc.constraint_name, 
          tc.constraint_type,
          kcu.column_name
        FROM 
          information_schema.table_constraints tc
          JOIN information_schema.key_column_usage kcu
            ON tc.constraint_name = kcu.constraint_name
            AND tc.table_schema = kcu.table_schema
        WHERE 
          tc.table_schema = 'public'
        ORDER BY 
          tc.table_name, 
          tc.constraint_name;
      `,
    });

    if (!constraintsResult.error) {
      console.log(chalk.green('✓ Database constraints verification passed'));
      console.log('Constraints:');
      constraintsResult.data?.forEach((constraint: any) => {
        console.log(`- ${constraint.table_name}.${constraint.column_name}:`);
        console.log(`  Type: ${constraint.constraint_type}`);
        console.log(`  Name: ${constraint.constraint_name}`);
      });
    } else {
      console.log(chalk.red('✗ Database constraints verification failed'));
      console.error('Error:', constraintsResult.error);
      process.exit(1);
    }

    // Step 4: Verify RLS policies
    console.log(chalk.yellow('\nStep 4: Verifying RLS policies...'));
    const policiesResult = await setup.client.rpc('execute_sql', {
      sql: `
        SELECT 
          schemaname,
          tablename,
          policyname,
          permissive,
          roles,
          cmd,
          qual
        FROM 
          pg_policies
        WHERE 
          schemaname = 'public'
        ORDER BY 
          tablename, 
          policyname;
      `,
    });

    if (!policiesResult.error) {
      console.log(chalk.green('✓ RLS policies verification passed'));
      console.log('Policies:');
      policiesResult.data?.forEach((policy: any) => {
        console.log(`- ${policy.tablename}.${policy.policyname}:`);
        console.log(`  Command: ${policy.cmd}`);
        console.log(`  Roles: ${policy.roles}`);
        console.log(`  Using: ${policy.qual}`);
      });
    } else {
      console.log(chalk.red('✗ RLS policies verification failed'));
      console.error('Error:', policiesResult.error);
      process.exit(1);
    }

    console.log(chalk.green('\n✓ All verifications completed successfully!'));
  } catch (error) {
    console.error(chalk.red('\nVerification failed:'), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run verification
verifyDatabase(); 


