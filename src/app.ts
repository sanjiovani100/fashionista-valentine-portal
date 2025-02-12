import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { env } from '@/config/env';
import { errorHandler } from '@/middleware/error-handler';
import { eventRoutes } from '@/api/events/routes';
import { registrationRoutes } from '@/api/registrations/routes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

// Error handling
app.use(errorHandler);

export { app }; 


