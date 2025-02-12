import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '@/middleware/validate-request';
import { requireAuth } from '@/middleware/require-auth';
import {
  createRegistration,
  confirmRegistration,
  cancelRegistration,
  getUserRegistrations,
  getEventRegistrations,
  getRegistrationDetails,
  updateAttendeeDetails
} from './controllers';

const router = Router();

// Validation schemas
const attendeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  dietaryRequirements: z.array(z.string()).optional(),
  specialRequirements: z.string().optional()
});

const registrationSchema = z.object({
  eventId: z.string().uuid('Invalid event ID'),
  ticketId: z.string().uuid('Invalid ticket ID'),
  attendeeDetails: z.array(attendeeSchema).min(1, 'At least one attendee is required'),
  paymentIntentId: z.string().optional()
});

const confirmationSchema = z.object({
  paymentIntentId: z.string()
});

const attendeeUpdateSchema = z.object({
  attendeeDetails: z.array(attendeeSchema).min(1, 'At least one attendee is required')
});

// Routes
router.post('/',
  requireAuth,
  validateRequest({ body: registrationSchema }),
  createRegistration
);

router.post('/:id/confirm',
  requireAuth,
  validateRequest({ body: confirmationSchema }),
  confirmRegistration
);

router.post('/:id/cancel',
  requireAuth,
  cancelRegistration
);

router.get('/user',
  requireAuth,
  getUserRegistrations
);

router.get('/event/:eventId',
  requireAuth,
  getEventRegistrations
);

router.get('/:id',
  requireAuth,
  getRegistrationDetails
);

router.patch('/:id/attendees',
  requireAuth,
  validateRequest({ body: attendeeUpdateSchema }),
  updateAttendeeDetails
);

export { router as registrationRoutes }; 


