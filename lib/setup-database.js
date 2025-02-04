import { executeQuery } from './supabase-client.js'

/**
 * Sets up the database operations table and function
 * This table will be used to execute DDL operations safely
 */
export async function setupDatabaseOperations() {
  return executeQuery(async (supabase) => {
    try {
      // Create the operations table and function using direct SQL
      const setupSQL = `
        -- Enable required extensions
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        -- Create the operations table if it doesn't exist
        CREATE TABLE IF NOT EXISTS "_database_operations" (
          id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
          sql text NOT NULL,
          executed_at timestamp with time zone DEFAULT now(),
          executed_by uuid DEFAULT auth.uid(),
          status text DEFAULT 'pending',
          error text
        );

        -- Create function to execute SQL safely
        CREATE OR REPLACE FUNCTION execute_database_operation()
        RETURNS TRIGGER AS $$
        BEGIN
          BEGIN
            EXECUTE NEW.sql;
            NEW.status := 'completed';
          EXCEPTION WHEN OTHERS THEN
            NEW.status := 'failed';
            NEW.error := SQLERRM;
          END;
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;

        -- Create trigger to execute SQL on insert
        DROP TRIGGER IF EXISTS execute_operation_trigger ON "_database_operations";
        CREATE TRIGGER execute_operation_trigger
          BEFORE INSERT ON "_database_operations"
          FOR EACH ROW
          EXECUTE FUNCTION execute_database_operation();

        -- Grant necessary permissions
        GRANT ALL ON "_database_operations" TO authenticated;
        GRANT EXECUTE ON FUNCTION execute_database_operation() TO authenticated;
      `

      // Execute the setup directly
      const { error: setupError } = await supabase.rpc('exec_sql', { sql: setupSQL })
      if (setupError) throw setupError

      return { success: true }
    } catch (error) {
      console.error('Error setting up database operations:', error)
      return { 
        success: false, 
        error: {
          message: error.message,
          details: error.details || error.hint || 'Unknown error occurred'
        }
      }
    }
  })
} 