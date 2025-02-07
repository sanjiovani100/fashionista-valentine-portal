import { Request, Response } from 'express';
import { supabase } from '../../lib/supabase/config';
import type { EventDetails } from '../../types/event';

interface ErrorResponse {
  error: string;
  details?: string;
}

const handleError = (error: unknown, context: string): ErrorResponse => {
  if (error instanceof Error) {
    return {
      error: `Error ${context}`,
      details: error.message
    };
  }
  return {
    error: `Unknown error ${context}`
  };
};

export const listEvents = async (req: Request, res: Response) => {
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select('*, fashion_images(*)')
      .order('start_time', { ascending: true });

    if (error) throw error;

    return res.status(200).json({
      status: 'success',
      data: events
    });
  } catch (error) {
    const errorResponse = handleError(error, 'fetching events');
    return res.status(500).json({
      status: 'error',
      ...errorResponse
    });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data: event, error } = await supabase
      .from('events')
      .select('*, fashion_images(*), event_tickets(*), event_sponsors(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!event) {
      return res.status(404).json({
        status: 'error',
        error: 'Event not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: event
    });
  } catch (error) {
    const errorResponse = handleError(error, 'fetching event');
    return res.status(500).json({
      status: 'error',
      ...errorResponse
    });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const eventData: Partial<EventDetails> = req.body;
    const { data: event, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      status: 'success',
      data: event
    });
  } catch (error) {
    const errorResponse = handleError(error, 'creating event');
    return res.status(500).json({
      status: 'error',
      ...errorResponse
    });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const eventData: Partial<EventDetails> = req.body;

    const { data: event, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!event) {
      return res.status(404).json({
        status: 'error',
        error: 'Event not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: event
    });
  } catch (error) {
    const errorResponse = handleError(error, 'updating event');
    return res.status(500).json({
      status: 'error',
      ...errorResponse
    });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return res.status(200).json({
      status: 'success',
      error: 'Event deleted successfully'
    });
  } catch (error) {
    const errorResponse = handleError(error, 'deleting event');
    return res.status(500).json({
      status: 'error',
      ...errorResponse
    });
  }
}; 