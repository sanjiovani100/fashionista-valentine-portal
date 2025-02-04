-- Create base sponsors table if it doesn't exist
CREATE TABLE IF NOT EXISTS sponsors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    company_name TEXT NOT NULL,
    industry TEXT,
    website_url TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'rejected')),
    notes TEXT
);

-- Create sponsorship tiers table if it doesn't exist
CREATE TABLE IF NOT EXISTS sponsorship_tiers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    benefits JSONB,
    max_slots INTEGER,
    is_active BOOLEAN DEFAULT true
);

-- Create indexes for base tables
CREATE INDEX IF NOT EXISTS idx_sponsors_status ON sponsors(status);
CREATE INDEX IF NOT EXISTS idx_sponsorship_tiers_active ON sponsorship_tiers(is_active);

-- Enable RLS for base tables
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorship_tiers ENABLE ROW LEVEL SECURITY;

-- Create policies for sponsors
CREATE POLICY sponsors_select_policy ON sponsors
    FOR SELECT
    USING (true);  -- Allow all authenticated users to view sponsors

CREATE POLICY sponsors_insert_policy ON sponsors
    FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);  -- Allow authenticated users to insert

-- Create policies for sponsorship tiers
CREATE POLICY sponsorship_tiers_select_policy ON sponsorship_tiers
    FOR SELECT
    USING (true);  -- Allow all authenticated users to view tiers

-- Insert default sponsorship tiers
INSERT INTO sponsorship_tiers (name, description, price, benefits, max_slots)
VALUES
    ('Bronze', 'Basic sponsorship package', 1000.00, '{"benefits": ["Logo on website", "Social media mention"]}', 10),
    ('Silver', 'Enhanced sponsorship package', 2500.00, '{"benefits": ["Logo on website", "Social media campaign", "Event booth"]}', 5),
    ('Gold', 'Premium sponsorship package', 5000.00, '{"benefits": ["Logo on website", "Social media campaign", "Premium booth", "Speaking slot"]}', 3),
    ('Platinum', 'Elite sponsorship package', 10000.00, '{"benefits": ["Logo on website", "Custom social campaign", "Premium booth", "Keynote slot", "VIP access"]}', 1)
ON CONFLICT (name) DO NOTHING; 