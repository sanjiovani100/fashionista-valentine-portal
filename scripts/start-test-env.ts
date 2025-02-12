import { execSync } from 'child_process';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

async function waitForSupabase(retries = 20, interval = 1500) {
  const supabase = createClient(
    'http://localhost:54321',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
  );

  for (let i = 0; i < retries; i++) {
    try {
      const { data, error } = await supabase.from('_schema').select('version');
      if (!error) {
        console.log('✓ Supabase is ready');
        return;
      }
    } catch (err) {
      console.log(`Waiting for Supabase... (${i + 1}/${retries})`);
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  throw new Error('Supabase failed to start');
}

async function main() {
  try {
    // Start Supabase containers
    console.log('Starting Supabase containers...');
    execSync('docker-compose up -d', { stdio: 'inherit' });

    // Wait for services to be ready
    console.log('Waiting for services to be ready...');
    await waitForSupabase();

    // Initialize test database
    console.log('Initializing test database...');
    execSync('npm run migrate', { stdio: 'inherit' });

    console.log('✓ Test environment is ready');
    process.exit(0);
  } catch (error) {
    console.error('Failed to start test environment:', error);
    process.exit(1);
  }
}

main(); 


