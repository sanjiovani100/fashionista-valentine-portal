import { createClient } from '@supabase/supabase-js';
import { promises as fs } from 'fs';

const SUPABASE_URL = 'https://dssddsgypklubzkshkxo.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzc2Rkc2d5cGtsdWJ6a3Noa3hvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzgwOTI2MSwiZXhwIjoyMDUzMzg1MjYxfQ.v7qeA8JHxte1nMpTKvzC4DmKmLdafboQb5WOC8emSv8';

// Initialize Supabase client with service role key
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'
  }
});

async function executeSQL(sql) {
  try {
    const { data, error } = await supabase.rpc('exec_sql', { query: sql });
    
    if (error) {
      console.error('Error executing SQL:', error);
      throw error;
    }
    
    return data;
  } catch (err) {
    console.error('Failed to execute SQL:', err);
    throw err;
  }
}

async function createSQLFunction() {
  try {
    const sqlFunctionCode = await fs.readFile('./create_sql_function.sql', 'utf8');
    const { data, error } = await supabase.rpc('exec_sql', { query: sqlFunctionCode });
    
    if (error) {
      console.error('Error creating SQL function:', error);
      throw error;
    }
    
    console.log('SQL execution function created successfully');
    return true;
  } catch (err) {
    console.error('Failed to create SQL function:', err);
    return false;
  }
}

async function verifyConnection() {
  try {
    const verificationSQL = `
      SELECT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        LIMIT 1
      );
    `;
    
    const result = await executeSQL(verificationSQL);
    console.log('Successfully connected to database');
    return true;
  } catch (err) {
    console.error('Connection test failed:', err);
    return false;
  }
}

async function setupDatabase() {
  try {
    console.log('Starting database setup...');

    // Create SQL execution function first
    console.log('Creating SQL execution function...');
    const functionCreated = await createSQLFunction();
    if (!functionCreated) {
      console.error('Failed to create SQL execution function. Aborting setup.');
      return;
    }

    // Verify connection
    const isConnected = await verifyConnection();
    if (!isConnected) {
      console.error('Failed to connect to database. Aborting setup.');
      return;
    }

    // Read SQL files
    const baseTablesSQL = await fs.readFile('./create_base_tables.sql', 'utf8');
    const sponsorTablesSQL = await fs.readFile('./create_sponsor_tables.sql', 'utf8');
    const verifyTablesSQL = await fs.readFile('./verify_all_tables.sql', 'utf8');

    // Execute base tables setup
    console.log('Creating base tables...');
    await executeSQL(baseTablesSQL);

    // Execute sponsor tables setup
    console.log('Creating sponsor tables...');
    await executeSQL(sponsorTablesSQL);

    // Verify the setup
    console.log('Verifying database setup...');
    const verificationResult = await executeSQL(verifyTablesSQL);

    console.log('Database setup completed successfully');
    console.log('Verification results:', verificationResult);
  } catch (err) {
    console.error('Database setup failed:', err);
  }
}

// Run the setup
setupDatabase(); 