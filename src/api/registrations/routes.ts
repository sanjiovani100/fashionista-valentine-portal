import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '@/middleware/validate-request';
import { requireAuth } from '@/middleware/require-auth';
import {
  listRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  cancelRegistration,
  getRegistrationsByEvent,
  getRegistrationsByUser
} from './controllers';

const router = Router();

// Validation schemas
const registrationSchema = z.object({
  event_id: z.string().uuid(),
  ticket_id: z.string().uuid(),
  attendee_details: z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    dietary_requirements: z.string().optional(),
    accessibility_needs: z.string().optional()
  }),
  payment_status: z.enum(['pending', 'completed', 'failed']),
  payment_method: z.enum(['credit_card', 'bank_transfer', 'paypal']),
  special_requests: z.string().optional()
});

const updateRegistrationSchema = z.object({
  attendee_details: z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    dietary_requirements: z.string().optional(),
    accessibility_needs: z.string().optional()
  }).optional(),
  special_requests: z.string().optional()
});

// Routes
router.get('/', requireAuth, listRegistrations);
router.get('/:id', requireAuth, getRegistrationById);
router.get('/event/:eventId', requireAuth, getRegistrationsByEvent);
router.get('/user/:userId', requireAuth, getRegistrationsByUser);

router.post('/',
  requireAuth,
  validateRequest({ body: registrationSchema }),
  createRegistration
);

router.put('/:id',
  requireAuth,
  validateRequest({ body: updateRegistrationSchema }),
  updateRegistration
);

router.delete('/:id',
  requireAuth,
  cancelRegistration
);

export { router as registrationRoutes }; 