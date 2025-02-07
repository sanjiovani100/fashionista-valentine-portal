import { Router } from 'express';
import { eventRoutes } from './events/routes';
import { ticketRoutes } from './tickets/routes';
import { registrationRoutes } from './registrations/routes';
import { healthRoutes } from './health/routes';

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