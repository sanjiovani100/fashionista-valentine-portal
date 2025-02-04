import { createClient } from '@supabase/supabase-js';
import { promises as fs } from 'fs';

const supabaseUrl = 'https://dssddsgypklubzkshkxo.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzc2Rkc2d5cGtsdWJ6a3Noa3hvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDY5NjE3MCwiZXhwIjoyMDI2MjcyMTcwfQ.ZpWMXu9PQDfnQBEBkZZQtlc2VQjzGHVhqFIuHhBHPxE';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function executeSQL(filePath) {
  try {
    const sql = await fs.readFile(filePath, 'utf8');
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) throw error;
    console.log(`Successfully executed ${filePath}`);
    return data;
  } catch (err) {
    console.error(`Error executing ${filePath}:`, err);
    throw err;
  }
}

async function setupDatabase() {
  try {
    console.log('Starting database setup...');

    // Execute SQL files in order
    await executeSQL('./create_base_tables.sql');
    await executeSQL('./create_sponsor_tables.sql');
    const verificationResult = await executeSQL('./verify_all_tables.sql');

    console.log('Database setup completed successfully');
    console.log('Verification results:', verificationResult);
  } catch (err) {
    console.error('Error setting up database:', err);
  }
}

setupDatabase(); 