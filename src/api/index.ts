import { Router } from 'express';
import { eventRoutes } from './events/routes.js';
import { ticketRoutes } from './tickets/routes.js';
import { registrationRoutes } from './registrations/routes.js';
import { healthRoutes } from './health/routes.js';

const router = Router();

// Health check endpoint
router.use('/health', healthRoutes);

// API Routes
router.use('/events', eventRoutes);
router.use('/tickets', ticketRoutes);
router.use('/registrations', registrationRoutes);

// 404 Handler
router.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

export { router as apiRouter }; 


