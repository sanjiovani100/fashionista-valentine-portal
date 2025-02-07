import { Request, Response } from 'express';
import { supabase } from '@/lib/supabase/config';
import { AppError } from '@/types/error';

export const listRegistrations = async (req: Request, res: Response) => {
  try {
    const { data: registrations, error } = await supabase
      .from('event_registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new AppError(error.message, 500);

    return res.status(200).json({
      status: 'success',
      data: registrations
    });
  } catch (error) {
    throw error;
  }
};

export const getRegistrationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data: registration, error } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new AppError(error.message, 500);
    if (!registration) throw new AppError('Registration not found', 404);

    return res.status(200).json({
      status: 'success',
      data: registration
    });
  } catch (error) {
    throw error;
  }
};

export const getRegistrationsByEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { data: registrations, error } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });

    if (error) throw new AppError(error.message, 500);

    return res.status(200).json({
      status: 'success',
      data: registrations
    });
  } catch (error) {
    throw error;
  }
};

export const getRegistrationsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { data: registrations, error } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new AppError(error.message, 500);

    return res.status(200).json({
      status: 'success',
      data: registrations
    });
  } catch (error) {
    throw error;
  }
};

export const createRegistration = async (req: Request, res: Response) => {
  try {
    const registrationData = req.body;

    // Check ticket availability
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', registrationData.ticket_id)
      .single();

    if (ticketError) throw new AppError(ticketError.message, 500);
    if (!ticket) throw new AppError('Ticket not found', 404);
    if (ticket.quantity_available < 1) {
      throw new AppError('Ticket is sold out', 400);
    }

    // Create registration
    const { data: registration, error } = await supabase
      .from('event_registrations')
      .insert(registrationData)
      .single();

    if (error) throw new AppError(error.message, 500);

    // Update ticket quantity
    const { error: updateError } = await supabase
      .from('tickets')
      .update({ 
        quantity_available: ticket.quantity_available - 1 
      })
      .eq('id', registrationData.ticket_id);

    if (updateError) throw new AppError(updateError.message, 500);

    return res.status(201).json({
      status: 'success',
      data: registration
    });
  } catch (error) {
    throw error;
  }
};

export const updateRegistration = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const { data: registration, error } = await supabase
      .from('event_registrations')
      .update(updateData)
      .eq('id', id)
      .single();

    if (error) throw new AppError(error.message, 500);
    if (!registration) throw new AppError('Registration not found', 404);

    return res.status(200).json({
      status: 'success',
      data: registration
    });
  } catch (error) {
    throw error;
  }
};

export const cancelRegistration = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get registration details first
    const { data: registration, error: fetchError } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw new AppError(fetchError.message, 500);
    if (!registration) throw new AppError('Registration not found', 404);

    // Get current ticket data
    const { data: ticket, error: getTicketError } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', registration.ticket_id)
      .single();

    if (getTicketError) throw new AppError(getTicketError.message, 500);
    if (!ticket) throw new AppError('Ticket not found', 404);

    // Update registration status
    const { error: updateError } = await supabase
      .from('event_registrations')
      .update({ status: 'cancelled' })
      .eq('id', id);

    if (updateError) throw new AppError(updateError.message, 500);

    // Return ticket to available pool
    const { error: ticketError } = await supabase
      .from('tickets')
      .update({ 
        quantity_available: ticket.quantity_available + 1 
      })
      .eq('id', registration.ticket_id);

    if (ticketError) throw new AppError(ticketError.message, 500);

    return res.status(200).json({
      status: 'success',
      message: 'Registration cancelled successfully'
    });
  } catch (error) {
    throw error;
  }
}; 