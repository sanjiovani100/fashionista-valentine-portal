import { ApiService } from './api.service';
import type { Database } from '../types/database.types.js';
import { ValidationError, NotFoundError, ConflictError } from '../middleware/error-handler.js';
import { EventService } from './event.service';
import { TicketService } from './ticket.service';

type Registration = Database['public']['Tables']['event_registrations']['Row'];
type RegistrationInsert = Database['public']['Tables']['event_registrations']['Insert'];

interface AttendeeDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dietaryRequirements?: string[];
  specialRequirements?: string;
}

interface RegistrationRequest {
  eventId: string;
  ticketId: string;
  userId: string;
  attendeeDetails: AttendeeDetails[];
  paymentIntentId?: string;
}

export class RegistrationService extends ApiService<'event_registrations'> {
  private eventService: EventService;
  private ticketService: TicketService;

  constructor() {
    super('event_registrations', {
      searchFields: ['status', 'payment_status'],
      defaultSort: { field: 'created_at', direction: 'desc' }
    });
    this.eventService = new EventService();
    this.ticketService = new TicketService();
  }

  async createRegistration(request: RegistrationRequest): Promise<Registration> {
    const { eventId, ticketId, userId, attendeeDetails, paymentIntentId } = request;

    // Validate event is open for registration
    const event = await this.eventService.get(eventId);
    const now = new Date();
    const registrationDeadline = new Date(event.registration_deadline);

    if (now > registrationDeadline) {
      throw new ValidationError('Registration deadline has passed');
    }

    // Check ticket availability
    const availability = await this.ticketService.checkTicketAvailability(ticketId);
    if (availability.available < attendeeDetails.length) {
      throw new ValidationError('Not enough tickets available');
    }

    // Check event capacity
    const capacity = await this.eventService.checkEventCapacity(eventId);
    if (!capacity.isAvailable || capacity.available < attendeeDetails.length) {
      throw new ValidationError('Event capacity exceeded');
    }

    // Create registration
    const registrationData: RegistrationInsert = {
      event_id: eventId,
      user_id: userId,
      ticket_id: ticketId,
      status: 'pending',
      attendee_details: attendeeDetails,
      payment_status: paymentIntentId ? 'pending' : 'paid',
      payment_intent_id: paymentIntentId
    };

    return this.create(registrationData);
  }

  async confirmRegistration(id: string, paymentIntentId?: string): Promise<Registration> {
    const registration = await this.get(id);

    if (registration.status !== 'pending') {
      throw new ValidationError('Registration cannot be confirmed');
    }

    const updateData: Partial<Registration> = {
      status: 'confirmed',
      payment_status: 'paid'
    };

    if (paymentIntentId) {
      updateData.payment_intent_id = paymentIntentId;
    }

    return this.update(id, updateData);
  }

  async cancelRegistration(id: string): Promise<Registration> {
    const registration = await this.get(id);

    if (registration.status === 'cancelled') {
      throw new ValidationError('Registration is already cancelled');
    }

    if (registration.status === 'confirmed') {
      const event = await this.eventService.get(registration.event_id);
      const eventStart = new Date(event.start_time);
      const now = new Date();

      if (now >= eventStart) {
        throw new ValidationError('Cannot cancel registration after event has started');
      }
    }

    return this.update(id, {
      status: 'cancelled',
      payment_status: registration.payment_status === 'paid' ? 'refunded' : 'cancelled'
    });
  }

  async getUserRegistrations(userId: string): Promise<Registration[]> {
    const { data } = await this.list({
      filters: { user_id: userId },
      includes: ['event', 'ticket']
    });
    return data;
  }

  async getEventRegistrations(eventId: string): Promise<Registration[]> {
    const { data } = await this.list({
      filters: { event_id: eventId },
      includes: ['user', 'ticket']
    });
    return data;
  }

  async getRegistrationDetails(id: string): Promise<Registration & {
    event: Database['public']['Tables']['events']['Row'];
    ticket: Database['public']['Tables']['tickets']['Row'];
  }> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select(`
        *,
        event:events(*),
        ticket:tickets(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new NotFoundError('Registration not found');

    return data as Registration & {
      event: Database['public']['Tables']['events']['Row'];
      ticket: Database['public']['Tables']['tickets']['Row'];
    };
  }

  async updateAttendeeDetails(id: string, attendeeDetails: AttendeeDetails[]): Promise<Registration> {
    const registration = await this.get(id);

    if (registration.status === 'cancelled') {
      throw new ValidationError('Cannot update cancelled registration');
    }

    const event = await this.eventService.get(registration.event_id);
    const eventStart = new Date(event.start_time);
    const now = new Date();

    if (now >= eventStart) {
      throw new ValidationError('Cannot update attendee details after event has started');
    }

    return this.update(id, { attendee_details: attendeeDetails });
  }
} 


