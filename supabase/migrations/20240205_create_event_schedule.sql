-- Create event_schedule table
CREATE TABLE IF NOT EXISTS event_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES fashion_events(id) ON DELETE CASCADE,
  time TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  speakers TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Add RLS policies
ALTER TABLE event_schedule ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON event_schedule
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON event_schedule
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON event_schedule
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON event_schedule
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create index for faster lookups
CREATE INDEX event_schedule_event_id_idx ON event_schedule(event_id);

-- Add trigger for updating updated_at timestamp
CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON event_schedule
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_timestamp(); 