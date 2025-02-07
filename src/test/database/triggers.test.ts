import { supabase } from '@/lib/supabase/config';
import { v4 as uuidv4 } from 'uuid';

describe('Database Triggers and Functions', () => {
  let testEventId: string;
  let testTicketId: string;
  const testUserId = '00000000-0000-0000-0000-000000000000'; // Test user ID

  beforeAll(async () => {
    // Create test event
    const { data: eventData, error: eventError } = await supabase
      .from('events')
      .insert({
        title: 'Test Event',
        description: 'Test Description',
        venue: 'Test Venue',
        capacity: 100,
        start_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        end_time: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
        status: 'published',
        created_by: testUserId
      })
      .select()
      .single();
    if (eventError) throw eventError;
    testEventId = eventData.id;

    // Create test ticket
    const { data: ticketData, error: ticketError } = await supabase
      .from('tickets')
      .insert({
        event_id: testEventId,
        ticket_type: 'regular',
        price: 100.00,
        quantity_available: 50,
        quantity_sold: 0,
        early_bird_price: 80.00,
        early_bird_deadline: new Date(Date.now() + 43200000).toISOString(), // 12 hours from now
        group_discount_threshold: 5,
        group_discount_percentage: 10.00,
        created_by: testUserId
      })
      .select()
      .single();
    if (ticketError) throw ticketError;
    testTicketId = ticketData.id;
  });

  afterAll(async () => {
    // Cleanup test data
    await supabase.from('registrations').delete().eq('event_id', testEventId);
    await supabase.from('tickets').delete().eq('id', testTicketId);
    await supabase.from('events').delete().eq('id', testEventId);
  });

  describe('Ticket Management Functions', () => {
    test('fn_check_ticket_availability should return correct availability', async () => {
      const { data, error } = await supabase
        .rpc('fn_check_ticket_availability', {
          p_ticket_id: testTicketId,
          p_quantity: 5
        });
      
      expect(error).toBeNull();
      expect(data).toBe(true);
    });

    test('fn_calculate_ticket_price should calculate correct price with early bird discount', async () => {
      const { data, error } = await supabase
        .rpc('fn_calculate_ticket_price', {
          p_ticket_id: testTicketId,
          p_quantity: 1
        });
      
      expect(error).toBeNull();
      expect(data).toBe('80.00'); // Early bird price
    });

    test('fn_calculate_ticket_price should apply group discount', async () => {
      const { data, error } = await supabase
        .rpc('fn_calculate_ticket_price', {
          p_ticket_id: testTicketId,
          p_quantity: 5
        });
      
      expect(error).toBeNull();
      // Early bird price (80) * 5 tickets * 0.9 (10% group discount)
      expect(data).toBe('360.00');
    });
  });

  describe('Ticket Purchase Validation', () => {
    test('fn_validate_ticket_purchase should validate successfully', async () => {
      const { data, error } = await supabase
        .rpc('fn_validate_ticket_purchase', {
          p_ticket_id: testTicketId,
          p_quantity: 2,
          p_user_id: testUserId
        });
      
      expect(error).toBeNull();
      expect(data).toEqual({
        is_valid: true,
        message: 'Validation successful',
        total_price: '160.00' // 2 tickets at early bird price
      });
    });

    test('fn_validate_ticket_purchase should prevent overselling', async () => {
      const { data, error } = await supabase
        .rpc('fn_validate_ticket_purchase', {
          p_ticket_id: testTicketId,
          p_quantity: 51, // More than available
          p_user_id: testUserId
        });
      
      expect(error).toBeNull();
      expect(data.is_valid).toBe(false);
      expect(data.message).toBe('Insufficient tickets available');
    });
  });

  describe('Audit Logging', () => {
    test('should create audit log entry on event update', async () => {
      // Update event
      await supabase
        .from('events')
        .update({ 
          title: 'Updated Test Event',
          updated_by: testUserId
        })
        .eq('id', testEventId);

      // Check audit log
      const { data, error } = await supabase
        .from('audit_logs')
        .select()
        .eq('table_name', 'events')
        .eq('record_id', testEventId)
        .order('changed_at', { ascending: false })
        .limit(1)
        .single();

      expect(error).toBeNull();
      expect(data).toBeTruthy();
      expect(data.operation).toBe('UPDATE');
      expect(data.new_data.title).toBe('Updated Test Event');
    });
  });

  describe('Analytics View', () => {
    test('should update analytics view after registration', async () => {
      // Create a registration
      await supabase
        .from('registrations')
        .insert({
          event_id: testEventId,
          ticket_id: testTicketId,
          user_id: testUserId,
          quantity: 2,
          payment_status: 'completed',
          created_by: testUserId
        });

      // Check analytics view
      const { data, error } = await supabase
        .from('mv_event_analytics')
        .select()
        .eq('event_id', testEventId)
        .single();

      expect(error).toBeNull();
      expect(data).toBeTruthy();
      expect(data.total_registrations).toBe(1);
      expect(data.unique_attendees).toBe(1);
      expect(data.total_revenue).toBe('160.00');
    });
  });
}); 