import { RegistrationService } from '../registration.service';
import { dbHelper } from '@/test/db-helper';
import { ValidationError, NotFoundError, ConflictError } from '@/types/error';
import type { Database } from '@/types/database.types';

type Registration = Database['public']['Tables']['event_registrations']['Row'];
type Event = Database['public']['Tables']['events']['Row'];
type Ticket = Database['public']['Tables']['tickets']['Row'];

describe('RegistrationService', () => {
  let registrationService: RegistrationService;
  let testEvent: Event;
  let testTicket: Ticket;
  const testUserId = 'test-user-id';

  beforeEach(async () => {
    registrationService = new RegistrationService();
    testEvent = await dbHelper.createTestEvent();
    testTicket = await dbHelper.createTestTicket(testEvent.id);
  });

  afterEach(async () => {
    await dbHelper.cleanup();
  });

  describe('createRegistration', () => {
    const validRegistrationData = {
      eventId: '',
      ticketId: '',
      userId: testUserId,
      attendeeDetails: [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890'
      }]
    };

    beforeEach(() => {
      validRegistrationData.eventId = testEvent.id;
      validRegistrationData.ticketId = testTicket.id;
    });

    it('should create a registration with valid data', async () => {
      const registration = await registrationService.createRegistration(validRegistrationData);
      expect(registration).toMatchObject({
        event_id: testEvent.id,
        ticket_id: testTicket.id,
        user_id: testUserId,
        status: 'pending'
      });
      expect(registration.id).toBeDefined();
    });

    it('should throw ValidationError if event does not exist', async () => {
      await expect(registrationService.createRegistration({
        ...validRegistrationData,
        eventId: 'non-existent-id'
      })).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError if ticket does not exist', async () => {
      await expect(registrationService.createRegistration({
        ...validRegistrationData,
        ticketId: 'non-existent-id'
      })).rejects.toThrow(ValidationError);
    });

    it('should throw ConflictError if event is at capacity', async () => {
      // Create event with capacity 1
      const fullEvent = await dbHelper.createTestEvent({ capacity: 1 });
      const ticket = await dbHelper.createTestTicket(fullEvent.id);
      
      // Create first registration
      await registrationService.createRegistration({
        ...validRegistrationData,
        eventId: fullEvent.id,
        ticketId: ticket.id
      });

      // Attempt second registration
      await expect(registrationService.createRegistration({
        ...validRegistrationData,
        eventId: fullEvent.id,
        ticketId: ticket.id
      })).rejects.toThrow(ConflictError);
    });
  });

  describe('confirmRegistration', () => {
    let testRegistration: Registration;

    beforeEach(async () => {
      testRegistration = await dbHelper.createTestRegistration(testEvent.id, testTicket.id, testUserId);
    });

    it('should confirm a pending registration', async () => {
      const paymentIntentId = 'test-payment-intent';
      const registration = await registrationService.confirmRegistration(
        testRegistration.id,
        paymentIntentId
      );

      expect(registration.status).toBe('confirmed');
      expect(registration.payment_status).toBe('paid');
      expect(registration.payment_intent_id).toBe(paymentIntentId);
    });

    it('should throw NotFoundError for non-existent registration', async () => {
      await expect(registrationService.confirmRegistration(
        'non-existent-id',
        'test-payment-intent'
      )).rejects.toThrow(NotFoundError);
    });

    it('should throw ValidationError for already confirmed registration', async () => {
      await registrationService.confirmRegistration(
        testRegistration.id,
        'test-payment-intent'
      );

      await expect(registrationService.confirmRegistration(
        testRegistration.id,
        'another-payment-intent'
      )).rejects.toThrow(ValidationError);
    });
  });

  describe('cancelRegistration', () => {
    let testRegistration: Registration;

    beforeEach(async () => {
      testRegistration = await dbHelper.createTestRegistration(testEvent.id, testTicket.id, testUserId);
    });

    it('should cancel a pending registration', async () => {
      const registration = await registrationService.cancelRegistration(testRegistration.id);
      expect(registration.status).toBe('cancelled');
      expect(registration.payment_status).toBe('cancelled');
    });

    it('should throw NotFoundError for non-existent registration', async () => {
      await expect(registrationService.cancelRegistration('non-existent-id'))
        .rejects.toThrow(NotFoundError);
    });
  });

  describe('getUserRegistrations', () => {
    beforeEach(async () => {
      // Create multiple registrations for the test user
      await Promise.all([
        dbHelper.createTestRegistration(testEvent.id, testTicket.id, testUserId),
        dbHelper.createTestRegistration(testEvent.id, testTicket.id, testUserId),
        dbHelper.createTestRegistration(testEvent.id, testTicket.id, 'other-user-id')
      ]);
    });

    it('should return only registrations for the specified user', async () => {
      const registrations = await registrationService.getUserRegistrations(testUserId);
      expect(registrations.length).toBe(2);
      registrations.forEach(registration => {
        expect(registration.user_id).toBe(testUserId);
      });
    });
  });

  describe('getEventRegistrations', () => {
    beforeEach(async () => {
      // Create multiple registrations for the test event
      await Promise.all([
        dbHelper.createTestRegistration(testEvent.id, testTicket.id, 'user-1'),
        dbHelper.createTestRegistration(testEvent.id, testTicket.id, 'user-2'),
        dbHelper.createTestRegistration('other-event-id', testTicket.id, 'user-3')
      ]);
    });

    it('should return only registrations for the specified event', async () => {
      const registrations = await registrationService.getEventRegistrations(testEvent.id);
      expect(registrations.length).toBe(2);
      registrations.forEach(registration => {
        expect(registration.event_id).toBe(testEvent.id);
      });
    });
  });
}); 


