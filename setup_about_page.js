// @ts-check
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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

async function setupAboutPage() {
  try {
    // Read and execute the SQL file
    const sqlFile = readFileSync(join(__dirname, 'create_about_page_table.sql'), 'utf8');
    await supabase.rpc('create_about_page_table');

    // Insert initial content
    const { error: insertError } = await supabase
      .from('about_page_content')
      .insert([
        {
          title: "About Fashionistas Valentine's Event",
          description: "Join us for an unforgettable celebration of love and fashion",
          content: {
            mission: "To create an extraordinary Valentine's Day experience that combines the passion for fashion with the spirit of love and community.",
            vision: "To establish the most anticipated annual Valentine's fashion event that inspires, connects, and celebrates the intersection of love and style.",
            sections: [
              {
                title: "Event Overview",
                content: "The Fashionistas Valentine's Event is a unique celebration that brings together fashion enthusiasts, designers, and couples for an unforgettable Valentine's Day experience. Our event features exclusive fashion shows, interactive workshops, and romantic dining experiences."
              },
              {
                title: "What to Expect",
                content: "Immerse yourself in a day filled with cutting-edge fashion presentations, expert-led styling sessions, and opportunities to connect with fellow fashion lovers. From runway shows to intimate dining experiences, every moment is crafted to create lasting memories."
              },
              {
                title: "Special Features",
                content: "Discover our carefully curated selection of Valentine's-themed fashion collections, participate in couple's styling challenges, and enjoy romantic fine dining with your special someone. Special performances and surprise gifts await our guests."
              }
            ]
          },
          meta_description: "Experience the perfect blend of fashion and romance at our exclusive Valentine's Day event. Join us for runway shows, styling sessions, and romantic dining.",
          meta_keywords: ["fashion", "valentine's day", "event", "runway show", "romantic dining", "styling", "couples"]
        }
      ]);

    if (insertError) {
      console.error('Error inserting content:', insertError);
      return;
    }

    console.log('About Page content setup completed successfully');
  } catch (error) {
    console.error('Error setting up About Page:', error);
  }
}

setupAboutPage(); 