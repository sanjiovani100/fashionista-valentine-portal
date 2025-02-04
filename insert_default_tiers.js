import { supabase } from './supabase.config.js';

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

async function insertDefaultTiers() {
  try {
    console.log('Inserting default sponsorship tiers...');
    const { error } = await supabase
      .from('sponsorship_tiers')
      .upsert(defaultTiers, { onConflict: 'name' });
    
    if (error) throw error;
    console.log('Default tiers inserted successfully');
  } catch (error) {
    console.error('Failed to insert default tiers:', error);
    process.exit(1);
  }
}

insertDefaultTiers(); 