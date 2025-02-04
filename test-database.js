import { verifyConnection, db } from './lib/supabase-client.js'
import { dbOps } from './lib/database-operations.js'

async function testDatabaseSetup() {
  try {
    console.log('Testing Supabase connection...')
    const isConnected = await verifyConnection()
    if (!isConnected) {
      throw new Error('Failed to connect to Supabase')
    }
    console.log('Successfully connected to Supabase')

    // Test table creation
    console.log('\nTesting table creation...')
    const testSchema = {
      id: 'uuid DEFAULT uuid_generate_v4() PRIMARY KEY',
      name: 'text NOT NULL',
      description: 'text',
      created_by: 'uuid DEFAULT auth.uid()',
      created_at: 'timestamp with time zone DEFAULT now()',
      updated_at: 'timestamp with time zone DEFAULT now()'
    }

    const { error: createError } = await dbOps.createTable('test_table', testSchema)
    if (createError) throw createError
    console.log('Table created successfully')

    // Test RLS
    console.log('\nEnabling Row Level Security...')
    const { error: rlsError } = await dbOps.enableRLS('test_table')
    if (rlsError) throw rlsError
    console.log('RLS enabled successfully')

    // Test indexes
    console.log('\nCreating indexes...')
    const { error: indexError } = await dbOps.createIndexes('test_table', ['name', 'created_at'])
    if (indexError) throw indexError
    console.log('Indexes created successfully')

    // Test data insertion
    console.log('\nTesting data insertion...')
    const testData = {
      name: 'Test Item',
      description: 'This is a test item'
    }

    const { error: insertError } = await db.insert('test_table', testData)
    if (insertError) throw insertError
    console.log('Data inserted successfully')

    // Verify table
    console.log('\nVerifying table...')
    const { exists, valid, schema } = await dbOps.verifyTable('test_table', testSchema)
    console.log('Table verification results:')
    console.log('- Exists:', exists)
    console.log('- Valid:', valid)
    if (schema) {
      console.log('Schema information:')
      console.log('- Actual columns:', schema.actual?.join(', '))
      console.log('- Expected columns:', schema.expected?.join(', '))
      console.log('- Missing columns:', schema.missing?.join(', ') || 'None')
      if (schema.details) {
        console.log('\nDetailed schema:')
        schema.details.forEach(col => {
          console.log(`- ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'})`)
        })
      }
    }

    console.log('\nAll tests completed successfully!')
  } catch (error) {
    console.error('Test failed:', error)
    process.exit(1)
  }
}

testDatabaseSetup() 