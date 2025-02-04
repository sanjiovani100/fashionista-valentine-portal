import { createClient } from '@supabase/supabase-js';
import { promises as fs } from 'fs';

const SUPABASE_URL = 'https://dssddsgypklubzkshkxo.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzc2Rkc2d5cGtsdWJ6a3Noa3hvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzgwOTI2MSwiZXhwIjoyMDUzMzg1MjYxfQ.v7qeA8JHxte1nMpTKvzC4DmKmLdafboQb5WOC8emSv8';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function executeSQLQuery(sql) {
  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: sql
    });

    if (error) {
      console.error('Error executing query:', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
}

async function createSQLFunction() {
  try {
    const functionSQL = `
      CREATE OR REPLACE FUNCTION exec_sql(sql_query text)
      RETURNS json AS $$
      DECLARE
          result json;
      BEGIN
          EXECUTE sql_query;
          result := json_build_object('success', true);
          RETURN result;
      EXCEPTION WHEN OTHERS THEN
          result := json_build_object(
              'success', false,
              'error', SQLERRM,
              'detail', SQLSTATE
          );
          RETURN result;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;

    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: functionSQL
    });

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

    // Read SQL files
    const baseTablesSQL = await fs.readFile('./create_base_tables.sql', 'utf8');
    const sponsorTablesSQL = await fs.readFile('./create_sponsor_tables.sql', 'utf8');
    const verifyTablesSQL = await fs.readFile('./verify_all_tables.sql', 'utf8');

    // Execute base tables setup
    console.log('Creating base tables...');
    await executeSQLQuery(baseTablesSQL);

    // Execute sponsor tables setup
    console.log('Creating sponsor tables...');
    await executeSQLQuery(sponsorTablesSQL);

    // Verify setup
    console.log('Verifying setup...');
    const verificationResult = await executeSQLQuery(verifyTablesSQL);

    console.log('Database setup completed successfully');
    console.log('Verification results:', verificationResult);
  } catch (err) {
    console.error('Database setup failed:', err);
  }
}

// Run the setup
setupDatabase(); 