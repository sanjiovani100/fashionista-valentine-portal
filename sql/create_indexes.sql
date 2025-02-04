-- Performance Indexes

-- Sponsor Payments Indexes
CREATE INDEX IF NOT EXISTS idx_sponsor_payments_status 
ON sponsor_payments(status);

CREATE INDEX IF NOT EXISTS idx_sponsor_payments_date 
ON sponsor_payments(payment_date);

CREATE INDEX IF NOT EXISTS idx_sponsor_payments_sponsor_date 
ON sponsor_payments(sponsor_id, payment_date);

-- Sponsor Documents Indexes
CREATE INDEX IF NOT EXISTS idx_sponsor_documents_type 
ON sponsor_documents(document_type);

CREATE INDEX IF NOT EXISTS idx_sponsor_documents_verified 
ON sponsor_documents(is_verified);

CREATE INDEX IF NOT EXISTS idx_sponsor_documents_sponsor_type 
ON sponsor_documents(sponsor_id, document_type);

-- Sponsor Activities Indexes
CREATE INDEX IF NOT EXISTS idx_sponsor_activities_type 
ON sponsor_activities(activity_type);

CREATE INDEX IF NOT EXISTS idx_sponsor_activities_date 
ON sponsor_activities(performed_at);

CREATE INDEX IF NOT EXISTS idx_sponsor_activities_sponsor_date 
ON sponsor_activities(sponsor_id, performed_at);

-- Additional Constraints

-- Drop existing constraints if they exist
DO $$ BEGIN
  ALTER TABLE sponsor_payments DROP CONSTRAINT IF EXISTS positive_payment_amount;
  ALTER TABLE sponsor_documents DROP CONSTRAINT IF EXISTS valid_mime_types;
  ALTER TABLE sponsor_activities DROP CONSTRAINT IF EXISTS valid_activity_types;
EXCEPTION
  WHEN undefined_table THEN null;
END $$;

-- Add/update constraints
ALTER TABLE sponsor_payments 
ADD CONSTRAINT positive_payment_amount 
CHECK (amount > 0);

ALTER TABLE sponsor_documents 
ADD CONSTRAINT valid_mime_types 
CHECK (mime_type IN (
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
));

ALTER TABLE sponsor_activities 
ADD CONSTRAINT valid_activity_types 
CHECK (activity_type IN (
  'payment_created',
  'payment_updated',
  'payment_status_updated',
  'document_uploaded',
  'document_verified',
  'status_changed',
  'contact_updated',
  'benefit_updated',
  'sponsor_created',
  'sponsor_updated',
  'sponsor_deleted'
)); 