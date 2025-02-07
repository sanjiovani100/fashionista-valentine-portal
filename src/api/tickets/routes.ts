import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '@/middleware/validate-request';
import { requireAuth } from '@/middleware/require-auth';
import {
  listTickets,
  getTicketById,
  createTicket,
  updateTicket,
  purchaseTicket,
  getTicketsByEvent
} from './controllers';
import { sponsorTicketRoutes } from './sponsor-routes';

const router = Router();

// Validation schemas
const ticketSchema = z.object({
  event_id: z.string().uuid(),
  type: z.enum(['regular', 'vip', 'early_bird']),
  price: z.number().positive(),
  quantity: z.number().positive()
});

const purchaseSchema = z.object({
  ticket_id: z.string().uuid(),
  quantity: z.number().min(1, 'Must purchase at least one ticket'),
  attendee_details: z.array(z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional()
  }))
});

// Routes
router.get('/', listTickets);
router.get('/:id', getTicketById);
router.get('/event/:eventId', getTicketsByEvent);

router.post('/',
  requireAuth,
  validateRequest({ body: ticketSchema }),
  createTicket
);

router.put('/:id',
  requireAuth,
  validateRequest({ body: ticketSchema }),
  updateTicket
);

router.post('/purchase',
  requireAuth,
  validateRequest({ body: purchaseSchema }),
  purchaseTicket
);

// Sponsor ticket routes
router.use('/sponsor', sponsorTicketRoutes);

export { router as ticketRoutes }; 