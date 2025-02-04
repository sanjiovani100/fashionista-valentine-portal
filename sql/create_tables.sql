-- Create enum types if they don't exist
DO $$ BEGIN
    CREATE TYPE sponsor_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE benefit_status AS ENUM ('pending', 'fulfilled', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create sponsorship_packages table
CREATE TABLE IF NOT EXISTS sponsorship_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  level TEXT NOT NULL,
  price DECIMAL NOT NULL,
  description TEXT,
  benefits JSONB[],
  max_sponsors INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sponsors table
CREATE TABLE IF NOT EXISTS sponsors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  website_url TEXT,
  logo_url TEXT,
  description TEXT,
  sponsorship_level TEXT,
  sponsorship_amount DECIMAL,
  status sponsor_status DEFAULT 'pending',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sponsor_contacts table
CREATE TABLE IF NOT EXISTS sponsor_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_id UUID REFERENCES sponsors(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  position TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT sponsor_contacts_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
);

-- Create sponsorship_benefits table
CREATE TABLE IF NOT EXISTS sponsorship_benefits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_id UUID REFERENCES sponsors(id),
  package_id UUID REFERENCES sponsorship_packages(id),
  benefit_name TEXT NOT NULL,
  benefit_description TEXT,
  status benefit_status DEFAULT 'pending',
  fulfillment_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sponsor_payments table
CREATE TABLE IF NOT EXISTS sponsor_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_id UUID REFERENCES sponsors(id),
  package_id UUID REFERENCES sponsorship_packages(id),
  amount DECIMAL NOT NULL,
  payment_method TEXT,
  status payment_status DEFAULT 'pending',
  transaction_id TEXT,
  payment_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sponsor_documents table
CREATE TABLE IF NOT EXISTS sponsor_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_id UUID REFERENCES sponsors(id),
  document_type TEXT NOT NULL,
  document_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  is_verified BOOLEAN DEFAULT false,
  verification_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sponsor_activities table
CREATE TABLE IF NOT EXISTS sponsor_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_id UUID REFERENCES sponsors(id),
  activity_type TEXT NOT NULL,
  description TEXT,
  performed_by UUID REFERENCES auth.users(id),
  performed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
DROP TRIGGER IF EXISTS update_sponsors_timestamp ON sponsors;
CREATE TRIGGER update_sponsors_timestamp
  BEFORE UPDATE ON sponsors
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS update_sponsor_contacts_timestamp ON sponsor_contacts;
CREATE TRIGGER update_sponsor_contacts_timestamp
  BEFORE UPDATE ON sponsor_contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS update_sponsorship_packages_timestamp ON sponsorship_packages;
CREATE TRIGGER update_sponsorship_packages_timestamp
  BEFORE UPDATE ON sponsorship_packages
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS update_sponsorship_benefits_timestamp ON sponsorship_benefits;
CREATE TRIGGER update_sponsorship_benefits_timestamp
  BEFORE UPDATE ON sponsorship_benefits
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS update_sponsor_payments_timestamp ON sponsor_payments;
CREATE TRIGGER update_sponsor_payments_timestamp
  BEFORE UPDATE ON sponsor_payments
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS update_sponsor_documents_timestamp ON sponsor_documents;
CREATE TRIGGER update_sponsor_documents_timestamp
  BEFORE UPDATE ON sponsor_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS update_sponsor_activities_timestamp ON sponsor_activities;
CREATE TRIGGER update_sponsor_activities_timestamp
  BEFORE UPDATE ON sponsor_activities
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp(); 