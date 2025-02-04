// @ts-check
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Supabase client with service role key for admin access
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupContactTable() {
  try {
    console.log('Setting up contact table...');
    
    // Read and execute the SQL file
    const sqlFile = readFileSync(join(__dirname, 'create_contact_table.sql'), 'utf8');
    await supabase.rpc('create_contact_table');
    
    console.log('Contact table setup completed successfully');
  } catch (error) {
    console.error('Error setting up contact table:', error);
  }
}

setupContactTable(); 