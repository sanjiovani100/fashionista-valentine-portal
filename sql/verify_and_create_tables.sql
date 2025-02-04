-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create or update ENUM types
DO $$ BEGIN
    CREATE TYPE sponsor_status AS ENUM ('pending', 'approved', 'rejected', 'active');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE application_status AS ENUM ('draft', 'submitted', 'under_review', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE sponsorship_tier AS ENUM ('bronze', 'silver', 'gold', 'platinum', 'custom');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create or update trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create sponsors table if it doesn't exist
CREATE TABLE IF NOT EXISTS sponsors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    website_url TEXT,
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL CHECK (contact_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    contact_phone TEXT,
    logo_url TEXT,
    description TEXT,
    status sponsor_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sponsor_applications table if it doesn't exist
CREATE TABLE IF NOT EXISTS sponsor_applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
    event_id UUID NOT NULL,
    package_id UUID NOT NULL,
    status application_status DEFAULT 'draft',
    submitted_at TIMESTAMP WITH TIME ZONE,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewer_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES fashion_events(id),
    CONSTRAINT fk_package FOREIGN KEY (package_id) REFERENCES sponsorship_packages(id)
);

-- Create sponsorship_preferences table if it doesn't exist
CREATE TABLE IF NOT EXISTS sponsorship_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
    preferred_tier sponsorship_tier NOT NULL,
    budget_range TEXT,
    primary_goals TEXT[],
    brand_representation TEXT[],
    target_audience TEXT[],
    additional_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sponsorship_packages table if it doesn't exist
CREATE TABLE IF NOT EXISTS sponsorship_packages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    level sponsorship_tier NOT NULL,
    price DECIMAL NOT NULL CHECK (price >= 0),
    description TEXT,
    benefits JSONB,
    max_sponsors INTEGER CHECK (max_sponsors > 0),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add triggers for updated_at columns
DROP TRIGGER IF EXISTS update_sponsors_updated_at ON sponsors;
CREATE TRIGGER update_sponsors_updated_at
    BEFORE UPDATE ON sponsors
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_sponsor_applications_updated_at ON sponsor_applications;
CREATE TRIGGER update_sponsor_applications_updated_at
    BEFORE UPDATE ON sponsor_applications
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_sponsorship_preferences_updated_at ON sponsorship_preferences;
CREATE TRIGGER update_sponsorship_preferences_updated_at
    BEFORE UPDATE ON sponsorship_preferences
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_sponsorship_packages_updated_at ON sponsorship_packages;
CREATE TRIGGER update_sponsorship_packages_updated_at
    BEFORE UPDATE ON sponsorship_packages
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_sponsors_status ON sponsors(status);
CREATE INDEX IF NOT EXISTS idx_sponsor_applications_status ON sponsor_applications(status);
CREATE INDEX IF NOT EXISTS idx_sponsor_applications_event ON sponsor_applications(event_id);
CREATE INDEX IF NOT EXISTS idx_sponsorship_preferences_tier ON sponsorship_preferences(preferred_tier);
CREATE INDEX IF NOT EXISTS idx_sponsorship_packages_level ON sponsorship_packages(level);
CREATE INDEX IF NOT EXISTS idx_sponsorship_packages_active ON sponsorship_packages(is_active);

-- Insert default sponsorship packages if they don't exist
INSERT INTO sponsorship_packages (name, level, price, description, benefits, max_sponsors)
VALUES
    ('Bronze Package', 'bronze', 1000.00, 'Basic sponsorship package', 
     '{"benefits": ["Logo on website", "Social media mention", "Standard booth"]}', 10),
    ('Silver Package', 'silver', 2500.00, 'Enhanced sponsorship package', 
     '{"benefits": ["Logo on website", "Social media campaign", "Premium booth", "Workshop slot"]}', 5),
    ('Gold Package', 'gold', 5000.00, 'Premium sponsorship package', 
     '{"benefits": ["Logo on website", "Dedicated social campaign", "Premium booth", "Speaking slot", "VIP passes"]}', 3),
    ('Platinum Package', 'platinum', 10000.00, 'Elite sponsorship package', 
     '{"benefits": ["Logo on website", "Custom social campaign", "Premium booth", "Keynote slot", "VIP access"]}', 1)
ON CONFLICT (name) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorship_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorship_packages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public read access to active sponsorship packages"
ON sponsorship_packages FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "Authenticated users can view their own sponsor data"
ON sponsors FOR SELECT
TO authenticated
USING (id::text = auth.uid()::text);

CREATE POLICY "Authenticated users can update their own sponsor data"
ON sponsors FOR UPDATE
TO authenticated
USING (id::text = auth.uid()::text);

CREATE POLICY "Authenticated users can view their own applications"
ON sponsor_applications FOR SELECT
TO authenticated
USING (sponsor_id IN (
    SELECT id FROM sponsors WHERE auth.uid()::text = id::text
));

CREATE POLICY "Authenticated users can view their own preferences"
ON sponsorship_preferences FOR SELECT
TO authenticated
USING (sponsor_id IN (
    SELECT id FROM sponsors WHERE auth.uid()::text = id::text
)); 