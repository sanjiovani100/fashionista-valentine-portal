import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dssddsgypklubzkshkxo.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzc2Rkc2d5cGtsdWJ6a3Noa3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MDkyNjEsImV4cCI6MjA1MzM4NTI2MX0.u3ObFcxAaqHKXVkw8stED2ZjZ7O85G2jkJpX9gPOMMk';

const supabase = createClient(SUPABASE_URL, ANON_KEY);

async function signInWithEmail() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@fashionista.com',
      password: 'Toronto50001255#'
    });

    if (error) throw error;
    console.log('Successfully signed in');
    return data;
  } catch (err) {
    console.error('Error signing in:', err);
    throw err;
  }
}

async function verifyTables() {
  try {
    // Check sponsors table
    const { data: sponsors, error: sponsorsError } = await supabase
      .from('sponsors')
      .select('count(*)');

    if (sponsorsError) {
      console.log('Sponsors table does not exist or not accessible');
    } else {
      console.log('Sponsors table exists');
    }

    // Check sponsorship_tiers table
    const { data: tiers, error: tiersError } = await supabase
      .from('sponsorship_tiers')
      .select('count(*)');

    if (tiersError) {
      console.log('Sponsorship tiers table does not exist or not accessible');
    } else {
      console.log('Sponsorship tiers table exists');
    }

    return !sponsorsError && !tiersError;
  } catch (err) {
    console.error('Error verifying tables:', err);
    return false;
  }
}

async function insertDefaultTiers() {
  try {
    const defaultTiers = [
      {
        name: 'Bronze',
        description: 'Basic sponsorship package',
        price: 1000,
        benefits: { benefits: ['Logo on website', 'Social media mention'] },
        max_slots: 10,
        is_active: true
      },
      {
        name: 'Silver',
        description: 'Enhanced sponsorship package',
        price: 2500,
        benefits: { benefits: ['Logo on website', 'Social media campaign', 'Event booth'] },
        max_slots: 5,
        is_active: true
      },
      {
        name: 'Gold',
        description: 'Premium sponsorship package',
        price: 5000,
        benefits: { benefits: ['Logo on website', 'Social media campaign', 'Premium booth', 'Speaking slot'] },
        max_slots: 3,
        is_active: true
      },
      {
        name: 'Platinum',
        description: 'Elite sponsorship package',
        price: 10000,
        benefits: { benefits: ['Logo on website', 'Custom social campaign', 'Premium booth', 'Keynote slot', 'VIP access'] },
        max_slots: 1,
        is_active: true
      }
    ];

    const { error } = await supabase
      .from('sponsorship_tiers')
      .upsert(defaultTiers, { onConflict: 'name' });

    if (error) throw error;
    console.log('Default tiers inserted successfully');
  } catch (err) {
    console.error('Error inserting default tiers:', err);
    throw err;
  }
}

async function setupDatabase() {
  try {
    console.log('Starting database setup...');

    // Sign in first
    await signInWithEmail();

    // Verify tables exist
    const tablesExist = await verifyTables();
    if (!tablesExist) {
      console.log('Tables need to be created. Please run the SQL migrations first.');
      return;
    }

    // Insert default data
    await insertDefaultTiers();

    console.log('Database setup completed successfully');
  } catch (err) {
    console.error('Database setup failed:', err);
  }
}

// Run the setup
setupDatabase(); 