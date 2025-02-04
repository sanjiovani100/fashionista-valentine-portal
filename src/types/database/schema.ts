/**
 * Standard column definitions for all tables
 */
export const StandardColumns = {
  id: 'uuid DEFAULT uuid_generate_v4() PRIMARY KEY',
  created_at: 'timestamptz DEFAULT now()',
  updated_at: 'timestamptz DEFAULT now()',
  created_by: 'uuid REFERENCES auth.users(id)',
  updated_by: 'uuid REFERENCES auth.users(id)',
} as const;

/**
 * Common column types with validation
 */
export const CommonTypes = {
  email: "text CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')",
  phone: "text CHECK (phone ~* '^\\+?[1-9][0-9]{7,14}$')",
  url: "text CHECK (url ~* '^https?://.*$')",
  price: 'decimal(10,2) CHECK (price >= 0)',
  status: "text CHECK (status IN ('active', 'inactive', 'pending', 'archived'))",
} as const;

/**
 * Table schema type
 */
export type TableSchema = Record<string, string>;

/**
 * Table schemas with proper constraints and relationships
 */
export const TableSchemas: Record<string, TableSchema> = {
  models: {
    ...StandardColumns,
    first_name: 'text NOT NULL',
    last_name: 'text NOT NULL',
    email: CommonTypes.email,
    phone: CommonTypes.phone,
    height: 'integer CHECK (height BETWEEN 140 AND 200)',
    bust: 'integer CHECK (bust BETWEEN 70 AND 130)',
    waist: 'integer CHECK (waist BETWEEN 50 AND 100)',
    hips: 'integer CHECK (hips BETWEEN 70 AND 130)',
    shoe_size: 'integer CHECK (shoe_size BETWEEN 35 AND 45)',
    portfolio_url: CommonTypes.url,
    instagram_handle: 'text',
    experience_years: 'integer CHECK (experience_years >= 0)',
    availability: 'boolean DEFAULT true',
    meta_data: 'jsonb DEFAULT \'{}\' CHECK (jsonb_typeof(meta_data) = \'object\')',
  },

  model_applications: {
    ...StandardColumns,
    model_id: 'uuid REFERENCES models(id) ON DELETE CASCADE',
    event_id: 'uuid REFERENCES events(id) ON DELETE CASCADE',
    status: CommonTypes.status,
    notes: 'text',
    requirements_met: 'boolean DEFAULT false',
  },

  events: {
    ...StandardColumns,
    title: 'text NOT NULL',
    description: 'text',
    start_date: 'timestamptz NOT NULL',
    end_date: 'timestamptz NOT NULL CHECK (end_date > start_date)',
    venue: 'jsonb NOT NULL CHECK (jsonb_typeof(venue) = \'object\')',
    capacity: 'integer CHECK (capacity > 0)',
    status: CommonTypes.status,
    registration_deadline: 'timestamptz',
    meta_data: 'jsonb DEFAULT \'{}\' CHECK (jsonb_typeof(meta_data) = \'object\')',
  },
};

/**
 * Additional constraints to be applied after table creation
 */
export const TableConstraints: Record<string, string[]> = {
  model_applications: [
    'ALTER TABLE model_applications ADD CONSTRAINT unique_model_event UNIQUE (model_id, event_id)',
  ],
};

/**
 * Index definitions for performance optimization
 */
export const TableIndexes: Record<string, string[]> = {
  models: [
    'CREATE INDEX IF NOT EXISTS idx_models_name ON models(first_name, last_name)',
    'CREATE INDEX IF NOT EXISTS idx_models_email ON models(email)',
    'CREATE INDEX IF NOT EXISTS idx_models_measurements ON models(height, bust, waist, hips)',
    'CREATE INDEX IF NOT EXISTS idx_models_meta ON models USING gin(meta_data)',
  ],
  model_applications: [
    'CREATE INDEX IF NOT EXISTS idx_applications_model ON model_applications(model_id)',
    'CREATE INDEX IF NOT EXISTS idx_applications_event ON model_applications(event_id)',
    'CREATE INDEX IF NOT EXISTS idx_applications_status ON model_applications(status)',
  ],
  events: [
    'CREATE INDEX IF NOT EXISTS idx_events_dates ON events(start_date, end_date)',
    'CREATE INDEX IF NOT EXISTS idx_events_status ON events(status)',
    'CREATE INDEX IF NOT EXISTS idx_events_meta ON events USING gin(meta_data)',
  ],
};

/**
 * RLS Policies for security
 */
export const RLSPolicies: Record<string, string[]> = {
  models: [
    `CREATE POLICY "Users can view active models"
     ON models FOR SELECT
     USING (status = 'active')`,
    
    `CREATE POLICY "Users can update their own profile"
     ON models FOR UPDATE
     USING (auth.uid() = created_by)`,
  ],
  model_applications: [
    `CREATE POLICY "Models can view their own applications"
     ON model_applications FOR SELECT
     USING (auth.uid() IN (
       SELECT created_by FROM models WHERE id = model_id
     ))`,
     
    `CREATE POLICY "Models can create applications"
     ON model_applications FOR INSERT
     WITH CHECK (auth.uid() IN (
       SELECT created_by FROM models WHERE id = model_id
     ))`,
  ],
  events: [
    `CREATE POLICY "Anyone can view active events"
     ON events FOR SELECT
     USING (status = 'active')`,
     
    `CREATE POLICY "Admins can manage events"
     ON events FOR ALL
     USING (auth.uid() IN (
       SELECT id FROM auth.users WHERE role = 'admin'
     ))`,
  ],
};

/**
 * Triggers for maintaining data integrity
 */
export const Triggers: Record<string, string> = {
  update_timestamp: `
    CREATE OR REPLACE FUNCTION update_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      NEW.updated_by = auth.uid();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `,
  
  model_measurements_validation: `
    CREATE OR REPLACE FUNCTION validate_model_measurements()
    RETURNS TRIGGER AS $$
    BEGIN
      IF NEW.height < 140 OR NEW.height > 200 THEN
        RAISE EXCEPTION 'Height must be between 140 and 200 cm';
      END IF;
      -- Add other measurement validations
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `,
}; 