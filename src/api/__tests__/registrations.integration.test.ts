import request from 'supertest';
import { app } from '@/app';
import { dbHelper } from '@/test/db-helper';
import { createTestUser, generateAuthToken } from '@/test/auth-helper';
import type { Database } from '@/types/database.types';

type Event = Database['public']['Tables']['events']['Row'];
type Ticket = Database['public']['Tables']['tickets']['Row'];
type Registration = Database['public']['Tables']['event_registrations']['Row'];

describe('Registration API Integration Tests', () => {
  let testEvent: Event;
  let testTicket: Ticket;
  let testRegistration: Registration;
  let authToken: string;
  let userId: string;

  beforeAll(async () => {
    const user = await createTestUser();
    userId = user.id;
    authToken = await generateAuthToken(user);
  });

  beforeEach(async () => {
    testEvent = await dbHelper.createTestEvent({ created_by: userId });
    testTicket = await dbHelper.createTestTicket(testEvent.id);
  });

  afterEach(async () => {
    await dbHelper.cleanup();
  });

  describe('POST /api/registrations', () => {
    const validRegistrationData = {
      eventId: '',
      ticketId: '',
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

    it('should create a new registration', async () => {
      const response = await request(app)
        .post('/api/registrations')
        .set('Authorization', `Bearer ${authToken}`)
        .send(validRegistrationData);

      expect(response.status).toBe(201);
      expect(response.body.data).toMatchObject({
        event_id: testEvent.id,
        ticket_id: testTicket.id,
        status: 'pending'
      });
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/registrations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});

      expect(response.status).toBe(400);
    });

    it('should validate attendee details', async () => {
      const response = await request(app)
        .post('/api/registrations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          ...validRegistrationData,
          attendeeDetails: [{
            firstName: '', // Invalid: empty name
            lastName: 'Doe',
            email: 'invalid-email' // Invalid: wrong format
          }]
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch(/validation/i);
    });
  });

  describe('POST /api/registrations/:id/confirm', () => {
    beforeEach(async () => {
      testRegistration = await dbHelper.createTestRegistration(
        testEvent.id,
        testTicket.id,
        userId
      );
    });

    it('should confirm a pending registration', async () => {
      const response = await request(app)
        .post(`/api/registrations/${testRegistration.id}/confirm`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          paymentIntentId: 'test-payment-intent'
        });

      expect(response.status).toBe(200);
      expect(response.body.data.status).toBe('confirmed');
      expect(response.body.data.payment_status).toBe('paid');
    });

    it('should require payment intent ID', async () => {
      const response = await request(app)
        .post(`/api/registrations/${testRegistration.id}/confirm`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({});

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/registrations/:id/cancel', () => {
    beforeEach(async () => {
      testRegistration = await dbHelper.createTestRegistration(
        testEvent.id,
        testTicket.id,
        userId
      );
    });

    it('should cancel a registration', async () => {
      const response = await request(app)
        .post(`/api/registrations/${testRegistration.id}/cancel`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.status).toBe('cancelled');
    });

    it('should return 404 for non-existent registration', async () => {
      const response = await request(app)
        .post('/api/registrations/non-existent-id/cancel')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/registrations/user', () => {
    beforeEach(async () => {
      // Create multiple registrations
      await Promise.all([
        dbHelper.createTestRegistration(testEvent.id, testTicket.id, userId),
        dbHelper.createTestRegistration(testEvent.id, testTicket.id, userId),
        dbHelper.createTestRegistration(testEvent.id, testTicket.id, 'other-user-id')
      ]);
    });

    it('should return user registrations', async () => {
      const response = await request(app)
        .get('/api/registrations/user')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
      response.body.data.forEach((registration: any) => {
        expect(registration.user_id).toBe(userId);
      });
    });

    it('should require authentication', async () => {
      const response = await request(app)
        .get('/api/registrations/user');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/registrations/event/:eventId', () => {
    beforeEach(async () => {
      // Create multiple registrations
      await Promise.all([
        dbHelper.createTestRegistration(testEvent.id, testTicket.id, 'user-1'),
        dbHelper.createTestRegistration(testEvent.id, testTicket.id, 'user-2'),
        dbHelper.createTestRegistration('other-event-id', testTicket.id, 'user-3')
      ]);
    });

    it('should return event registrations', async () => {
      const response = await request(app)
        .get(`/api/registrations/event/${testEvent.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
      response.body.data.forEach((registration: any) => {
        expect(registration.event_id).toBe(testEvent.id);
      });
    });

    it('should return 404 for non-existent event', async () => {
      const response = await request(app)
        .get('/api/registrations/event/non-existent-id')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /api/registrations/:id/attendees', () => {
    beforeEach(async () => {
      testRegistration = await dbHelper.createTestRegistration(
        testEvent.id,
        testTicket.id,
        userId
      );
    });

    it('should update attendee details', async () => {
      const updateData = {
        attendeeDetails: [{
          firstName: 'Updated',
          lastName: 'Name',
          email: 'updated@example.com',
          phone: '+9876543210'
        }]
      };

      const response = await request(app)
        .patch(`/api/registrations/${testRegistration.id}/attendees`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.data.attendee_details[0]).toMatchObject(updateData.attendeeDetails[0]);
    });

    it('should validate attendee details', async () => {
      const response = await request(app)
        .patch(`/api/registrations/${testRegistration.id}/attendees`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          attendeeDetails: [{
            firstName: '', // Invalid: empty name
            lastName: 'Name',
            email: 'invalid-email' // Invalid: wrong format
          }]
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch(/validation/i);
    });
  });
}); 


