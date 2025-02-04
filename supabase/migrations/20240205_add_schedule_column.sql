-- Add schedule column to fashion_events table
ALTER TABLE fashion_events
ADD COLUMN IF NOT EXISTS schedule JSONB DEFAULT '[]'::jsonb; 