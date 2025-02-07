// Add TextEncoder polyfill for tests
const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

import dotenv from 'dotenv';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { syncSchema } from '@/lib/database/sync-schema';
import type { Database } from '@/lib/database.types';
import { jest, beforeAll, afterAll } from '@jest/globals';

// Load test environment variables first
dotenv.config({ path: '.env.test' });

declare global {
  // eslint-disable-next-line no-var
  var testEventId: string;
  // eslint-disable-next-line no-var
  var mockSupabaseClient: SupabaseClient<Database>;
}

// Create Supabase client for tests
const supabase = createClient<Database>(
  'http://localhost:54321',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  }
);

// Test user constants
const TEST_USER_ID = '00000000-0000-0000-0000-000000000000';
const TEST_USER_EMAIL = 'test@example.com';
const TEST_USER_PASSWORD = 'testpassword123';

async function initializeTestDatabase() {
  try {
    // Sync database schema
    await syncSchema();

    // Wait for schema cache to update
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create test user
    const { data: user, error: userError } = await supabase.auth.admin.createUser({
      email: TEST_USER_EMAIL,
      password: TEST_USER_PASSWORD,
      email_confirm: true,
      user_metadata: {
        name: 'Test User'
      },
      id: TEST_USER_ID
    });

    if (userError) {
      console.error('Failed to create test user:', userError);
      throw userError;
    }

    // Create test event
    const { data: event, error: eventError } = await supabase
      .from('events')
      .insert({
        title: 'Test Event',
        description: 'Test Description',
        venue: 'Test Venue',
        capacity: 100,
        start_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        end_time: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
        registration_deadline: new Date(Date.now() + 43200000).toISOString(), // 12 hours from now
        theme: 'Test Theme',
        created_by: TEST_USER_ID
      })
      .select()
      .single();

    if (eventError) {
      console.error('Failed to create test event:', eventError);
      throw eventError;
    }

    return { user, event };
  } catch (error) {
    console.error('Test database initialization failed:', error);
    throw error;
  }
}

async function cleanupTestData() {
  try {
    // Delete test event
    await supabase
      .from('events')
      .delete()
      .eq('created_by', TEST_USER_ID);

    // Delete test user
    await supabase.auth.admin.deleteUser(TEST_USER_ID);

  } catch (error) {
    console.error('Test data cleanup failed:', error);
    throw error;
  }
}

// Jest hooks
beforeAll(async () => {
  await initializeTestDatabase();
});

afterAll(async () => {
  await cleanupTestData();
});

// Export for use in tests
export {
  supabase,
  TEST_USER_ID,
  TEST_USER_EMAIL,
  TEST_USER_PASSWORD
};

// Mock Supabase client for unit tests
const mockClient = {
  from: jest.fn(),
  rpc: jest.fn(),
  auth: {
    signIn: jest.fn(),
    signOut: jest.fn(),
    getUser: jest.fn(),
    admin: {
      deleteUser: jest.fn()
    }
  }
} as unknown as SupabaseClient<Database>;

global.mockSupabaseClient = mockClient; 