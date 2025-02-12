import { supabase } from '@/config/supabase';
import type { Database } from '@/types/database.types';

type Event = Database['public']['Tables']['events']['Row'];
type EventInsert = Database['public']['Tables']['events']['Insert'];
type Ticket = Database['public']['Tables']['tickets']['Row'];
type TicketInsert = Database['public']['Tables']['tickets']['Insert'];
type Registration = Database['public']['Tables']['event_registrations']['Row'];
type RegistrationInsert = Database['public']['Tables']['event_registrations']['Insert'];

class TestDatabaseHelper {
  private testIds: string[] = [];

  async cleanup() {
    // Delete all test data in reverse order of dependencies
    await supabase
      .from('event_registrations')
      .delete()
      .in('id', this.testIds);

    await supabase
      .from('tickets')
      .delete()
      .in('id', this.testIds);

    await supabase
      .from('events')
      .delete()
      .in('id', this.testIds);

    this.testIds = [];
  }

  async createTestEvent(overrides: Partial<EventInsert> = {}): Promise<Event> {
    const defaultEvent: EventInsert = {
      title: 'Test Event',
      description: 'Test Description',
      venue: 'Test Venue',
      capacity: 100,
      start_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      end_time: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
      registration_deadline: new Date(Date.now() + 43200000).toISOString(), // 12 hours from now
      theme: 'Test Theme',
      status: 'published'
    };

    const { data, error } = await supabase
      .from('events')
      .insert({ ...defaultEvent, ...overrides })
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create test event');

    this.testIds.push(data.id);
    return data;
  }

  async createTestTicket(eventId: string, overrides: Partial<TicketInsert> = {}): Promise<Ticket> {
    const defaultTicket: TicketInsert = {
      event_id: eventId,
      type: 'regular',
      price: 100,
      quantity_available: 50,
      benefits: ['entry', 'seat']
    };

    const { data, error } = await supabase
      .from('tickets')
      .insert({ ...defaultTicket, ...overrides })
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create test ticket');

    this.testIds.push(data.id);
    return data;
  }

  async createTestRegistration(
    eventId: string,
    ticketId: string,
    userId: string,
    overrides: Partial<RegistrationInsert> = {}
  ): Promise<Registration> {
    const defaultRegistration: RegistrationInsert = {
      event_id: eventId,
      ticket_id: ticketId,
      user_id: userId,
      status: 'pending',
      payment_status: 'pending',
      attendee_details: [{
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      }]
    };

    const { data, error } = await supabase
      .from('event_registrations')
      .insert({ ...defaultRegistration, ...overrides })
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create test registration');

    this.testIds.push(data.id);
    return data;
  }
}

export const dbHelper = new TestDatabaseHelper(); 


