import { ApiService } from './api.service.js';
import { supabase } from '../lib/supabase/config';
import type { Database } from '../types/database.types.js';
import { ValidationError, NotFoundError, ConflictError } from '../middleware/error-handler.js';
import { EventService } from './event.service.js';

type Ticket = Database['public']['Tables']['tickets']['Row'];
type TicketInsert = Database['public']['Tables']['tickets']['Insert'];
type SponsorTicketAllocation = Database['public']['Tables']['sponsor_ticket_allocations']['Row'];
type SponsorTicketRedemption = Database['public']['Tables']['sponsor_ticket_redemptions']['Row'];

export class TicketService extends ApiService<'tickets'> {
  private eventService: EventService;

  constructor() {
    super('tickets', {
      searchFields: ['type'],
      defaultSort: { field: 'price', direction: 'asc' }
    });
    this.eventService = new EventService();
  }

  /**
   * Create a new ticket
   */
  async createTicket(data: TicketInsert): Promise<Ticket> {
    // Validate event exists and is in the future
    const event = await this.eventService.get(data.event_id);
    const now = new Date();
    const eventStart = new Date(event.start_time);

    if (eventStart <= now) {
      throw new ValidationError('Cannot create tickets for past or ongoing events');
    }

    // Validate ticket data
    if (data.price < 0) {
      throw new ValidationError('Ticket price cannot be negative');
    }

    if (data.quantity_available < 1) {
      throw new ValidationError('Ticket quantity must be at least 1');
    }

    // Validate early bird settings if provided
    if (data.early_bird_deadline) {
      const earlyBirdDeadline = new Date(data.early_bird_deadline);
      if (earlyBirdDeadline >= eventStart) {
        throw new ValidationError('Early bird deadline must be before event start time');
      }
      if (data.early_bird_price && data.early_bird_price >= data.price) {
        throw new ValidationError('Early bird price must be less than regular price');
      }
    }

    // Validate group discount if provided
    if (data.group_discount_threshold) {
      if (data.group_discount_threshold < 2) {
        throw new ValidationError('Group discount threshold must be at least 2');
      }
      if (!data.group_discount_percentage || data.group_discount_percentage <= 0 || data.group_discount_percentage >= 100) {
        throw new ValidationError('Group discount percentage must be between 0 and 100');
      }
    }

    return this.create(data);
  }

  /**
   * Get ticket by ID
   */
  async getTicketById(id: string): Promise<Ticket> {
    return this.query('getTicketById', () =>
      supabase
        .from('tickets')
        .select('*')
        .eq('id', id)
        .single()
    );
  }

  /**
   * Get tickets for an event
   */
  async getTicketsByEvent(eventId: string): Promise<Ticket[]> {
    const { data } = await this.list({
      filters: { event_id: eventId },
      sort: { field: 'price', direction: 'asc' }
    });
    return data;
  }

  /**
   * Update ticket
   */
  async updateTicket(id: string, data: Partial<TicketInsert>): Promise<Ticket> {
    const ticket = await this.get(id);
    const event = await this.eventService.get(ticket.event_id);
    const now = new Date();
    const eventStart = new Date(event.start_time);

    if (eventStart <= now) {
      throw new ValidationError('Cannot update tickets for past or ongoing events');
    }

    // Validate price update
    if (data.price !== undefined && data.price < 0) {
      throw new ValidationError('Ticket price cannot be negative');
    }

    // Validate quantity update
    if (data.quantity_available !== undefined && data.quantity_available < 1) {
      throw new ValidationError('Ticket quantity must be at least 1');
    }

    // Validate early bird updates
    if (data.early_bird_deadline) {
      const earlyBirdDeadline = new Date(data.early_bird_deadline);
      if (earlyBirdDeadline >= eventStart) {
        throw new ValidationError('Early bird deadline must be before event start time');
      }
      if (data.early_bird_price && data.early_bird_price >= (data.price || ticket.price)) {
        throw new ValidationError('Early bird price must be less than regular price');
      }
    }

    return this.update(id, data);
  }

  /**
   * Create sponsor ticket allocation
   */
  async createSponsorAllocation(data: Omit<SponsorTicketAllocation, 'id' | 'created_at' | 'updated_at' | 'quantity_used'>): Promise<SponsorTicketAllocation> {
    await this.validateExists('sponsors', data.sponsor_id, 'Sponsor not found');
    await this.validateExists('events', data.event_id, 'Event not found');

    if (data.quantity_allocated <= 0) {
      throw new ValidationError('Quantity must be greater than 0');
    }

    return this.query('createSponsorAllocation', () =>
      supabase
        .from('sponsor_ticket_allocations')
        .insert([{ ...data, quantity_used: 0 }])
        .select()
        .single()
    );
  }

  /**
   * Get sponsor allocations
   */
  async getSponsorAllocations(sponsorId: string): Promise<SponsorTicketAllocation[]> {
    return this.query('getSponsorAllocations', () =>
      supabase
        .from('sponsor_ticket_allocations')
        .select(`
          *,
          events (title, date),
          sponsor_ticket_redemptions (
            id,
            redeemed_by,
            redeemed_at,
            status
          )
        `)
        .eq('sponsor_id', sponsorId)
    );
  }

  /**
   * Check allocation availability
   */
  async checkAllocationAvailability(allocationId: string): Promise<boolean> {
    const { data } = await supabase
      .rpc('check_allocation_availability', { allocation_id: allocationId });
    
    return !!data;
  }

  /**
   * Redeem sponsor ticket
   */
  async redeemSponsorTicket(allocationId: string, redeemedBy: string): Promise<SponsorTicketRedemption> {
    const isAvailable = await this.checkAllocationAvailability(allocationId);
    
    if (!isAvailable) {
      throw new ValidationError('Ticket allocation is not available');
    }

    return this.withTransaction(async () => {
      // Get current allocation
      const { data: allocation } = await supabase
        .from('sponsor_ticket_allocations')
        .select('quantity_used, quantity_allocated')
        .eq('id', allocationId)
        .single();

      if (!allocation) {
        throw new ValidationError('Allocation not found');
      }

      // Create redemption record
      const { data: redemption, error } = await supabase
        .from('sponsor_ticket_redemptions')
        .insert([{
          allocation_id: allocationId,
          redeemed_by: redeemedBy,
          ticket_code: crypto.randomUUID(),
          status: 'active',
          redeemed_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      if (!redemption) throw new Error('Failed to create redemption record');

      // Update allocation usage
      await supabase
        .from('sponsor_ticket_allocations')
        .update({ quantity_used: allocation.quantity_used + 1 })
        .eq('id', allocationId);

      return redemption;
    });
  }

  async getAvailableTickets(eventId: string): Promise<Ticket[]> {
    const { data } = await this.list({
      filters: { 
        event_id: eventId,
        quantity_available: { gt: 0 }
      }
    });
    return data;
  }

  async checkTicketAvailability(ticketId: string): Promise<{
    available: number;
    isEarlyBird: boolean;
    isGroupDiscountEligible: boolean;
    currentPrice: number;
  }> {
    const ticket = await this.get(ticketId);
    const now = new Date();

    const isEarlyBird = ticket.early_bird_deadline 
      ? new Date(ticket.early_bird_deadline) > now 
      : false;

    return {
      available: ticket.quantity_available,
      isEarlyBird,
      isGroupDiscountEligible: !!ticket.group_discount_threshold,
      currentPrice: isEarlyBird && ticket.early_bird_price 
        ? ticket.early_bird_price 
        : ticket.price
    };
  }
} 


