import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const supabase = createClient(
  'https://dssddsgypklubzkshkxo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzc2Rkc2d5cGtsdWJ6a3Noa3hvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzgwOTI2MSwiZXhwIjoyMDUzMzg1MjYxfQ.v7qeA8JHxte1nMpTKvzC4DmKmLdafboQb5WOC8emSv8'
);

async function testAboutPageContent() {
  try {
    console.log('Testing Supabase connection...');
    
    // Try to query the content
    const { data: content, error: contentError } = await supabase
      .from('about_page_content')
      .select('*');
    
    if (contentError) {
      console.error('Error fetching content:', contentError);
      return;
    }
    
    console.log('Content found:', JSON.stringify(content, null, 2));
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testAboutPageContent(); 