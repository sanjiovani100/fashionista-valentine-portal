import { TicketService } from '../ticket.service';
import { dbHelper } from '@/test/db-helper';
import { ValidationError, NotFoundError } from '@/middleware/error-handler';
import type { Database } from '@/types/database.types';

type Ticket = Database['public']['Tables']['tickets']['Row'];
type TicketInsert = Database['public']['Tables']['tickets']['Insert'];

describe('TicketService', () => {
  let ticketService: TicketService;
  let testEventId: string;
  let testEvent: Database['public']['Tables']['events']['Row'];

  beforeAll(async () => {
    ticketService = new TicketService();
    testEvent = await dbHelper.createTestEvent();
    testEventId = testEvent.id;
  });

  afterAll(async () => {
    await dbHelper.cleanup();
  });

  describe('createTicket', () => {
    it('should create a ticket successfully', async () => {
      const ticketData: TicketInsert = {
        event_id: testEventId,
        type: 'regular',
        price: 100,
        quantity_available: 50,
        benefits: ['entry', 'seat']
      };

      const ticket = await ticketService.createTicket(ticketData);

      expect(ticket).toBeDefined();
      expect(ticket.event_id).toBe(testEventId);
      expect(ticket.type).toBe('regular');
      expect(ticket.price).toBe(100);
      expect(ticket.quantity_available).toBe(50);
      expect(ticket.benefits).toEqual(['entry', 'seat']);
    });

    it('should throw ValidationError for invalid event_id', async () => {
      const ticketData: TicketInsert = {
        event_id: '00000000-0000-0000-0000-000000000000',
        type: 'regular',
        price: 100,
        quantity_available: 50,
        benefits: ['entry', 'seat']
      };

      await expect(ticketService.createTicket(ticketData))
        .rejects
        .toThrow(ValidationError);
    });

    it('should throw ValidationError for negative price', async () => {
      const ticketData: TicketInsert = {
        event_id: testEventId,
        type: 'regular',
        price: -100,
        quantity_available: 50,
        benefits: ['entry', 'seat']
      };

      await expect(ticketService.createTicket(ticketData))
        .rejects
        .toThrow(ValidationError);
    });
  });

  describe('getTicketById', () => {
    it('should retrieve a ticket by id', async () => {
      const createdTicket = await dbHelper.createTestTicket(testEventId);
      const retrievedTicket = await ticketService.getTicketById(createdTicket.id);

      expect(retrievedTicket).toBeDefined();
      expect(retrievedTicket.id).toBe(createdTicket.id);
      expect(retrievedTicket.event_id).toBe(testEventId);
    });

    it('should throw NotFoundError for non-existent ticket', async () => {
      await expect(ticketService.getTicketById('00000000-0000-0000-0000-000000000000'))
        .rejects
        .toThrow(NotFoundError);
    });
  });

  describe('getTicketsByEvent', () => {
    it('should retrieve all tickets for an event', async () => {
      // Create multiple tickets
      await Promise.all([
        dbHelper.createTestTicket(testEventId, { type: 'vip', price: 200 }),
        dbHelper.createTestTicket(testEventId, { type: 'regular', price: 100 })
      ]);

      const tickets = await ticketService.getTicketsByEvent(testEventId);

      expect(tickets).toHaveLength(2);
      expect(tickets.every(t => t.event_id === testEventId)).toBe(true);
    });

    it('should return empty array for event with no tickets', async () => {
      const newEvent = await dbHelper.createTestEvent();
      const tickets = await ticketService.getTicketsByEvent(newEvent.id);

      expect(tickets).toHaveLength(0);
    });
  });

  describe('updateTicket', () => {
    it('should update ticket details', async () => {
      const ticket = await dbHelper.createTestTicket(testEventId);
      const updates: Partial<TicketInsert> = {
        price: 150,
        quantity_available: 75
      };

      const updatedTicket = await ticketService.updateTicket(ticket.id, updates);

      expect(updatedTicket.price).toBe(150);
      expect(updatedTicket.quantity_available).toBe(75);
      expect(updatedTicket.id).toBe(ticket.id);
    });

    it('should throw NotFoundError for non-existent ticket', async () => {
      await expect(
        ticketService.updateTicket('00000000-0000-0000-0000-000000000000', { price: 150 })
      ).rejects.toThrow(NotFoundError);
    });
  });
}); 


