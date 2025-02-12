import { config } from 'dotenv';
import { DatabaseSetup } from '../utils/database/setup';
import { DatabaseMigration } from '../utils/database/migrations';
import { listMigrations } from '../migrations';

// Load environment variables
config();

async function testDatabase() {
  try {
    console.log('Testing database setup and migrations...\n');

    // Initialize database setup
    const setup = new DatabaseSetup({
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_KEY!,
      enableRLS: true,
      createIndexes: true,
      applyConstraints: true,
      createTriggers: true,
      verbose: true,
    });

    // Initialize database migration
    const migration = new DatabaseMigration({
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_KEY!,
      verbose: true,
    });

    // Step 1: Initialize database
    console.log('Step 1: Initializing database...');
    const setupResult = await setup.initialize();
    if (!setupResult.success) {
      throw new Error(`Database initialization failed: ${setupResult.error}`);
    }
    console.log('Database initialized successfully\n');

    // Step 2: Verify database setup
    console.log('Step 2: Verifying database setup...');
    const verifyResult = await setup.verify();
    if (!verifyResult.success) {
      throw new Error(`Database verification failed: ${verifyResult.error}`);
    }
    console.log('Database verification successful');
    console.log('Verification details:', verifyResult.details, '\n');

    // Step 3: Run migrations
    console.log('Step 3: Running migrations...');
    const migrations = listMigrations();
    const migrationResult = await migration.runMigrations(migrations);
    if (!migrationResult.success) {
      throw new Error(`Migrations failed: ${migrationResult.error}`);
    }
    console.log('Migrations completed successfully');
    console.log('Migration details:', migrationResult.details, '\n');

    // Step 4: Check migration status
    console.log('Step 4: Checking migration status...');
    const statusResult = await migration.status();
    if (!statusResult.success) {
      throw new Error(`Failed to get migration status: ${statusResult.error}`);
    }
    console.log('Migration Status:');
    console.log('- Total migrations:', statusResult.details?.totalCount);
    console.log('- Successful migrations:', statusResult.details?.successCount);
    console.log('- Failed migrations:', statusResult.details?.failedCount);
    console.log('\nMigration History:');
    statusResult.details?.migrations.forEach((m: any) => {
      console.log(`- ${m.name} (${m.id}): ${m.success ? 'Success' : 'Failed'}`);
    });

    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('\nTest failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run tests
testDatabase(); 


