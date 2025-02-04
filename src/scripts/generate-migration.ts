import { config } from 'dotenv';
import { MigrationGenerator } from '../utils/database/migration-generator';
import path from 'path';
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

async function generateMigration() {
  try {
    console.log('Migration Generator\n');

    // Get migration details from user
    const name = await question('Enter migration name (e.g., add_user_preferences): ');
    const description = await question('Enter migration description: ');
    const depsInput = await question('Enter dependencies (comma-separated IDs, or press Enter for none): ');

    const dependencies = depsInput.trim()
      ? depsInput.split(',').map((d) => d.trim())
      : undefined;

    // Initialize migration generator
    const generator = new MigrationGenerator({
      migrationsDir: path.join(process.cwd(), 'src/migrations'),
      verbose: true,
    });

    // Generate migration
    const result = await generator.generate(name, description, dependencies);

    if (result.success) {
      console.log('\nMigration generated successfully!');
      console.log('Migration file:', result.details?.migrationPath);
      console.log('Migration ID:', result.details?.migrationId);
      console.log('\nNext steps:');
      console.log('1. Open the generated file');
      console.log('2. Add your SQL migration in the `sql` property');
      console.log('3. Add rollback SQL in the comments (prefixed with "-- ROLLBACK:")');
      console.log('4. Run the migration using `npm run db migrate`');
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('\nFailed to generate migration:', error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run generator
generateMigration(); 