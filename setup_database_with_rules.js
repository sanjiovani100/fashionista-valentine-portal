import { config } from 'dotenv';
import { resolve } from 'path';
import {
  createSupabaseClient,
  createStandardTable,
  validateAndSanitizeInput,
  handleSupabaseError,
  monitorQueryPerformance
} from './supabase.helpers.js';
import { supabaseTypes } from './supabase.config.js';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

// Initialize Supabase client with service role key for admin operations
const supabase = createSupabaseClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  options: {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
});

// Define table schemas
const sponsorsSchema = {
  ...supabaseTypes.standardColumns,
  company_name: 'TEXT NOT NULL',
  industry: 'TEXT',
  website_url: supabaseTypes.commonTypes.url,
  status: supabaseTypes.commonTypes.status
};

const sponsorshipTiersSchema = {
  ...supabaseTypes.standardColumns,
  name: 'TEXT NOT NULL UNIQUE',
  description: 'TEXT',
  price: 'DECIMAL(10,2) NOT NULL',
  benefits: supabaseTypes.commonTypes.json,
  max_slots: 'INTEGER',
  is_active: 'BOOLEAN DEFAULT true'
};

const sponsorDocumentsSchema = {
  ...supabaseTypes.standardColumns,
  sponsor_id: 'UUID REFERENCES sponsors(id) ON DELETE CASCADE',
  document_type: 'TEXT NOT NULL CHECK (document_type IN (\'contract\', \'logo\', \'brand_guidelines\', \'marketing_material\'))',
  file_path: 'TEXT NOT NULL',
  file_name: 'TEXT NOT NULL',
  status: 'TEXT DEFAULT \'active\' CHECK (status IN (\'active\', \'archived\', \'pending_review\'))',
  version: 'INTEGER DEFAULT 1'
};

const sponsorContactsSchema = {
  ...supabaseTypes.standardColumns,
  sponsor_id: 'UUID REFERENCES sponsors(id) ON DELETE CASCADE',
  first_name: 'TEXT NOT NULL',
  last_name: 'TEXT NOT NULL',
  email: supabaseTypes.commonTypes.email,
  phone: supabaseTypes.commonTypes.phone,
  role: 'TEXT',
  is_primary: 'BOOLEAN DEFAULT false',
  UNIQUE: '(sponsor_id, email)'
};

// Default sponsorship tiers data
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

async function verifyConnection() {
  try {
    // Try to execute a simple query
    const { data, error } = await supabase
      .from('_realtime')
      .select('*')
      .limit(1);
    
    if (error && error.code === '42P01') {
      // Table doesn't exist but connection is successful
      console.log('Successfully connected to Supabase');
      return true;
    } else if (error) {
      throw error;
    }
    
    console.log('Successfully connected to Supabase');
    return true;
  } catch (error) {
    if (error.code === '42P01') {
      // Table doesn't exist but connection is successful
      console.log('Successfully connected to Supabase');
      return true;
    }
    console.error('Failed to connect to Supabase:', error);
    return false;
  }
}

async function setupDatabase() {
  try {
    console.log('Starting database setup with Cursor rules...');

    // Verify connection first
    const isConnected = await verifyConnection();
    if (!isConnected) {
      console.error('Failed to connect to Supabase. Please check your credentials.');
      return;
    }

    // Create tables with standard configuration
    console.log('Creating sponsors table...');
    await monitorQueryPerformance(supabase, () =>
      createStandardTable(supabase, 'sponsors', sponsorsSchema)
    );

    console.log('Creating sponsorship tiers table...');
    await monitorQueryPerformance(supabase, () =>
      createStandardTable(supabase, 'sponsorship_tiers', sponsorshipTiersSchema)
    );

    console.log('Creating sponsor documents table...');
    await monitorQueryPerformance(supabase, () =>
      createStandardTable(supabase, 'sponsor_documents', sponsorDocumentsSchema)
    );

    console.log('Creating sponsor contacts table...');
    await monitorQueryPerformance(supabase, () =>
      createStandardTable(supabase, 'sponsor_contacts', sponsorContactsSchema)
    );

    // Insert default sponsorship tiers
    console.log('Inserting default sponsorship tiers...');
    for (const tier of defaultTiers) {
      const { sanitized, errors } = validateAndSanitizeInput(tier, sponsorshipTiersSchema);
      
      if (errors.length > 0) {
        console.error('Validation errors for tier:', tier.name, errors);
        continue;
      }

      await monitorQueryPerformance(supabase, async (client) => {
        const { error } = await client
          .from('sponsorship_tiers')
          .upsert(sanitized, { onConflict: 'name' });

        if (error) throw error;
      });
    }

    console.log('Database setup completed successfully');
  } catch (error) {
    handleSupabaseError(error, 'Database Setup');
  }
}

// Run the setup
setupDatabase().catch(error => {
  console.error('Failed to set up database:', error);
  process.exit(1);
}); 