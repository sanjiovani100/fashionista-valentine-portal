import fetch from 'node-fetch';
import { promises as fs } from 'fs';

const SUPABASE_URL = 'https://dssddsgypklubzkshkxo.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzc2Rkc2d5cGtsdWJ6a3Noa3hvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzgwOTI2MSwiZXhwIjoyMDUzMzg1MjYxfQ.v7qeA8JHxte1nMpTKvzC4DmKmLdafboQb5WOC8emSv8';

async function executePostgrestQuery(sql) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify({
        query: sql
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  }
}

async function setupDatabase() {
  try {
    console.log('Starting database setup...');

    // Read SQL files
    const createSQLFunctionSQL = await fs.readFile('./create_sql_function.sql', 'utf8');
    const baseTablesSQL = await fs.readFile('./create_base_tables.sql', 'utf8');
    const sponsorTablesSQL = await fs.readFile('./create_sponsor_tables.sql', 'utf8');
    const verifyTablesSQL = await fs.readFile('./verify_all_tables.sql', 'utf8');

    // Create SQL execution function
    console.log('Creating SQL execution function...');
    await executePostgrestQuery(createSQLFunctionSQL);

    // Create base tables
    console.log('Creating base tables...');
    await executePostgrestQuery(baseTablesSQL);

    // Create sponsor tables
    console.log('Creating sponsor tables...');
    await executePostgrestQuery(sponsorTablesSQL);

    // Verify setup
    console.log('Verifying setup...');
    const verificationResult = await executePostgrestQuery(verifyTablesSQL);

    console.log('Database setup completed successfully');
    console.log('Verification results:', verificationResult);
  } catch (err) {
    console.error('Database setup failed:', err);
  }
}

// Run the setup
setupDatabase(); 