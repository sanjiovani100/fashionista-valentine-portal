import { Request, Response } from 'express';
import { RegistrationService } from '@/services/registration.service';
import { ValidationError, NotFoundError, ConflictError } from '@/middleware/error-handler';
import { logger } from '@/config/logger';
import type { Database } from '@/types/database.types';

type Registration = Database['public']['Tables']['event_registrations']['Row'];
type RegistrationInsert = Database['public']['Tables']['event_registrations']['Insert'];

const registrationService = new RegistrationService();

export const createRegistration = async (req: Request, res: Response) => {
  try {
    const registrationData = {
      ...req.body,
      userId: req.user?.id
    };

    const registration = await registrationService.createRegistration(registrationData);

    res.status(201).json({
      status: 'success',
      data: registration
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
      return;
    }

    if (error instanceof ConflictError) {
      res.status(409).json({
        status: 'error',
        message: error.message
      });
      return;
    }

    logger.error('Error creating registration:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create registration'
    });
  }
};

export const confirmRegistration = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { paymentIntentId } = req.body;

    const registration = await registrationService.confirmRegistration(id, paymentIntentId);

    res.json({
      status: 'success',
      data: registration
    });
  } catch (error) {
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      res.status(error instanceof ValidationError ? 400 : 404).json({
        status: 'error',
        message: error.message
      });
      return;
    }

    logger.error('Error confirming registration:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to confirm registration'
    });
  }
};

export const cancelRegistration = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const registration = await registrationService.cancelRegistration(id);

    res.json({
      status: 'success',
      data: registration
    });
  } catch (error) {
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      res.status(error instanceof ValidationError ? 400 : 404).json({
        status: 'error',
        message: error.message
      });
      return;
    }

    logger.error('Error cancelling registration:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to cancel registration'
    });
  }
};

export const getUserRegistrations = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        status: 'error',
        message: 'User not authenticated'
      });
      return;
    }

    const registrations = await registrationService.getUserRegistrations(userId);

    res.json({
      status: 'success',
      data: registrations
    });
  } catch (error) {
    logger.error('Error retrieving user registrations:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve registrations'
    });
  }
};

export const getEventRegistrations = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const registrations = await registrationService.getEventRegistrations(eventId);

    res.json({
      status: 'success',
      data: registrations
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({
        status: 'error',
        message: error.message
      });
      return;
    }

    logger.error('Error retrieving event registrations:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve registrations'
    });
  }
};

export const getRegistrationDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const registration = await registrationService.getRegistrationDetails(id);

    res.json({
      status: 'success',
      data: registration
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({
        status: 'error',
        message: error.message
      });
      return;
    }

    logger.error('Error retrieving registration details:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve registration details'
    });
  }
};

export const updateAttendeeDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { attendeeDetails } = req.body;

    const registration = await registrationService.updateAttendeeDetails(id, attendeeDetails);

    res.json({
      status: 'success',
      data: registration
    });
  } catch (error) {
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      res.status(error instanceof ValidationError ? 400 : 404).json({
        status: 'error',
        message: error.message
      });
      return;
    }

    logger.error('Error updating attendee details:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update attendee details'
    });
  }
}; 


