import request from 'supertest';
import { app } from '@/app';
import { dbHelper } from '@/test/db-helper';
import { createTestUser, generateAuthToken } from '@/test/auth-helper';
import type { Database } from '@/types/database.types';

type Event = Database['public']['Tables']['events']['Row'];

describe('Event API Integration Tests', () => {
  let testEvent: Event;
  let authToken: string;
  let userId: string;

  beforeAll(async () => {
    const user = await createTestUser();
    userId = user.id;
    authToken = await generateAuthToken(user);
  });

  beforeEach(async () => {
    testEvent = await dbHelper.createTestEvent({ created_by: userId });
  });

  afterEach(async () => {
    await dbHelper.cleanup();
  });

  describe('GET /api/events', () => {
    it('should list events with pagination', async () => {
      // Create multiple events
      await Promise.all([
        dbHelper.createTestEvent({ created_by: userId }),
        dbHelper.createTestEvent({ created_by: userId })
      ]);

      const response = await request(app)
        .get('/api/events')
        .query({ page: 1, limit: 2 });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination).toBeDefined();
    });

    it('should filter events by status', async () => {
      await Promise.all([
        dbHelper.createTestEvent({ status: 'published', created_by: userId }),
        dbHelper.createTestEvent({ status: 'draft', created_by: userId })
      ]);

      const response = await request(app)
        .get('/api/events')
        .query({ status: 'published' });

      expect(response.status).toBe(200);
      expect(response.body.data.every((event: Event) => event.status === 'published')).toBe(true);
    });
  });

  describe('GET /api/events/:id', () => {
    it('should return event details', async () => {
      const response = await request(app)
        .get(`/api/events/${testEvent.id}`);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(testEvent.id);
    });

    it('should return 404 for non-existent event', async () => {
      const response = await request(app)
        .get('/api/events/non-existent-id');

      expect(response.status).toBe(404);
    });

    it('should include tickets when requested', async () => {
      await dbHelper.createTestTicket(testEvent.id);

      const response = await request(app)
        .get(`/api/events/${testEvent.id}`)
        .query({ include_tickets: 'true' });

      expect(response.status).toBe(200);
      expect(response.body.data.tickets).toBeDefined();
      expect(response.body.data.tickets.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/events', () => {
    it('should create a new event', async () => {
      const newEvent = {
        title: 'New Test Event',
        description: 'New Test Description',
        venue: 'New Test Venue',
        capacity: 200,
        start_time: new Date(Date.now() + 86400000).toISOString(),
        end_time: new Date(Date.now() + 172800000).toISOString(),
        registration_deadline: new Date(Date.now() + 43200000).toISOString(),
        theme: 'New Test Theme'
      };

      const response = await request(app)
        .post('/api/events')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newEvent);

      expect(response.status).toBe(201);
      expect(response.body.data).toMatchObject(newEvent);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/events')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/events/:id', () => {
    it('should update an existing event', async () => {
      const updateData = {
        title: 'Updated Title',
        description: 'Updated Description'
      };

      const response = await request(app)
        .put(`/api/events/${testEvent.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe(updateData.title);
      expect(response.body.data.description).toBe(updateData.description);
    });

    it('should return 404 for non-existent event', async () => {
      const response = await request(app)
        .put('/api/events/non-existent-id')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Updated Title' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/events/:id', () => {
    it('should mark event as deleted', async () => {
      const response = await request(app)
        .delete(`/api/events/${testEvent.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);

      // Verify event is marked as deleted
      const checkResponse = await request(app)
        .get(`/api/events/${testEvent.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(checkResponse.body.data.status).toBe('deleted');
    });

    it('should return 404 for non-existent event', async () => {
      const response = await request(app)
        .delete('/api/events/non-existent-id')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });
}); 


