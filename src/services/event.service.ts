import { ApiService } from './api.service.js';
import type { Database } from '../types/database.types.js';
import { ValidationError, NotFoundError } from '../middleware/error-handler.js';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

type Event = Database['public']['Tables']['events']['Row'];
type EventInsert = Database['public']['Tables']['events']['Insert'];

// Mock data for development
const mockEvents = [
  {
    id: '1',
    title: 'Valentine Fashion Show 2025',
    description: 'A romantic evening of fashion and love',
    date: new Date('2025-02-14').toISOString(),
    location: 'Grand Ballroom',
    capacity: 500,
    status: 'upcoming',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Love & Style Gala',
    description: 'Celebrating fashion with a touch of romance',
    date: new Date('2025-02-15').toISOString(),
    location: 'Fashion Center',
    capacity: 300,
    status: 'upcoming',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export class EventService extends ApiService<'events'> {
  constructor() {
    super('events', {
      searchFields: ['title', 'description', 'location'],
      defaultSort: { field: 'date', direction: 'asc' }
    });
  }

  async list(options = {}) {
    if (env.NODE_ENV === 'development') {
      logger.info('Using mock data for events');
      return {
        data: mockEvents,
        total: mockEvents.length,
        page: 1,
        limit: 10
      };
    }
    return super.list(options);
  }

  async get(id: string, options = {}) {
    if (env.NODE_ENV === 'development') {
      logger.info('Using mock data for event details');
      const event = mockEvents.find(e => e.id === id);
      if (!event) {
        throw new Error('Event not found');
      }
      return event;
    }
    return super.get(id, options);
  }

  async create(data: any) {
    if (env.NODE_ENV === 'development') {
      logger.info('Using mock data for event creation');
      const newEvent = {
        ...data,
        id: (mockEvents.length + 1).toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockEvents.push(newEvent);
      return newEvent;
    }
    return super.create(data);
  }

  async createEvent(data: EventInsert): Promise<Event> {
    // Validate event dates
    const startTime = new Date(data.start_time);
    const endTime = new Date(data.end_time);
    const registrationDeadline = new Date(data.registration_deadline);
    const now = new Date();

    if (startTime <= now) {
      throw new ValidationError('Event start time must be in the future');
    }

    if (endTime <= startTime) {
      throw new ValidationError('Event end time must be after start time');
    }

    if (registrationDeadline >= startTime) {
      throw new ValidationError('Registration deadline must be before event start time');
    }

    if (data.capacity < 1) {
      throw new ValidationError('Event capacity must be at least 1');
    }

    return this.create(data);
  }

  async updateEvent(id: string, data: Partial<EventInsert>): Promise<Event> {
    const event = await this.get(id);

    // Validate date updates if provided
    if (data.start_time || data.end_time || data.registration_deadline) {
      const startTime = new Date(data.start_time || event.start_time);
      const endTime = new Date(data.end_time || event.end_time);
      const registrationDeadline = new Date(data.registration_deadline || event.registration_deadline);
      const now = new Date();

      if (startTime <= now) {
        throw new ValidationError('Event start time must be in the future');
      }

      if (endTime <= startTime) {
        throw new ValidationError('Event end time must be after start time');
      }

      if (registrationDeadline >= startTime) {
        throw new ValidationError('Registration deadline must be before event start time');
      }
    }

    // Validate capacity if provided
    if (data.capacity !== undefined && data.capacity < 1) {
      throw new ValidationError('Event capacity must be at least 1');
    }

    return this.update(id, data);
  }

  async getUpcomingEvents(limit: number = 10): Promise<Event[]> {
    const { data } = await this.list({
      filters: {
        start_time: { gt: new Date().toISOString() }
      },
      sort: { field: 'start_time', direction: 'asc' },
      pagination: { limit }
    });
    return data;
  }

  async getEventWithTickets(id: string): Promise<Event & { tickets: any[] }> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select(`
        *,
        tickets (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new NotFoundError('Event not found');

    return data as Event & { tickets: any[] };
  }

  async checkEventCapacity(id: string): Promise<{ 
    total: number; 
    available: number; 
    isAvailable: boolean;
  }> {
    const event = await this.get(id);
    
    const { data: tickets } = await this.client
      .from('tickets')
      .select('quantity_available')
      .eq('event_id', id);

    const totalCapacity = event.capacity;
    const totalAvailable = tickets?.reduce((sum, ticket) => 
      sum + (ticket.quantity_available || 0), 0) || 0;

    return {
      total: totalCapacity,
      available: totalAvailable,
      isAvailable: totalAvailable > 0
    };
  }
} 


