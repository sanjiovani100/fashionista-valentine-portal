import { Request, Response } from 'express';
import { supabase } from '@/lib/supabase/config';
import { AppError } from '@/types/error';
import type { TicketTier } from '@/types/event';

export const listTickets = async (req: Request, res: Response) => {
  try {
    const { data: tickets, error } = await supabase
      .from('event_tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new AppError(error.message, 500);

    return res.status(200).json({
      status: 'success',
      data: tickets
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching tickets'
    });
  }
};

export const getTicketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data: ticket, error } = await supabase
      .from('event_tickets')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new AppError(error.message, 500);
    if (!ticket) throw new AppError('Ticket not found', 404);

    return res.status(200).json({
      status: 'success',
      data: ticket
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching ticket'
    });
  }
};

export const getTicketsByEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { data: tickets, error } = await supabase
      .from('event_tickets')
      .select('*')
      .eq('event_id', eventId)
      .order('price', { ascending: true });

    if (error) throw new AppError(error.message, 500);

    return res.status(200).json({
      status: 'success',
      data: tickets
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching tickets'
    });
  }
};

export const createTicket = async (req: Request, res: Response) => {
  try {
    const ticketData: Partial<TicketTier> = req.body;
    const { data: ticket, error } = await supabase
      .from('event_tickets')
      .insert([ticketData])
      .select()
      .single();

    if (error) throw new AppError(error.message, 500);

    return res.status(201).json({
      status: 'success',
      data: ticket
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Error creating ticket'
    });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ticketData: Partial<TicketTier> = req.body;

    const { data: ticket, error } = await supabase
      .from('event_tickets')
      .update(ticketData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new AppError(error.message, 500);
    if (!ticket) throw new AppError('Ticket not found', 404);

    return res.status(200).json({
      status: 'success',
      data: ticket
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Error updating ticket'
    });
  }
};

export const purchaseTicket = async (req: Request, res: Response) => {
  try {
    const { ticket_id, quantity, attendee_details } = req.body;
    
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }
    const user_id = req.user.id;

    // Start a transaction
    const { data: ticket, error: ticketError } = await supabase
      .from('event_tickets')
      .select('*')
      .eq('id', ticket_id)
      .single();

    if (ticketError) throw new AppError(ticketError.message, 500);
    if (!ticket) throw new AppError('Ticket not found', 404);
    if (ticket.quantity_available < quantity) {
      throw new AppError('Not enough tickets available', 400);
    }

    // Create purchase record
    const { data: purchase, error: purchaseError } = await supabase
      .from('ticket_purchases')
      .insert([{
        user_id,
        ticket_id,
        quantity,
        total_amount: ticket.price * quantity,
        attendee_details
      }])
      .select()
      .single();

    if (purchaseError) throw new AppError(purchaseError.message, 500);

    // Update ticket quantity
    const { error: updateError } = await supabase
      .from('event_tickets')
      .update({ 
        quantity_available: ticket.quantity_available - quantity 
      })
      .eq('id', ticket_id);

    if (updateError) throw new AppError(updateError.message, 500);

    return res.status(200).json({
      status: 'success',
      data: purchase
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Error purchasing ticket'
    });
  }
}; 