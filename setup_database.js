import { supabase } from './supabase.config.js';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

// Default sponsorship tiers
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

async function setupDatabase() {
  try {
    console.log('Starting database setup...');

    // Create tables one by one
    console.log('Creating sponsors table...');
    const { data: sponsorsData, error: sponsorsError } = await supabase
      .from('sponsors')
      .select('*')
      .limit(1);

    if (sponsorsError && sponsorsError.code === '42P01') {
      const { error } = await supabase.from('sponsors').insert({
        company_name: 'Test Company',
        industry: 'Technology',
        website_url: 'https://example.com',
        status: 'active'
      }).select();
      if (error && error.code !== '23505') throw error;
    } else if (sponsorsError) {
      throw sponsorsError;
    }

    console.log('Creating sponsorship_tiers table...');
    const { data: tiersData, error: tiersError } = await supabase
      .from('sponsorship_tiers')
      .select('*')
      .limit(1);

    if (tiersError && tiersError.code === '42P01') {
      const { error } = await supabase.from('sponsorship_tiers').insert(defaultTiers[0]).select();
      if (error && error.code !== '23505') throw error;
    } else if (tiersError) {
      throw tiersError;
    }

    console.log('Creating sponsor_documents table...');
    const { data: docsData, error: docsError } = await supabase
      .from('sponsor_documents')
      .select('*')
      .limit(1);

    if (docsError && docsError.code === '42P01') {
      const { error } = await supabase.from('sponsor_documents').insert({
        sponsor_id: '00000000-0000-0000-0000-000000000000',
        document_type: 'contract',
        file_path: '/test/path',
        file_name: 'test.pdf'
      }).select();
      if (error && error.code !== '23505' && error.code !== '23503') throw error;
    } else if (docsError) {
      throw docsError;
    }

    console.log('Creating sponsor_contacts table...');
    const { data: contactsData, error: contactsError } = await supabase
      .from('sponsor_contacts')
      .select('*')
      .limit(1);

    if (contactsError && contactsError.code === '42P01') {
      const { error } = await supabase.from('sponsor_contacts').insert({
        sponsor_id: '00000000-0000-0000-0000-000000000000',
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com'
      }).select();
      if (error && error.code !== '23505' && error.code !== '23503') throw error;
    } else if (contactsError) {
      throw contactsError;
    }

    // Insert default tiers
    console.log('Inserting default sponsorship tiers...');
    const { error: insertTiersError } = await supabase
      .from('sponsorship_tiers')
      .upsert(defaultTiers, { onConflict: 'name' });
    
    if (insertTiersError) throw insertTiersError;

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

// Run setup
setupDatabase(); 