import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function syncSchema() {
  try {
    console.log('Reading SQL file...');
    const sqlFile = path.join(process.cwd(), 'sql', 'verify_and_create_tables.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    console.log('Executing SQL...');
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      console.error('Error executing SQL:', error);
      process.exit(1);
    }

    console.log('Schema sync completed successfully!');
  } catch (error) {
    console.error('Error syncing schema:', error);
    process.exit(1);
  }
}

syncSchema(); 