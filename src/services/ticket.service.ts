import { ApiService } from './api.service';
import { supabase } from '@/lib/supabase/config';
import type { Database } from '@/types/database.types';
import { ValidationError } from '@/middleware/error-handler';

type Ticket = Database['public']['Tables']['tickets']['Row'];
type TicketInsert = Database['public']['Tables']['tickets']['Insert'];
type SponsorTicketAllocation = Database['public']['Tables']['sponsor_ticket_allocations']['Row'];
type SponsorTicketRedemption = Database['public']['Tables']['sponsor_ticket_redemptions']['Row'];

export class TicketService extends ApiService {
  /**
   * Create a new ticket
   */
  async createTicket(data: TicketInsert): Promise<Ticket> {
    await this.validateExists('events', data.event_id, 'Event not found');
    
    return this.query('createTicket', () =>
      supabase
        .from('tickets')
        .insert([data])
        .select()
        .single()
    );
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
    return this.query('getTicketsByEvent', () =>
      supabase
        .from('tickets')
        .select('*')
        .eq('event_id', eventId)
    );
  }

  /**
   * Update ticket
   */
  async updateTicket(id: string, data: Partial<TicketInsert>): Promise<Ticket> {
    return this.atomicUpdate<Ticket>('tickets', id, () => data);
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
} 