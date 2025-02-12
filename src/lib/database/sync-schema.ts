import { supabase } from '@/lib/supabase/config';

export async function syncSchema() {
  try {
    // Drop and recreate the events table to ensure correct structure
    const { error: dropError } = await supabase.rpc('exec_sql', {
      sql: `
        DROP TABLE IF EXISTS events CASCADE;
        
        CREATE TABLE events (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW(),
          created_by UUID REFERENCES auth.users(id),
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          venue TEXT NOT NULL,
          capacity INTEGER NOT NULL DEFAULT 100,
          start_time TIMESTAMPTZ NOT NULL,
          end_time TIMESTAMPTZ NOT NULL,
          registration_deadline TIMESTAMPTZ NOT NULL,
          theme TEXT NOT NULL,
          status TEXT DEFAULT 'draft',
          meta_description TEXT,
          meta_keywords TEXT[],
          venue_features JSONB DEFAULT '{}'::jsonb,
          event_highlights JSONB DEFAULT '{}'::jsonb,
          CONSTRAINT events_dates_check CHECK (
            end_time > start_time AND 
            registration_deadline <= start_time
          )
        );

        -- Create indexes
        CREATE INDEX idx_events_dates ON events(start_time, end_time);
        CREATE INDEX idx_events_capacity ON events(capacity);
        CREATE INDEX idx_events_venue ON events(venue);
        CREATE INDEX idx_events_created_by ON events(created_by);
        CREATE INDEX idx_events_status ON events(status);
        CREATE INDEX idx_events_registration ON events(registration_deadline);

        -- Create trigger for updated_at
        CREATE OR REPLACE FUNCTION update_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER set_updated_at
          BEFORE UPDATE ON events
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at();
      `
    });

    if (dropError) {
      console.error('Failed to sync schema:', dropError);
      throw dropError;
    }

    // Force a schema cache refresh by selecting from the table
    const { error: refreshError } = await supabase
      .from('events')
      .select('id')
      .limit(1);

    if (refreshError) {
      console.error('Failed to refresh schema cache:', refreshError);
      throw refreshError;
    }

    // Wait longer for cache to update
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('Schema synchronization completed successfully');
  } catch (error) {
    console.error('Schema synchronization failed:', error);
    throw error;
  }
} 


