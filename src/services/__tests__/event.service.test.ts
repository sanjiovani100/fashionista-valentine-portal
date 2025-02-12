import { EventService } from '../event.service';
import { dbHelper } from '@/test/db-helper';
import { ValidationError, NotFoundError } from '@/types/error';
import type { Database } from '@/types/database.types';

type Event = Database['public']['Tables']['events']['Row'];
type EventInsert = Database['public']['Tables']['events']['Insert'];

describe('EventService', () => {
  let eventService: EventService;

  beforeEach(() => {
    eventService = new EventService();
  });

  afterEach(async () => {
    await dbHelper.cleanup();
  });

  describe('createEvent', () => {
    const validEventData: EventInsert = {
      title: 'Test Event',
      description: 'Test Description',
      venue: 'Test Venue',
      capacity: 100,
      start_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      end_time: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
      registration_deadline: new Date(Date.now() + 43200000).toISOString(), // 12 hours from now
      theme: 'Test Theme'
    };

    it('should create an event with valid data', async () => {
      const event = await eventService.createEvent(validEventData);
      expect(event).toMatchObject(validEventData);
      expect(event.id).toBeDefined();
      expect(event.created_at).toBeDefined();
    });

    it('should throw ValidationError if title is empty', async () => {
      await expect(eventService.createEvent({
        ...validEventData,
        title: ''
      })).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError if capacity is negative', async () => {
      await expect(eventService.createEvent({
        ...validEventData,
        capacity: -1
      })).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError if end_time is before start_time', async () => {
      await expect(eventService.createEvent({
        ...validEventData,
        end_time: new Date(Date.now()).toISOString(),
        start_time: new Date(Date.now() + 86400000).toISOString()
      })).rejects.toThrow(ValidationError);
    });
  });

  describe('updateEvent', () => {
    let existingEvent: Event;

    beforeEach(async () => {
      existingEvent = await dbHelper.createTestEvent();
    });

    it('should update an existing event', async () => {
      const updateData = {
        title: 'Updated Title',
        description: 'Updated Description'
      };

      const updatedEvent = await eventService.updateEvent(existingEvent.id, updateData);
      expect(updatedEvent.title).toBe(updateData.title);
      expect(updatedEvent.description).toBe(updateData.description);
    });

    it('should throw NotFoundError if event does not exist', async () => {
      await expect(eventService.updateEvent('non-existent-id', {
        title: 'Updated Title'
      })).rejects.toThrow(NotFoundError);
    });

    it('should not allow updating to invalid data', async () => {
      await expect(eventService.updateEvent(existingEvent.id, {
        capacity: -1
      })).rejects.toThrow(ValidationError);
    });
  });

  describe('getUpcomingEvents', () => {
    beforeEach(async () => {
      // Create multiple events with different dates
      await Promise.all([
        dbHelper.createTestEvent({
          start_time: new Date(Date.now() + 86400000).toISOString() // Tomorrow
        }),
        dbHelper.createTestEvent({
          start_time: new Date(Date.now() + 172800000).toISOString() // Day after tomorrow
        }),
        dbHelper.createTestEvent({
          start_time: new Date(Date.now() - 86400000).toISOString() // Yesterday
        })
      ]);
    });

    it('should return only upcoming events', async () => {
      const events = await eventService.getUpcomingEvents();
      expect(events.length).toBe(2);
      events.forEach(event => {
        expect(new Date(event.start_time).getTime()).toBeGreaterThan(Date.now());
      });
    });

    it('should respect the limit parameter', async () => {
      const events = await eventService.getUpcomingEvents(1);
      expect(events.length).toBe(1);
    });
  });

  describe('checkEventCapacity', () => {
    let event: Event;

    beforeEach(async () => {
      event = await dbHelper.createTestEvent({ capacity: 100 });
    });

    it('should return correct capacity information', async () => {
      const capacity = await eventService.checkEventCapacity(event.id);
      expect(capacity).toEqual({
        total: 100,
        available: 100,
        isAvailable: true
      });
    });

    it('should throw NotFoundError for non-existent event', async () => {
      await expect(eventService.checkEventCapacity('non-existent-id'))
        .rejects.toThrow(NotFoundError);
    });
  });
}); 


