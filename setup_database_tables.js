import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dssddsgypklubzkshkxo.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzc2Rkc2d5cGtsdWJ6a3Noa3hvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzgwOTI2MSwiZXhwIjoyMDUzMzg1MjYxfQ.v7qeA8JHxte1nMpTKvzC4DmKmLdafboQb5WOC8emSv8';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createSponsorsTable() {
  try {
    const { data, error } = await supabase
      .from('sponsors')
      .insert([
        {
          company_name: 'Test Company',
          industry: 'Technology',
          status: 'pending'
        }
      ])
      .select();

    if (error) {
      if (error.code === '42P01') {
        console.log('Sponsors table does not exist. Creating...');
        // Table will be created through migrations
      } else {
        throw error;
      }
    } else {
      console.log('Sponsors table exists');
      // Clean up test data
      await supabase
        .from('sponsors')
        .delete()
        .eq('company_name', 'Test Company');
    }
  } catch (err) {
    console.error('Error checking sponsors table:', err);
    throw err;
  }
}

async function createSponsorshipTiersTable() {
  try {
    const { data, error } = await supabase
      .from('sponsorship_tiers')
      .insert([
        {
          name: 'Test Tier',
          price: 1000,
          description: 'Test Description'
        }
      ])
      .select();

    if (error) {
      if (error.code === '42P01') {
        console.log('Sponsorship tiers table does not exist. Creating...');
        // Table will be created through migrations
      } else {
        throw error;
      }
    } else {
      console.log('Sponsorship tiers table exists');
      // Clean up test data
      await supabase
        .from('sponsorship_tiers')
        .delete()
        .eq('name', 'Test Tier');
    }
  } catch (err) {
    console.error('Error checking sponsorship tiers table:', err);
    throw err;
  }
}

async function setupDatabase() {
  try {
    console.log('Starting database setup...');

    // Check and create base tables
    await createSponsorsTable();
    await createSponsorshipTiersTable();

    // Insert default sponsorship tiers
    const defaultTiers = [
      {
        name: 'Bronze',
        description: 'Basic sponsorship package',
        price: 1000,
        benefits: { benefits: ['Logo on website', 'Social media mention'] },
        max_slots: 10
      },
      {
        name: 'Silver',
        description: 'Enhanced sponsorship package',
        price: 2500,
        benefits: { benefits: ['Logo on website', 'Social media campaign', 'Event booth'] },
        max_slots: 5
      },
      {
        name: 'Gold',
        description: 'Premium sponsorship package',
        price: 5000,
        benefits: { benefits: ['Logo on website', 'Social media campaign', 'Premium booth', 'Speaking slot'] },
        max_slots: 3
      },
      {
        name: 'Platinum',
        description: 'Elite sponsorship package',
        price: 10000,
        benefits: { benefits: ['Logo on website', 'Custom social campaign', 'Premium booth', 'Keynote slot', 'VIP access'] },
        max_slots: 1
      }
    ];

    console.log('Inserting default sponsorship tiers...');
    const { error: tiersError } = await supabase
      .from('sponsorship_tiers')
      .upsert(defaultTiers, { onConflict: 'name' });

    if (tiersError) {
      console.error('Error inserting default tiers:', tiersError);
      throw tiersError;
    }

    console.log('Database setup completed successfully');
  } catch (err) {
    console.error('Database setup failed:', err);
  }
}

// Run the setup
setupDatabase(); 