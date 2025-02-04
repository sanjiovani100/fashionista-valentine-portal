-- Function to create the about page content table
CREATE OR REPLACE FUNCTION create_about_page_table()
RETURNS void AS $$
BEGIN
    -- Create the table if it doesn't exist
    CREATE TABLE IF NOT EXISTS about_page_content (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT,
        content JSONB NOT NULL,
        meta_description TEXT,
        meta_keywords TEXT[],
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
    DROP TRIGGER IF EXISTS update_about_page_content_updated_at ON about_page_content;

    -- Create trigger
    CREATE TRIGGER update_about_page_content_updated_at
        BEFORE UPDATE ON about_page_content
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

    -- Enable Row Level Security
    ALTER TABLE about_page_content ENABLE ROW LEVEL SECURITY;

    -- Create policies
    DROP POLICY IF EXISTS "Allow public read access" ON about_page_content;
    CREATE POLICY "Allow public read access" 
        ON about_page_content FOR SELECT 
        USING (true);

    DROP POLICY IF EXISTS "Allow authenticated insert" ON about_page_content;
    CREATE POLICY "Allow authenticated insert" 
        ON about_page_content FOR INSERT 
        WITH CHECK (auth.role() = 'authenticated');

    DROP POLICY IF EXISTS "Allow authenticated update" ON about_page_content;
    CREATE POLICY "Allow authenticated update" 
        ON about_page_content FOR UPDATE 
        USING (auth.role() = 'authenticated')
        WITH CHECK (auth.role() = 'authenticated');
END;
$$ LANGUAGE plpgsql; 