import { config } from 'dotenv';
import { DatabaseMigration } from '../utils/database/migrations';
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

async function rollbackMigration() {
  try {
    console.log('Migration Rollback\n');

    // Initialize database migration
    const migration = new DatabaseMigration({
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_KEY!,
      verbose: true,
    });

    // Get current status
    const statusResult = await migration.status();
    if (!statusResult.success) {
      throw new Error(`Failed to get migration status: ${statusResult.error}`);
    }

    console.log('Current Migration Status:');
    console.log('- Total migrations:', statusResult.details?.totalCount);
    console.log('- Successful migrations:', statusResult.details?.successCount);
    console.log('- Failed migrations:', statusResult.details?.failedCount);
    console.log('\nLast Batch Migrations:');
    
    const lastBatch = Math.max(
      ...statusResult.details?.migrations.map((m: any) => m.batch) || [0]
    );
    
    const lastBatchMigrations = statusResult.details?.migrations
      .filter((m: any) => m.batch === lastBatch)
      .map((m: any) => `- ${m.name} (${m.id})`);

    if (lastBatchMigrations?.length) {
      console.log(lastBatchMigrations.join('\n'));
    } else {
      console.log('No migrations to roll back');
      process.exit(0);
    }

    const confirm = await question('\nDo you want to roll back these migrations? (y/N): ');
    if (confirm.toLowerCase() !== 'y') {
      console.log('Rollback cancelled');
      process.exit(0);
    }

    // Perform rollback
    console.log('\nRolling back migrations...');
    const rollbackResult = await migration.rollback();

    if (rollbackResult.success) {
      console.log('\nRollback completed successfully!');
      console.log('Details:', rollbackResult.details);
    } else {
      throw new Error(rollbackResult.error);
    }
  } catch (error) {
    console.error('\nFailed to roll back migrations:', error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run rollback
rollbackMigration(); 


