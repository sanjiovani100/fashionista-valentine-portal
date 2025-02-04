import { supabase } from './supabase.config.js';

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test 1: Basic connection
    const { data: versionData, error: versionError } = await supabase
      .from('_prisma_migrations')
      .select('*')
      .limit(1);
    
    if (versionError) {
      console.log('Basic connection test:', versionError.message);
      console.log('This is expected if the table doesn\'t exist.');
    } else {
      console.log('Basic connection successful!');
    }

    // Test 2: Permissions
    console.log('\nTesting permissions...');
    const { data: schemas, error: schemaError } = await supabase
      .rpc('get_schemas');

    if (schemaError) {
      console.log('Permission test:', schemaError.message);
    } else {
      console.log('Permission test successful!');
      console.log('Available schemas:', schemas);
    }

    // Test 3: Create a temporary table
    console.log('\nTesting table creation...');
    const { error: createError } = await supabase
      .rpc('create_temp_table', {
        table_name: 'test_connection'
      });

    if (createError) {
      console.log('Table creation test:', createError.message);
    } else {
      console.log('Table creation test successful!');
    }

    // Print connection details
    console.log('\nConnection Details:');
    console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Service Role Key (first 10 chars):', process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 10) + '...');

  } catch (error) {
    console.error('Connection test failed:', error);
  }
}

testConnection(); 