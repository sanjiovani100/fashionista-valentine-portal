-- Create Payment Tracking System
CREATE TABLE IF NOT EXISTS sponsor_payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
    sponsorship_tier_id UUID REFERENCES sponsorship_tiers(id),
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
    payment_method TEXT,
    invoice_number TEXT UNIQUE,
    due_date TIMESTAMP WITH TIME ZONE,
    paid_date TIMESTAMP WITH TIME ZONE
);

-- Create indexes for payments
CREATE INDEX IF NOT EXISTS idx_sponsor_payments_status ON sponsor_payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_sponsor_payments_sponsor ON sponsor_payments(sponsor_id);

-- Enable RLS for payments
ALTER TABLE sponsor_payments ENABLE ROW LEVEL SECURITY;

-- Create policies for payments
CREATE POLICY sponsor_payments_select_policy ON sponsor_payments
    FOR SELECT
    USING (auth.uid() IN (
        SELECT id FROM sponsors WHERE id = sponsor_id
    ));

CREATE POLICY sponsor_payments_insert_policy ON sponsor_payments
    FOR INSERT
    WITH CHECK (auth.uid() IN (
        SELECT id FROM sponsors WHERE id = sponsor_id
    ));

-- Create Document Management System
CREATE TABLE IF NOT EXISTS sponsor_documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL CHECK (document_type IN ('contract', 'logo', 'brand_guidelines', 'marketing_material')),
    file_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'pending_review')),
    version INTEGER DEFAULT 1
);

-- Create indexes for documents
CREATE INDEX IF NOT EXISTS idx_sponsor_documents_type ON sponsor_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_sponsor_documents_sponsor ON sponsor_documents(sponsor_id);

-- Enable RLS for documents
ALTER TABLE sponsor_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for documents
CREATE POLICY sponsor_documents_select_policy ON sponsor_documents
    FOR SELECT
    USING (auth.uid() IN (
        SELECT id FROM sponsors WHERE id = sponsor_id
    ));

CREATE POLICY sponsor_documents_insert_policy ON sponsor_documents
    FOR INSERT
    WITH CHECK (auth.uid() IN (
        SELECT id FROM sponsors WHERE id = sponsor_id
    ));

-- Create Contact Management System
CREATE TABLE IF NOT EXISTS sponsor_contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    role TEXT,
    is_primary BOOLEAN DEFAULT false,
    UNIQUE(sponsor_id, email)
);

-- Create indexes for contacts
CREATE INDEX IF NOT EXISTS idx_sponsor_contacts_email ON sponsor_contacts(email);
CREATE INDEX IF NOT EXISTS idx_sponsor_contacts_sponsor ON sponsor_contacts(sponsor_id);

-- Enable RLS for contacts
ALTER TABLE sponsor_contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for contacts
CREATE POLICY sponsor_contacts_select_policy ON sponsor_contacts
    FOR SELECT
    USING (auth.uid() IN (
        SELECT id FROM sponsors WHERE id = sponsor_id
    ));

CREATE POLICY sponsor_contacts_insert_policy ON sponsor_contacts
    FOR INSERT
    WITH CHECK (auth.uid() IN (
        SELECT id FROM sponsors WHERE id = sponsor_id
    )); 