const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://dssddsgypklubzkshkxo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzc2Rkc2d5cGtsdWJ6a3Noa3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MDkyNjEsImV4cCI6MjA1MzM4NTI2MX0.u3ObFcxAaqHKXVkw8stED2ZjZ7O85G2jkJpX9gPOMMk'
);

async function checkAndSetupTables() {
  console.log('Checking and setting up database tables...');

  // Check sponsors table
  const { data: sponsorsData, error: sponsorsError } = await supabase
    .from('sponsors')
    .select('*')
    .limit(1);

  if (sponsorsError) {
    console.log('Creating sponsors table...');
    const { error } = await supabase.rpc('create_sponsors_table');
    if (error) console.error('Error creating sponsors table:', error);
  } else {
    console.log('Sponsors table exists');
  }

  // Check sponsor_contacts table
  const { data: contactsData, error: contactsError } = await supabase
    .from('sponsor_contacts')
    .select('*')
    .limit(1);

  if (contactsError) {
    console.log('Creating sponsor_contacts table...');
    const { error } = await supabase.rpc('create_sponsor_contacts_table');
    if (error) console.error('Error creating sponsor_contacts table:', error);
  } else {
    console.log('Sponsor_contacts table exists');
  }

  // Check sponsorship_tiers table
  const { data: tiersData, error: tiersError } = await supabase
    .from('sponsorship_tiers')
    .select('*')
    .limit(1);

  if (tiersError) {
    console.log('Creating sponsorship_tiers table...');
    const { error } = await supabase.rpc('create_sponsorship_tiers_table');
    if (error) console.error('Error creating sponsorship_tiers table:', error);
  } else {
    console.log('Sponsorship_tiers table exists');
  }

  // Check sponsorship_benefits table
  const { data: benefitsData, error: benefitsError } = await supabase
    .from('sponsorship_benefits')
    .select('*')
    .limit(1);

  if (benefitsError) {
    console.log('Creating sponsorship_benefits table...');
    const { error } = await supabase.rpc('create_sponsorship_benefits_table');
    if (error) console.error('Error creating sponsorship_benefits table:', error);
  } else {
    console.log('Sponsorship_benefits table exists');
  }

  // Insert default sponsorship tiers if they don't exist
  if (!tiersData || tiersData.length === 0) {
    console.log('Inserting default sponsorship tiers...');
    const { error } = await supabase
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
    if (error) console.error('Error inserting default tiers:', error);
  }
}

checkAndSetupTables()
  .then(() => console.log('Database check complete'))
  .catch(err => console.error('Error:', err)); 