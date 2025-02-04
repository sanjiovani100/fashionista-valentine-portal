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

async function setupDatabase() {
  try {
    console.log('Setting up database...');

    // Read SQL file
    const sqlPath = join(__dirname, '..', 'sql', 'create_tables.sql');
    const sqlContent = readFileSync(sqlPath, 'utf8');

    // Execute SQL directly
    const { error } = await supabase.rpc('exec_sql', {
      sql: sqlContent
    });

    if (error) {
      console.error('Error executing SQL:', error);
    } else {
      console.log('Successfully executed SQL commands');
    }

    // Insert default sponsorship tiers
    const { data: tiersData, error: tiersError } = await supabase
      .from('sponsorship_tiers')
      .select('*');

    if (!tiersData || tiersData.length === 0) {
      console.log('Inserting default sponsorship tiers...');
      const { error: insertError } = await supabase
        .from('sponsorship_tiers')
        .insert([
          {
            name: 'Bronze',
            description: 'Basic sponsorship package',
            price_range: '$5,000 - $10,000',
            benefits: ['Logo Display', 'Digital Marketing'],
            is_active: true
          },
          {
            name: 'Silver',
            description: 'Enhanced visibility package',
            price_range: '$10,001 - $25,000',
            benefits: ['Logo Display', 'Digital Marketing', 'Social Media Integration'],
            is_active: true
          },
          {
            name: 'Gold',
            description: 'Premium sponsorship package',
            price_range: '$25,001 - $50,000',
            benefits: ['Logo Display', 'Digital Marketing', 'Social Media Integration', 'VIP Event Access'],
            is_active: true
          },
          {
            name: 'Platinum',
            description: 'Elite sponsorship package',
            price_range: '$50,001+',
            benefits: ['Logo Display', 'Digital Marketing', 'Social Media Integration', 'VIP Event Access', 'Speaking Opportunity'],
            is_active: true
          }
        ]);

      if (insertError) {
        console.error('Error inserting default tiers:', insertError);
      } else {
        console.log('Default sponsorship tiers inserted successfully');
      }
    } else {
      console.log('Sponsorship tiers already exist');
    }

    console.log('Database setup complete');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase(); 