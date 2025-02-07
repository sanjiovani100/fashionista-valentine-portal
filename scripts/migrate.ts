import { runMigrations } from '../src/lib/database/migrations/runner';

async function main() {
  try {
    console.log('Starting database migrations...');
    const results = await runMigrations();
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log('\nMigration Summary:');
    console.log(`Total migrations: ${results.length}`);
    console.log(`Successful: ${successful}`);
    console.log(`Failed: ${failed}`);
    
    if (failed > 0) {
      console.log('\nFailed migrations:');
      results
        .filter(r => !r.success)
        .forEach(r => {
          console.error(`- ${r.name}: ${r.error}`);
        });
      process.exit(1);
    }
    
    console.log('\nAll migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration script failed:', error);
    process.exit(1);
  }
}

main(); 