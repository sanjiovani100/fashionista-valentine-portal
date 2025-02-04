// @ts-check
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env');
console.log('Loading environment variables from:', envPath);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('Error loading .env file:', result.error);
  process.exit(1);
}

console.log('Environment variables loaded:', {
  VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL ? 'Present' : 'Missing',
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? 'Present' : 'Missing'
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Supabase client with service role key for admin access
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing Supabase credentials');
  console.error('SUPABASE_URL:', SUPABASE_URL);
  console.error('SUPABASE_KEY:', SUPABASE_KEY ? 'Present' : 'Missing');
  process.exit(1);
}

console.log('Initializing Supabase client with URL:', SUPABASE_URL);

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const SWIMWEAR_EVENT_ID = 'd333d298-12fa-4538-a7eb-e3af30506eec';

const eventData = {
  id: SWIMWEAR_EVENT_ID,
  name: 'swim_paradise_show',
  subtype: 'swimwear',
  title: 'Summer Splash: Swimwear Paradise 2024',
  description: 'Dive into luxury with our exclusive swimwear showcase featuring the latest trends in beach and pool fashion.',
  venue: 'Azure Beach Resort & Spa',
  capacity: 300,
  start_time: '2024-07-15T18:00:00Z',
  end_time: '2024-07-15T22:00:00Z',
  registration_deadline: '2024-07-01T23:59:59Z',
  theme: 'Coastal Elegance',
  meta_description: 'Experience the ultimate summer fashion event showcasing luxury swimwear collections.',
  meta_keywords: ['swimwear', 'fashion show', 'luxury', 'beach fashion', 'resort wear'],
  venue_features: {
    pool_specs: {
      dimensions: '25m x 15m',
      depth: '1.2m - 2.5m',
      temperature: '26°C'
    },
    changing_facilities: {
      capacity: 50,
      amenities: [
        'Private Changing Rooms',
        'Secure Lockers',
        'Professional Lighting',
        'Makeup Stations',
        'Hair Styling Area'
      ]
    },
    photography_zones: [
      {
        name: 'Poolside Runway',
        capacity: 20,
        equipment_allowed: ['Professional Cameras', 'Tripods', 'Lighting Equipment']
      },
      {
        name: 'Beach Sunset Area',
        capacity: 15,
        equipment_allowed: ['Professional Cameras', 'Reflectors']
      },
      {
        name: 'Cabana Studio',
        capacity: 10,
        equipment_allowed: ['Professional Cameras', 'Studio Lights', 'Backdrops']
      }
    ]
  },
  event_highlights: {
    key_attractions: [
      'Exclusive Preview of Summer 2024 Collections',
      'Live DJ Performance by the Pool',
      'Beachside Cocktail Reception',
      'Interactive Designer Meet & Greet',
      'Sustainable Swimwear Showcase'
    ],
    special_guests: [
      'Celebrity Fashion Influencer Sarah Waves',
      'Olympic Swimmer Maria Splash',
      'Designer Isabella Shore'
    ],
    featured_designers: [
      'Coastal Dreams by Marina Bay',
      'Azure Collection by Wave Riders',
      'Eco Swim by Green Tides'
    ]
  },
  schedule: [
    {
      time: '18:00',
      title: 'Welcome Reception',
      description: 'Poolside welcome drinks and canapés',
      location: 'Main Pool Deck'
    },
    {
      time: '18:30',
      title: 'Designer Showcase Introduction',
      description: 'Opening remarks and designer presentations',
      location: 'Beachfront Stage'
    },
    {
      time: '19:00',
      title: 'Sustainable Swimwear Collection',
      description: 'Eco Swim by Green Tides presentation',
      location: 'Poolside Runway'
    },
    {
      time: '19:45',
      title: 'Celebrity Showcase',
      description: 'Special performance by Maria Splash',
      location: 'Olympic Pool'
    },
    {
      time: '20:30',
      title: 'Main Collection Showcase',
      description: 'Featured collections from all designers',
      location: 'Main Runway'
    },
    {
      time: '21:15',
      title: 'Designer Meet & Greet',
      description: 'Interactive session with designers',
      location: 'VIP Lounge'
    },
    {
      time: '21:45',
      title: 'Closing Ceremony',
      description: 'Final walks and closing remarks',
      location: 'Beachfront Stage'
    }
  ]
};

const tickets = [
  {
    id: 'swim-gen-001',
    event_id: SWIMWEAR_EVENT_ID,
    ticket_type: 'General Admission',
    price: 150,
    quantity_available: 200,
    benefits: [
      'Access to main event',
      'Welcome drink',
      'Standing area viewing',
      'Access to designer showcase'
    ],
    early_bird_deadline: '2024-06-15T23:59:59Z',
    early_bird_price: 120,
    group_discount_threshold: 5,
    group_discount_percentage: 10
  },
  {
    id: 'swim-vip-001',
    event_id: SWIMWEAR_EVENT_ID,
    ticket_type: 'VIP Experience',
    price: 350,
    quantity_available: 75,
    benefits: [
      'Premium seating',
      'Exclusive VIP lounge access',
      'Complimentary drinks & canapés',
      'Meet & greet with designers',
      'Swag bag with exclusive products',
      'Priority photography session'
    ],
    early_bird_deadline: '2024-06-15T23:59:59Z',
    early_bird_price: 300,
    group_discount_threshold: 3,
    group_discount_percentage: 15
  },
  {
    id: 'swim-plat-001',
    event_id: SWIMWEAR_EVENT_ID,
    ticket_type: 'Platinum Package',
    price: 750,
    quantity_available: 25,
    benefits: [
      'Front row seating',
      'Private cabana access',
      'Personal concierge service',
      'Exclusive dinner with designers',
      'Professional photo session',
      'Limited edition designer items',
      'Spa treatment at resort',
      'Overnight stay at resort'
    ],
    early_bird_deadline: '2024-06-15T23:59:59Z',
    early_bird_price: 650,
    group_discount_threshold: 2,
    group_discount_percentage: 20
  }
];

// Add swimwear-specific details
const swimwearDetails = {
  event_id: SWIMWEAR_EVENT_ID,
  beach_party_details: {
    theme: 'Tropical Paradise',
    entertainment: ['Live DJ', 'Fire Dancers', 'Acoustic Band'],
    refreshments: ['Signature Cocktails', 'Gourmet Canapés', 'Fresh Fruit Bar'],
    activities: ['Beach Volleyball', 'Photo Booths', 'Sand Art']
  },
  pool_access_info: {
    zones: ['VIP Cabanas', 'Runway Pool', 'Relaxation Area'],
    safety_measures: ['Lifeguards', 'Non-slip Surfaces', 'First Aid Station'],
    amenities: ['Towel Service', 'Sunscreen Station', 'Refreshment Bar']
  },
  fitting_sessions: {
    schedule: [
      {
        time: '14:00-15:30',
        designer: 'Marina Bay',
        location: 'Main Fitting Suite'
      },
      {
        time: '15:45-17:15',
        designer: 'Wave Riders',
        location: 'VIP Fitting Room'
      }
    ],
    requirements: ['Appointment Only', 'Bring Own Swimwear', 'Professional Measurements']
  },
  beauty_workshops: {
    workshops: [
      {
        title: 'Beach Makeup Masterclass',
        duration: '90min',
        capacity: 20,
        instructor: 'Maria Style',
        requirements: ['Own Makeup Kit', 'Mirror']
      },
      {
        title: 'Summer Hair Styling',
        duration: '60min',
        capacity: 15,
        instructor: 'John Waves',
        requirements: ['Hair Tools', 'Hair Products']
      }
    ]
  }
};

// First, let's create the SQL functions that our setup script will call
const setupFunctions = `
-- Function to create fashion_events table
CREATE OR REPLACE FUNCTION create_fashion_events_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS fashion_events (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    location TEXT,
    status TEXT,
    capacity INTEGER,
    venue_features JSONB DEFAULT '{}'::jsonb,
    event_highlights JSONB DEFAULT '{}'::jsonb,
    schedule JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
END;
$$;

-- Function to create event_tickets table
CREATE OR REPLACE FUNCTION create_event_tickets_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS event_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES fashion_events(id),
    type TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL,
    benefits JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
END;
$$;

-- Function to create fashion_images table
CREATE OR REPLACE FUNCTION create_fashion_images_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS fashion_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES fashion_events(id),
    category TEXT NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
END;
$$;

-- Function to create event_sponsors table
CREATE OR REPLACE FUNCTION create_event_sponsors_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS event_sponsors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES fashion_events(id),
    name TEXT NOT NULL,
    logo_url TEXT,
    sponsorship_tier TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    display_priority INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
END;
$$;
`;

// Initialize database by creating the functions
async function initializeDatabase() {
  console.log('Creating database functions...');
  
  try {
    const { error } = await supabase.rpc('exec_sql', { query: setupFunctions });
    if (error) throw error;
    console.log('Database functions created successfully');
  } catch (error) {
    console.error('Error creating database functions:', error);
    throw error;
  }
}

// Database setup functions
async function setupDatabase() {
  console.log('Setting up database tables...');
  
  try {
    // Create fashion_events table
    const { error: eventsError } = await supabase.rpc('create_fashion_events_table');
    if (eventsError) throw eventsError;
    
    // Create event_tickets table
    const { error: ticketsError } = await supabase.rpc('create_event_tickets_table');
    if (ticketsError) throw ticketsError;
    
    // Create fashion_images table
    const { error: imagesError } = await supabase.rpc('create_fashion_images_table');
    if (imagesError) throw imagesError;
    
    // Create event_sponsors table
    const { error: sponsorsError } = await supabase.rpc('create_event_sponsors_table');
    if (sponsorsError) throw sponsorsError;
    
    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  }
}

// Add data validation function
function validateEventData(data) {
  const required = ['id', 'name', 'description', 'start_date', 'end_date', 'location', 'capacity'];
  const missing = required.filter(field => !data[field]);
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  // Validate dates
  const start = new Date(data.start_date);
  const end = new Date(data.end_date);
  if (end <= start) {
    throw new Error('End date must be after start date');
  }
  
  // Validate capacity
  if (data.capacity <= 0) {
    throw new Error('Capacity must be greater than 0');
  }
}

function validateTicketData(tickets) {
  for (const ticket of tickets) {
    const required = ['event_id', 'type', 'price', 'quantity', 'benefits'];
    const missing = required.filter(field => !ticket[field]);
    if (missing.length > 0) {
      throw new Error(`Missing required ticket fields: ${missing.join(', ')}`);
    }
    
    if (ticket.price < 0) {
      throw new Error('Ticket price must be non-negative');
    }
    if (ticket.quantity <= 0) {
      throw new Error('Ticket quantity must be greater than 0');
    }
  }
}

// Add sample images data
const eventImages = [
  {
    event_id: SWIMWEAR_EVENT_ID,
    category: 'venue',
    url: 'https://example.com/images/venue/beachside-resort.jpg',
    alt_text: 'Beachside Resort & Spa - Main Pool Area',
    metadata: JSON.stringify({
      size: '2048x1365',
      type: 'venue',
      tags: ['pool', 'resort', 'luxury']
    })
  },
  {
    event_id: SWIMWEAR_EVENT_ID,
    category: 'runway',
    url: 'https://example.com/images/runway/poolside-setup.jpg',
    alt_text: 'Poolside Runway Setup',
    metadata: JSON.stringify({
      size: '1920x1080',
      type: 'setup',
      tags: ['runway', 'pool', 'stage']
    })
  }
];

// Add sample sponsors data
const eventSponsors = [
  {
    event_id: SWIMWEAR_EVENT_ID,
    name: 'Azure Beachwear',
    logo_url: 'https://example.com/sponsors/azure-beachwear.png',
    sponsorship_tier: 'Platinum',
    is_featured: true,
    display_priority: 1
  },
  {
    event_id: SWIMWEAR_EVENT_ID,
    name: 'SunLife Protection',
    logo_url: 'https://example.com/sponsors/sunlife.png',
    sponsorship_tier: 'Gold',
    is_featured: true,
    display_priority: 2
  }
];

// Update setupSwimwearEvent to include rollback and verification
async function setupSwimwearEvent() {
  const setupSteps = [];
  
  try {
    console.log('Starting swimwear event setup...');
    
    // First create the database functions
    await initializeDatabase();
    setupSteps.push('database_functions');
    
    // Then set up the database tables
    await setupDatabase();
    setupSteps.push('database_tables');
    
    console.log('Setting up swimwear event...');
    
    // Validate event data
    validateEventData(eventData);
    validateTicketData(tickets);
    
    // Upsert event data
    const { error: eventError } = await supabase
      .from('fashion_events')
      .upsert(eventData);
    
    if (eventError) throw eventError;
    setupSteps.push('event_data');
    
    // Set up tickets
    const { error: ticketsError } = await supabase
      .from('event_tickets')
      .upsert(tickets);
    
    if (ticketsError) throw ticketsError;
    setupSteps.push('tickets');
    
    // Set up images
    const { error: imagesError } = await supabase
      .from('fashion_images')
      .upsert(eventImages);
    
    if (imagesError) throw imagesError;
    setupSteps.push('images');
    
    // Set up sponsors
    const { error: sponsorsError } = await supabase
      .from('event_sponsors')
      .upsert(eventSponsors);
    
    if (sponsorsError) throw sponsorsError;
    setupSteps.push('sponsors');
    
    // Verify setup
    await verifySetup();
    setupSteps.push('verification');
    
    console.log('Swimwear event setup completed successfully');
  } catch (error) {
    console.error('Error setting up swimwear event:', error);
    console.log('Rolling back changes...');
    
    // Attempt rollback in reverse order
    for (const step of setupSteps.reverse()) {
      try {
        await rollbackStep(step);
      } catch (rollbackError) {
        console.error(`Error rolling back ${step}:`, rollbackError);
      }
    }
    
    throw error;
  }
}

// Add verification function
async function verifySetup() {
  console.log('Verifying setup...');
  
  // Verify event
  const { data: event, error: eventError } = await supabase
    .from('fashion_events')
    .select('*')
    .eq('id', SWIMWEAR_EVENT_ID)
    .single();
  
  if (eventError) throw eventError;
  if (!event) throw new Error('Event not found after setup');
  
  // Verify tickets
  const { data: eventTickets, error: ticketsError } = await supabase
    .from('event_tickets')
    .select('*')
    .eq('event_id', SWIMWEAR_EVENT_ID);
  
  if (ticketsError) throw ticketsError;
  if (!eventTickets?.length) throw new Error('No tickets found after setup');
  
  // Verify images
  const { data: images, error: imagesError } = await supabase
    .from('fashion_images')
    .select('*')
    .eq('event_id', SWIMWEAR_EVENT_ID);
  
  if (imagesError) throw imagesError;
  if (!images?.length) throw new Error('No images found after setup');
  
  // Verify sponsors
  const { data: sponsors, error: sponsorsError } = await supabase
    .from('event_sponsors')
    .select('*')
    .eq('event_id', SWIMWEAR_EVENT_ID);
  
  if (sponsorsError) throw sponsorsError;
  if (!sponsors?.length) throw new Error('No sponsors found after setup');
  
  console.log('Setup verified successfully:', {
    event: event.name,
    ticketsCount: eventTickets.length,
    imagesCount: images.length,
    sponsorsCount: sponsors.length
  });
}

// Add rollback function
async function rollbackStep(step) {
  console.log(`Rolling back step: ${step}`);
  
  switch (step) {
    case 'event_data':
      await supabase
        .from('fashion_events')
        .delete()
        .eq('id', SWIMWEAR_EVENT_ID);
      break;
      
    case 'tickets':
      await supabase
        .from('event_tickets')
        .delete()
        .eq('event_id', SWIMWEAR_EVENT_ID);
      break;
      
    case 'images':
      await supabase
        .from('fashion_images')
        .delete()
        .eq('event_id', SWIMWEAR_EVENT_ID);
      break;
      
    case 'sponsors':
      await supabase
        .from('event_sponsors')
        .delete()
        .eq('event_id', SWIMWEAR_EVENT_ID);
      break;
      
    // Database functions and tables are not rolled back as they might be used by other events
    default:
      console.log(`No rollback needed for step: ${step}`);
  }
}

// Execute setup
setupSwimwearEvent()
  .then(() => {
    console.log('Setup completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Setup failed:', error);
    process.exit(1);
  }); 