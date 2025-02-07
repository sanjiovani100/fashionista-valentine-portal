import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../../middleware/validate-request';
import { requireAuth } from '../../middleware/require-auth';
import { 
  listEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from './controllers';

const router = Router();

// Validation schemas
const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  venue: z.string().min(1, 'Venue is required'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  registration_deadline: z.string().datetime(),
  theme: z.string().min(1, 'Theme is required'),
  meta_description: z.string().optional(),
  meta_keywords: z.array(z.string()).optional(),
  venue_features: z.object({
    pool_specs: z.object({
      dimensions: z.string(),
      depth: z.string(),
      temperature: z.string()
    }).optional(),
    changing_facilities: z.object({
      capacity: z.number(),
      amenities: z.array(z.string())
    }).optional(),
    photography_zones: z.array(z.object({
      name: z.string(),
      capacity: z.number(),
      equipment_allowed: z.array(z.string())
    })).optional()
  }).optional()
});

// Routes
router.get('/', listEvents);
router.get('/:id', getEventById);

router.post('/',
  requireAuth,
  validateRequest({ body: eventSchema }),
  createEvent
);

router.put('/:id',
  requireAuth,
  validateRequest({ body: eventSchema }),
  updateEvent
);

router.delete('/:id',
  requireAuth,
  deleteEvent
);

export { router as eventRoutes }; 