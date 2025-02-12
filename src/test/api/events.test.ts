import { supabase } from '@/lib/supabase/config';
import { v4 as uuidv4 } from 'uuid';

describe('Events API', () => {
  let testEventId: string;
  const testUserId = uuidv4();

  beforeAll(async () => {
    // Create test event
    const { data, error } = await supabase
      .from('events')
      .insert({
        title: 'Test API Event',
        description: 'Test API Event Description',
        venue: 'Test Venue',
        capacity: 100,
        start_time: new Date(Date.now() + 86400000).toISOString(),
        end_time: new Date(Date.now() + 172800000).toISOString(),
        status: 'published',
        created_by: testUserId
      })
      .select()
      .single();

    if (error) throw error;
    testEventId = data.id;
  });

  afterAll(async () => {
    // Cleanup test data
    await supabase.from('events').delete().eq('id', testEventId);
  });

  describe('GET /api/events', () => {
    test('should list all events', async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*');

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
      expect(data?.length).toBeGreaterThan(0);
    });

    test('should filter events by status', async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published');

      expect(error).toBeNull();
      expect(data?.every(event => event.status === 'published')).toBe(true);
    });
  });

  describe('GET /api/events/:id', () => {
    test('should get event by id', async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', testEventId)
        .single();

      expect(error).toBeNull();
      expect(data?.id).toBe(testEventId);
      expect(data?.title).toBe('Test API Event');
    });

    test('should return error for non-existent event', async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', 'non-existent-id')
        .single();

      expect(error).not.toBeNull();
      expect(data).toBeNull();
    });
  });

  describe('POST /api/events', () => {
    test('should create new event', async () => {
      const newEvent = {
        title: 'New Test Event',
        description: 'New Test Event Description',
        venue: 'New Test Venue',
        capacity: 200,
        start_time: new Date(Date.now() + 86400000).toISOString(),
        end_time: new Date(Date.now() + 172800000).toISOString(),
        status: 'draft',
        created_by: testUserId
      };

      const { data, error } = await supabase
        .from('events')
        .insert(newEvent)
        .select()
        .single();

      expect(error).toBeNull();
      expect(data?.title).toBe(newEvent.title);

      // Cleanup
      await supabase.from('events').delete().eq('id', data?.id);
    });
  });

  describe('PUT /api/events/:id', () => {
    test('should update event', async () => {
      const updates = {
        title: 'Updated Test Event',
        description: 'Updated Description'
      };

      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', testEventId)
        .select()
        .single();

      expect(error).toBeNull();
      expect(data?.title).toBe(updates.title);
      expect(data?.description).toBe(updates.description);
    });
  });

  describe('DELETE /api/events/:id', () => {
    test('should delete event', async () => {
      // Create temporary event to delete
      const { data: tempEvent } = await supabase
        .from('events')
        .insert({
          title: 'Temp Event',
          description: 'To be deleted',
          venue: 'Test Venue',
          capacity: 100,
          start_time: new Date(Date.now() + 86400000).toISOString(),
          end_time: new Date(Date.now() + 172800000).toISOString(),
          status: 'draft',
          created_by: testUserId
        })
        .select()
        .single();

      const { error: deleteError } = await supabase
        .from('events')
        .delete()
        .eq('id', tempEvent?.id);

      expect(deleteError).toBeNull();

      // Verify deletion
      const { data: checkData, error: checkError } = await supabase
        .from('events')
        .select()
        .eq('id', tempEvent?.id)
        .single();

      expect(checkError).not.toBeNull();
      expect(checkData).toBeNull();
    });
  });
}); 


