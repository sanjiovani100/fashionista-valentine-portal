import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabase = createClient(
  'https://dssddsgypklubzkshkxo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzc2Rkc2d5cGtsdWJ6a3Noa3hvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzgwOTI2MSwiZXhwIjoyMDUzMzg1MjYxfQ.v7qeA8JHxte1nMpTKvzC4DmKmLdafboQb5WOC8emSv8'
);

async function applyOptimizations() {
  try {
    console.log('Applying database optimizations...');
    
    const sqlPath = join(__dirname, '..', 'sql', 'create_indexes.sql');
    const sql = readFileSync(sqlPath, 'utf8');
    
    const { error } = await supabase.rpc('exec_sql', { sql });
    if (error) throw error;
    
    console.log('Database optimizations applied successfully');
  } catch (error) {
    console.error('Error applying optimizations:', error);
    process.exit(1);
  }
}

applyOptimizations(); 