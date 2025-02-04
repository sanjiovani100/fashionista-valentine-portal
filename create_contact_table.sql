-- Function to create the contact form table
CREATE OR REPLACE FUNCTION create_contact_table()
RETURNS void AS $$
BEGIN
    -- Create the table if it doesn't exist
    CREATE TABLE IF NOT EXISTS contacts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'archived')),
        metadata JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- Create updated_at trigger
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$ language 'plpgsql';

    -- Drop trigger if exists
    DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;

    -- Create trigger
    CREATE TRIGGER update_contacts_updated_at
        BEFORE UPDATE ON contacts
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

    -- Enable Row Level Security
    ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

    -- Create policies
    DROP POLICY IF EXISTS "Allow public insert access" ON contacts;
    CREATE POLICY "Allow public insert access" 
        ON contacts FOR INSERT 
        WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow authenticated read access" ON contacts;
    CREATE POLICY "Allow authenticated read access" 
        ON contacts FOR SELECT 
        USING (auth.role() = 'authenticated');

    DROP POLICY IF EXISTS "Allow authenticated update access" ON contacts;
    CREATE POLICY "Allow authenticated update access" 
        ON contacts FOR UPDATE 
        USING (auth.role() = 'authenticated')
        WITH CHECK (auth.role() = 'authenticated');

    -- Create indexes
    CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
    CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
    CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
END;
$$ LANGUAGE plpgsql; 