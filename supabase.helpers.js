import { supabaseConfig, supabaseUtils, supabaseTypes } from './supabase.config.js';
import { createClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase client with standard configuration
 * @param {Object} customConfig - Optional custom configuration
 * @returns {SupabaseClient} Configured Supabase client
 */
export function createSupabaseClient(customConfig = {}) {
  const config = {
    ...supabaseConfig.connection,
    ...customConfig
  };

  return createClient(config.supabaseUrl, config.supabaseKey, config.options);
}

/**
 * Validates table schema against required columns and naming conventions
 * @param {string} tableName - Name of the table
 * @param {Object} schema - Schema definition
 * @returns {Object} Validation result with errors if any
 */
export function validateTableSchema(tableName, schema) {
  const errors = [];

  // Basic table name validation
  if (!tableName.match(/^[a-z][a-z0-9_]*$/)) {
    errors.push(`Table name "${tableName}" must start with a letter and contain only lowercase letters, numbers, and underscores`);
  }

  // Basic column name validation
  Object.keys(schema).forEach(column => {
    if (!column.match(/^[a-z][a-z0-9_]*$/)) {
      errors.push(`Column name "${column}" must start with a letter and contain only lowercase letters, numbers, and underscores`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Creates a table with standard configuration and validation
 * @param {SupabaseClient} supabase - Supabase client
 * @param {string} tableName - Name of the table
 * @param {Object} customColumns - Custom columns for the table
 * @returns {Promise} Result of table creation
 */
export async function createStandardTable(supabase, tableName, customColumns = {}) {
  try {
    // Validate schema
    const validation = validateTableSchema(tableName, customColumns);
    if (!validation.isValid) {
      throw new Error(`Schema validation failed: ${validation.errors.join(', ')}`);
    }

    // Construct SQL for table creation
    const columnDefinitions = Object.entries(customColumns)
      .map(([column, type]) => `${column} ${type}`)
      .join(',\n  ');

    const sql = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        ${columnDefinitions}
      );

      -- Enable RLS
      ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY;

      -- Create default policies
      DO $$ BEGIN
        -- Select policy
        BEGIN
          CREATE POLICY "Allow select for all" ON ${tableName}
            FOR SELECT USING (true);
        EXCEPTION
          WHEN duplicate_object THEN NULL;
        END;

        -- Insert policy
        BEGIN
          CREATE POLICY "Allow insert for authenticated users" ON ${tableName}
            FOR INSERT WITH CHECK (auth.role() = 'authenticated');
        EXCEPTION
          WHEN duplicate_object THEN NULL;
        END;

        -- Update policy
        BEGIN
          CREATE POLICY "Allow update for owners" ON ${tableName}
            FOR UPDATE USING (auth.uid() = created_by);
        EXCEPTION
          WHEN duplicate_object THEN NULL;
        END;

        -- Delete policy
        BEGIN
          CREATE POLICY "Allow delete for owners" ON ${tableName}
            FOR DELETE USING (auth.uid() = created_by);
        EXCEPTION
          WHEN duplicate_object THEN NULL;
        END;
      END $$;
    `;

    const { error } = await supabase.rpc('exec_sql', { sql });
    if (error) throw error;

    return { success: true };
  } catch (error) {
    handleSupabaseError(error, `Create Table: ${tableName}`);
    return { success: false, error };
  }
}

/**
 * Validates and sanitizes input data based on schema
 * @param {Object} data - Input data
 * @param {Object} schema - Schema definition
 * @returns {Object} Sanitized data and validation errors
 */
export function validateAndSanitizeInput(data, schema) {
  const sanitized = {};
  const errors = [];

  Object.entries(data).forEach(([key, value]) => {
    if (!schema[key]) {
      errors.push(`Unknown field: ${key}`);
      return;
    }

    // Basic type validation and sanitization
    try {
      switch (schema[key]) {
        case 'TEXT':
        case 'VARCHAR':
          sanitized[key] = String(value).trim();
          break;
        case 'INTEGER':
          sanitized[key] = parseInt(value, 10);
          if (isNaN(sanitized[key])) {
            errors.push(`Invalid integer value for ${key}`);
          }
          break;
        case 'DECIMAL':
        case 'NUMERIC':
          sanitized[key] = parseFloat(value);
          if (isNaN(sanitized[key])) {
            errors.push(`Invalid decimal value for ${key}`);
          }
          break;
        case 'BOOLEAN':
          sanitized[key] = Boolean(value);
          break;
        case 'JSON':
        case 'JSONB':
          if (typeof value === 'string') {
            try {
              sanitized[key] = JSON.parse(value);
            } catch (e) {
              errors.push(`Invalid JSON for ${key}`);
            }
          } else {
            sanitized[key] = value;
          }
          break;
        default:
          sanitized[key] = value;
      }
    } catch (error) {
      errors.push(`Validation error for ${key}: ${error.message}`);
    }
  });

  return { sanitized, errors };
}

/**
 * Standardized error handling for Supabase operations
 * @param {Error} error - Error object
 * @param {string} context - Context where the error occurred
 */
export function handleSupabaseError(error, context = '') {
  const errorLog = {
    context,
    timestamp: new Date().toISOString(),
    error: {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    }
  };

  // Log error
  console.error('Supabase Error:', errorLog);

  // Check if error meets notification threshold
  if (supabaseConfig.monitoring.alerts.errorThreshold > 0) {
    // Implement error notification logic here
    // This could be integration with error tracking service
  }

  throw error;
}

/**
 * Monitors query performance and logs slow queries
 * @param {SupabaseClient} supabase - Supabase client
 * @param {Function} queryFn - Query function to monitor
 * @returns {Promise} Query result
 */
export async function monitorQueryPerformance(supabase, queryFn) {
  const start = performance.now();
  try {
    const result = await queryFn(supabase);
    const duration = performance.now() - start;

    // Log slow queries
    if (duration > supabaseConfig.monitoring.alerts.performanceThreshold) {
      console.warn(`Slow query detected (${duration}ms):`, {
        duration,
        query: queryFn.toString()
      });
    }

    return result;
  } catch (error) {
    const duration = performance.now() - start;
    console.error(`Query failed after ${duration}ms:`, {
      duration,
      query: queryFn.toString(),
      error
    });
    throw error;
  }
} 