import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

// Verify required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY'
]

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`)
  }
})

// Create Supabase client with simplified config
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { persistSession: false },
    db: { schema: 'public' }
  }
)

// Basic database operations
const db = {
  // Insert data
  async insert(table, data) {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
    return { data: result, error }
  },

  // Get data
  async get(table, options = {}) {
    const { data, error } = await supabase
      .from(table)
      .select(options.select || '*')
      .eq(options.filter || 'id', options.value || '')
    return { data, error }
  },

  // Update data
  async update(table, id, data) {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
    return { data: result, error }
  },

  // Delete data
  async delete(table, id) {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
    return { error }
  },

  // Execute raw SQL (for admin operations)
  async executeSQL(sql) {
    const { data, error } = await supabase.rpc('exec_sql', { sql })
    return { data, error }
  }
}

// Verify database connection
async function verifyConnection() {
  try {
    const { data, error } = await supabase.from('_realtime').select('*').limit(1)
    return !error || error.code === '42P01' // Table doesn't exist is OK
  } catch (error) {
    console.error('Database connection error:', error)
    return false
  }
}

// Utility function to handle database errors
function handleDatabaseError(error, context = '') {
  const errorDetails = {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
    context,
    timestamp: new Date().toISOString()
  }

  console.error('Database error:', errorDetails)
  return errorDetails
}

// Utility function to validate table schema
function validateTableSchema(schema) {
  const errors = []
  const validTypes = ['uuid', 'text', 'varchar', 'integer', 'decimal', 'boolean', 'jsonb', 'timestamp', 'date']
  
  Object.entries(schema).forEach(([column, definition]) => {
    const type = definition.split(' ')[0].toLowerCase()
    if (!validTypes.includes(type)) {
      errors.push(`Invalid type "${type}" for column "${column}"`)
    }
  })

  return errors
}

export {
  supabase,
  db,
  verifyConnection,
  handleDatabaseError,
  validateTableSchema
} 