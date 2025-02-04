import { Migration } from '../utils/database/migrations';

const migration: Migration = {
  id: '01HNK8QJGX0YFPZ5MWBR3T9D4E',
  name: 'initial_setup',
  description: 'Initial database setup with core tables',
  dependencies: [],
  sql: `
    -- Create extension for UUID generation
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- Create models table
    CREATE TABLE IF NOT EXISTS models (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'),
      phone TEXT CHECK (phone ~* '^\\+?[1-9][0-9]{7,14}$'),
      height INTEGER CHECK (height BETWEEN 140 AND 200),
      bust INTEGER CHECK (bust BETWEEN 70 AND 130),
      waist INTEGER CHECK (waist BETWEEN 50 AND 100),
      hips INTEGER CHECK (hips BETWEEN 70 AND 130),
      shoe_size INTEGER CHECK (shoe_size BETWEEN 35 AND 45),
      portfolio_url TEXT CHECK (portfolio_url ~* '^https?://.*$'),
      instagram_handle TEXT,
      experience_years INTEGER CHECK (experience_years >= 0),
      availability BOOLEAN DEFAULT true,
      meta_data JSONB DEFAULT '{}' CHECK (jsonb_typeof(meta_data) = 'object'),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      created_by UUID REFERENCES auth.users(id),
      updated_by UUID REFERENCES auth.users(id)
    );

    -- Create events table
    CREATE TABLE IF NOT EXISTS events (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title TEXT NOT NULL,
      description TEXT,
      start_date TIMESTAMPTZ NOT NULL,
      end_date TIMESTAMPTZ NOT NULL CHECK (end_date > start_date),
      venue JSONB NOT NULL CHECK (jsonb_typeof(venue) = 'object'),
      capacity INTEGER CHECK (capacity > 0),
      status TEXT CHECK (status IN ('active', 'inactive', 'pending', 'archived')),
      registration_deadline TIMESTAMPTZ,
      meta_data JSONB DEFAULT '{}' CHECK (jsonb_typeof(meta_data) = 'object'),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      created_by UUID REFERENCES auth.users(id),
      updated_by UUID REFERENCES auth.users(id)
    );

    -- Create model_applications table
    CREATE TABLE IF NOT EXISTS model_applications (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      model_id UUID REFERENCES models(id) ON DELETE CASCADE,
      event_id UUID REFERENCES events(id) ON DELETE CASCADE,
      status TEXT CHECK (status IN ('active', 'inactive', 'pending', 'archived')),
      notes TEXT,
      requirements_met BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      created_by UUID REFERENCES auth.users(id),
      updated_by UUID REFERENCES auth.users(id),
      CONSTRAINT unique_model_event UNIQUE (model_id, event_id)
    );

    -- Create indexes
    CREATE INDEX IF NOT EXISTS idx_models_name ON models(first_name, last_name);
    CREATE INDEX IF NOT EXISTS idx_models_email ON models(email);
    CREATE INDEX IF NOT EXISTS idx_models_measurements ON models(height, bust, waist, hips);
    CREATE INDEX IF NOT EXISTS idx_models_meta ON models USING gin(meta_data);

    CREATE INDEX IF NOT EXISTS idx_events_dates ON events(start_date, end_date);
    CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
    CREATE INDEX IF NOT EXISTS idx_events_meta ON events USING gin(meta_data);

    CREATE INDEX IF NOT EXISTS idx_applications_model ON model_applications(model_id);
    CREATE INDEX IF NOT EXISTS idx_applications_event ON model_applications(event_id);
    CREATE INDEX IF NOT EXISTS idx_applications_status ON model_applications(status);

    -- Create update_timestamp trigger
    CREATE OR REPLACE FUNCTION update_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      NEW.updated_by = auth.uid();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER update_models_timestamp
      BEFORE UPDATE ON models
      FOR EACH ROW
      EXECUTE FUNCTION update_timestamp();

    CREATE TRIGGER update_events_timestamp
      BEFORE UPDATE ON events
      FOR EACH ROW
      EXECUTE FUNCTION update_timestamp();

    CREATE TRIGGER update_applications_timestamp
      BEFORE UPDATE ON model_applications
      FOR EACH ROW
      EXECUTE FUNCTION update_timestamp();

    -- Enable Row Level Security
    ALTER TABLE models ENABLE ROW LEVEL SECURITY;
    ALTER TABLE events ENABLE ROW LEVEL SECURITY;
    ALTER TABLE model_applications ENABLE ROW LEVEL SECURITY;

    -- Create RLS Policies
    CREATE POLICY "Users can view active models"
      ON models FOR SELECT
      USING (status = 'active');
    
    CREATE POLICY "Users can update their own profile"
      ON models FOR UPDATE
      USING (auth.uid() = created_by);

    CREATE POLICY "Models can view their own applications"
      ON model_applications FOR SELECT
      USING (auth.uid() IN (
        SELECT created_by FROM models WHERE id = model_id
      ));
      
    CREATE POLICY "Models can create applications"
      ON model_applications FOR INSERT
      WITH CHECK (auth.uid() IN (
        SELECT created_by FROM models WHERE id = model_id
      ));

    CREATE POLICY "Anyone can view active events"
      ON events FOR SELECT
      USING (status = 'active');
      
    CREATE POLICY "Admins can manage events"
      ON events FOR ALL
      USING (auth.uid() IN (
        SELECT id FROM auth.users WHERE role = 'admin'
      ));

    -- ROLLBACK: 
    -- DROP TRIGGER IF EXISTS update_applications_timestamp ON model_applications;
    -- DROP TRIGGER IF EXISTS update_events_timestamp ON events;
    -- DROP TRIGGER IF EXISTS update_models_timestamp ON models;
    -- DROP FUNCTION IF EXISTS update_timestamp;
    -- DROP TABLE IF EXISTS model_applications;
    -- DROP TABLE IF EXISTS events;
    -- DROP TABLE IF EXISTS models;
  `,
};

export default migration; 