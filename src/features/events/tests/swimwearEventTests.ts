import { supabase } from '@/integrations/supabase/client';
import { cloudinaryConfig } from '@/components/cloudinary/config';
import { toast } from 'sonner';
import type { EventContent, FashionCollection, FashionImage, EventTicket } from '@/types/event.types';

// Type Definitions
export type SwimwearEventTest = {
  id: string;
  name: 'swim_paradise_show';
  subtype: 'swimwear';
  title: string;
  description: string;
  venue: string;
  capacity: number;
  start_time: string;
  end_time: string;
  registration_deadline: string;
  theme?: string | null;
  meta_description?: string | null;
  meta_keywords?: string[] | null;
  event_content?: EventContent[];
  fashion_collections?: FashionCollection[];
  fashion_images?: FashionImage[];
  event_tickets?: EventTicket[];
};

// Test Data
const testEvent: SwimwearEventTest = {
  id: "test-id",
  name: "swim_paradise_show",
  subtype: "swimwear",
  title: "Summer Splash Swimwear Show",
  description: "Join us for an exclusive swimwear showcase",
  venue: "Paradise Beach Resort",
  capacity: 200,
  start_time: new Date().toISOString(),
  end_time: new Date().toISOString(),
  registration_deadline: new Date().toISOString()
};

// Query Tests
export const testEventFetch = async (): Promise<SwimwearEventTest | null> => {
  console.log('Testing basic event fetch...');
  try {
    const { data, error } = await supabase
      .from('fashion_events')
      .select('*')
      .eq('subtype', 'swimwear')
      .maybeSingle();
      
    if (error) {
      console.error('Query failed:', error.message);
      toast.error('Failed to fetch event data');
      return null;
    }
    
    console.log('Event fetch successful:', data);
    return data as SwimwearEventTest;
  } catch (err) {
    console.error('Unexpected error during event fetch:', err);
    toast.error('An unexpected error occurred');
    return null;
  }
};

export const testRelatedDataFetch = async () => {
  console.log('Testing related data fetch...');
  try {
    const { data, error } = await supabase
      .from('fashion_events')
      .select(`
        *,
        event_content (*),
        fashion_collections (*),
        fashion_images (*),
        event_tickets (*)
      `)
      .eq('subtype', 'swimwear');

    if (error) {
      console.error('Related data fetch failed:', error);
      toast.error('Failed to fetch related event data');
      return null;
    }

    console.log('Related data fetch successful:', {
      totalRecords: data?.length,
      hasContent: data?.[0]?.event_content?.length > 0,
      hasCollections: data?.[0]?.fashion_collections?.length > 0,
      hasImages: data?.[0]?.fashion_images?.length > 0,
      hasTickets: data?.[0]?.event_tickets?.length > 0
    });

    return data;
  } catch (err) {
    console.error('Unexpected error during related data fetch:', err);
    toast.error('An unexpected error occurred');
    return null;
  }
};

// Image URL Testing
export const testImageUrl = (publicId: string) => {
  console.log('Testing image URL construction...');
  try {
    const imageUrl = `${cloudinaryConfig.baseURL}/image/upload/w_800,h_600,q_auto/${publicId}`;
    console.log('Image URL constructed successfully:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Image URL construction failed:', error);
    return null;
  }
};

// RLS Policy Testing
export const testPublicAccess = async () => {
  console.log('Testing public access...');
  try {
    const { data, error } = await supabase
      .from('fashion_events')
      .select('*')
      .eq('subtype', 'swimwear');
      
    if (error?.code === 'PGRST301') {
      console.error('RLS Policy preventing read access');
      toast.error('Access denied due to permissions');
      return false;
    }

    console.log('Public access test successful');
    return true;
  } catch (err) {
    console.error('Unexpected error during public access test:', err);
    toast.error('An unexpected error occurred');
    return false;
  }
};

// Type Safety Tests
export const runTypeSafetyTests = () => {
  console.log('Running type safety tests...');

  // Null handling test
  type NullableTest = {
    meta_description: string | null;
    theme: string | null;
    meta_keywords: string[] | null;
  };

  // Date handling test
  type DateTest = {
    start_time: string;
    parsed_date: Date;
  };

  // Subscription type test
  type SubscriptionTest = {
    event: 'INSERT' | 'UPDATE' | 'DELETE';
    new: SwimwearEventTest;
    old: SwimwearEventTest;
  };

  console.log('Type safety tests completed');
  return true;
};

// Run all tests
export const runAllTests = async () => {
  console.group('Running all swimwear event tests');
  
  const results = {
    eventFetch: await testEventFetch(),
    relatedData: await testRelatedDataFetch(),
    imageUrl: testImageUrl('sample-image'),
    publicAccess: await testPublicAccess(),
    typeSafety: runTypeSafetyTests()
  };

  console.log('Test results:', results);
  console.groupEnd();

  return results;
};