// @ts-check
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Supabase client with service role key for admin access
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const SWIMWEAR_EVENT_ID = 'd333d298-12fa-4538-a7eb-e3af30506eec';

const images = [
  {
    category: 'event_hero',
    url: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1738590376/fashion-swim-012_okvhgy.webp',
    alt_text: 'Swimwear Fashion Show Hero Image',
    metadata: {
      width: 1920,
      height: 1080,
      format: 'webp'
    }
  },
  {
    category: 'designer_profile',
    url: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1738590794/fashion-swim-014_rdpfch.webp',
    alt_text: 'Fashion Designer at Work',
    metadata: {
      width: 1200,
      height: 800,
      format: 'webp'
    }
  },
  {
    category: 'event_gallery',
    url: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1738589854/swim-001_dv0w8l.jpg',
    alt_text: 'Swimwear Collection Gallery Image 1',
    metadata: {
      width: 1200,
      height: 800,
      format: 'jpg'
    }
  },
  {
    category: 'event_gallery',
    url: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1738589854/swim-005_qaysrr.jpg',
    alt_text: 'Swimwear Collection Gallery Image 2',
    metadata: {
      width: 1200,
      height: 800,
      format: 'jpg'
    }
  },
  {
    category: 'event_gallery',
    url: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1738222945/swim-fashion_l1arzm.jpg',
    alt_text: 'Swimwear Collection Gallery Image 3',
    metadata: {
      width: 1200,
      height: 800,
      format: 'jpg'
    }
  }
];

async function setupSwimwearImages() {
  try {
    console.log('Setting up swimwear event images...');
    
    // First, delete any existing images for this event
    const { error: deleteError } = await supabase
      .from('fashion_images')
      .delete()
      .eq('event_id', SWIMWEAR_EVENT_ID);
    
    if (deleteError) {
      console.error('Error deleting existing images:', deleteError);
      return;
    }

    // Insert new images
    const { data, error } = await supabase
      .from('fashion_images')
      .insert(images.map(image => ({
        event_id: SWIMWEAR_EVENT_ID,
        ...image
      })));

    if (error) {
      console.error('Error inserting images:', error);
      return;
    }

    console.log('Swimwear event images setup completed successfully');
  } catch (error) {
    console.error('Error setting up swimwear images:', error);
  }
}

setupSwimwearImages(); 