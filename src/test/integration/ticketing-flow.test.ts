import { supabase } from '@/lib/supabase/config';
import { v4 as uuidv4 } from 'uuid';

describe('Ticketing Flow Integration', () => {
  let testEventId: string;
  let testTicketId: string;
  let testUserId: string;
  
  beforeAll(async () => {
    // Create test user
    testUserId = uuidv4();
    
    // Create test event
    const { data: eventData } = await supabase
      .from('events')
      .insert({
        title: 'Integration Test Event',
        description: 'Test Event for Integration Testing',
        venue: 'Test Venue',
        capacity: 100,
        start_time: new Date(Date.now() + 86400000).toISOString(),
        end_time: new Date(Date.now() + 172800000).toISOString(),
        status: 'published',
        created_by: testUserId
      })
      .select()
      .single();
      
    testEventId = eventData!.id;
    
    // Create test ticket type
    const { data: ticketData } = await supabase
      .from('tickets')
      .insert({
        event_id: testEventId,
        ticket_type: 'regular',
        price: 100.00,
        quantity_available: 50,
        benefits: ['General admission', 'Welcome drink'],
        early_bird_deadline: new Date(Date.now() + 43200000).toISOString(),
        early_bird_price: 80.00,
        group_discount_threshold: 5,
        group_discount_percentage: 10.00,
        created_by: testUserId
      })
      .select()
      .single();
      
    testTicketId = ticketData!.id;
  });
  
  afterAll(async () => {
    // Cleanup all test data
    await supabase.from('registrations').delete().eq('event_id', testEventId);
    await supabase.from('tickets').delete().eq('id', testTicketId);
    await supabase.from('events').delete().eq('id', testEventId);
  });
  
  describe('Complete Ticket Purchase Flow', () => {
    test('should successfully complete ticket purchase flow', async () => {
      // Step 1: Check ticket availability
      const { data: availabilityData } = await supabase
        .rpc('fn_check_ticket_availability', {
          p_ticket_id: testTicketId,
          p_quantity: 2
        });
      
      expect(availabilityData).toBe(true);
      
      // Step 2: Calculate ticket price
      const { data: priceData } = await supabase
        .rpc('fn_calculate_ticket_price', {
          p_ticket_id: testTicketId,
          p_quantity: 2
        });
      
      expect(priceData).toBe('160.00'); // 2 tickets at early bird price
      
      // Step 3: Validate purchase
      const { data: validationData } = await supabase
        .rpc('fn_validate_ticket_purchase', {
          p_ticket_id: testTicketId,
          p_quantity: 2,
          p_user_id: testUserId
        });
      
      expect(validationData.is_valid).toBe(true);
      
      // Step 4: Create registration
      const { data: registrationData, error: registrationError } = await supabase
        .from('registrations')
        .insert({
          event_id: testEventId,
          ticket_id: testTicketId,
          user_id: testUserId,
          quantity: 2,
          total_amount: 160.00,
          payment_status: 'completed',
          attendee_details: {
            name: 'Test User',
            email: 'test@example.com'
          }
        })
        .select()
        .single();
      
      expect(registrationError).toBeNull();
      expect(registrationData).not.toBeNull();
      
      // Step 5: Verify ticket inventory update
      const { data: updatedTicket } = await supabase
        .from('tickets')
        .select('quantity_available')
        .eq('id', testTicketId)
        .single();
      
      expect(updatedTicket?.quantity_available).toBe(48); // 50 - 2
      
      // Step 6: Verify analytics update
      const { data: analytics } = await supabase
        .from('mv_event_analytics')
        .select()
        .eq('event_id', testEventId)
        .single();
      
      expect(analytics?.total_registrations).toBeGreaterThan(0);
      expect(analytics?.total_revenue).toBe('160.00');
    });
    
    test('should handle failed ticket purchase', async () => {
      // Attempt to purchase more tickets than available
      const { data: validationData } = await supabase
        .rpc('fn_validate_ticket_purchase', {
          p_ticket_id: testTicketId,
          p_quantity: 100,
          p_user_id: testUserId
        });
      
      expect(validationData.is_valid).toBe(false);
      expect(validationData.message).toBe('Insufficient tickets available');
    });
  });
  
  describe('Early Bird and Group Discount Logic', () => {
    test('should apply early bird discount', async () => {
      const { data: priceData } = await supabase
        .rpc('fn_calculate_ticket_price', {
          p_ticket_id: testTicketId,
          p_quantity: 1
        });
      
      expect(priceData).toBe('80.00'); // Early bird price
    });
    
    test('should apply group discount', async () => {
      const { data: priceData } = await supabase
        .rpc('fn_calculate_ticket_price', {
          p_ticket_id: testTicketId,
          p_quantity: 5
        });
      
      // Early bird price (80) * 5 tickets * 0.9 (10% group discount)
      expect(priceData).toBe('360.00');
    });
  });
}); 