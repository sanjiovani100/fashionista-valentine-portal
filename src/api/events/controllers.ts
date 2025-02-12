import { Request, Response, NextFunction } from 'express';
import { EventService } from '../../services/event.service.js';
import { ValidationError, NotFoundError } from '../../middleware/error-handler.js';
import { logger } from '../../config/logger.js';
import type { Database } from '../../types/database.types.js';

type Event = Database['public']['Tables']['events']['Row'];
type EventInsert = Database['public']['Tables']['events']['Insert'];
type EventStatus = Event['status'];

const eventService = new EventService();

export const listEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, search, sort } = req.query;
    const status = req.query.status as EventStatus | undefined;
    const filters = status ? { status } : undefined;
    
    const result = await eventService.list({
      pagination: {
        page: Number(page),
        limit: Number(limit)
      },
      search: search as string,
      sort: sort ? {
        field: (sort as string).replace(/^-/, ''),
        direction: (sort as string).startsWith('-') ? 'desc' : 'asc'
      } : undefined,
      filters
    });

    res.json({
      status: 'success',
      ...result
    });
  } catch (error) {
    logger.error('Error listing events:', error);
    next(error);
  }
};

export const getEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const includeTickets = req.query.include_tickets === 'true';

    const event = includeTickets
      ? await eventService.getEventWithTickets(id)
      : await eventService.get(id);

    res.json({
      status: 'success',
      data: event
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({
        status: 'error',
        message: error.message
      });
      return;
    }

    logger.error('Error retrieving event:', error);
    next(error);
  }
};

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Request body is already validated by zod middleware
    const eventData: EventInsert = {
      ...req.body,
      created_by: req.user?.id
    };

    const event = await eventService.createEvent(eventData);

    res.status(201).json({
      status: 'success',
      data: event
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
      return;
    }

    logger.error('Error creating event:', error);
    next(error);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Request body is already validated by zod middleware
    const updateData: Partial<EventInsert> = {
      ...req.body,
      updated_by: req.user?.id
    };

    const event = await eventService.updateEvent(id, updateData);

    res.json({
      status: 'success',
      data: event
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
      return;
    }

    if (error instanceof NotFoundError) {
      res.status(404).json({
        status: 'error',
        message: error.message
      });
      return;
    }

    logger.error('Error updating event:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update event'
    });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if event exists and user has permission
    const event = await eventService.get(id);
    
    // Mark the event as deleted
    await eventService.update(id, {
      status: 'deleted',
      updated_by: req.user?.id
    });

    res.json({
      status: 'success',
      message: 'Event deleted successfully'
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({
        status: 'error',
        message: error.message
      });
      return;
    }

    logger.error('Error deleting event:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete event'
    });
  }
};

export const getUpcomingEvents = async (req: Request, res: Response) => {
  try {
    const { limit = 10 } = req.query;
    const events = await eventService.getUpcomingEvents(Number(limit));

    res.json({
      status: 'success',
      data: events
    });
  } catch (error) {
    logger.error('Error retrieving upcoming events:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve upcoming events'
    });
  }
};

export const checkEventCapacity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const capacity = await eventService.checkEventCapacity(id);

    res.json({
      status: 'success',
      data: capacity
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({
        status: 'error',
        message: error.message
      });
      return;
    }

    logger.error('Error checking event capacity:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to check event capacity'
    });
  }
}; 


