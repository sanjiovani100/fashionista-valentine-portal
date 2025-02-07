import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import compression from 'compression';
import http from 'http';
import { apiRouter } from './api';
import { errorHandler } from './middleware/error-handler';
import { configureSecurityMiddleware } from './middleware/security';
import { requestLogger, errorLogger } from './middleware/logging';
import { env } from './config/env';
import { logger } from './config/logger';

const app = express();

// Configure security middleware
configureSecurityMiddleware(app);

// Logging middleware
app.use(requestLogger);

// Additional middleware
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true
}));
app.use(compression()); // Compress responses
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// API Routes
app.use('/api', apiRouter);

// Error logging - must be before error handler
app.use(errorLogger);

// Error Handler - must be after routes and error logging
app.use(errorHandler as ErrorRequestHandler);

const startServer = async () => {
  const server = http.createServer(app);

  // Graceful shutdown handler
  const shutdown = () => {
    logger.info('Shutting down server gracefully...');
    server.close(() => {
      logger.info('Server closed');
      process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
      logger.error('Force closing server');
      process.exit(1);
    }, 10000);
  };

  // Handle shutdown signals
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  return new Promise((resolve, reject) => {
    server.listen(env.PORT, () => {
      logger.info(`✨ Server running on port ${env.PORT}`);
      logger.info(`Environment: ${env.NODE_ENV}`);
      logger.info(`CORS Origin: ${env.CORS_ORIGIN}`);
      resolve(server);
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        logger.error(`⚠️ Port ${env.PORT} is already in use`);
        reject(error);
      } else {
        logger.error('Server error:', error);
        reject(error);
      }
    });
  });
};

// Start server with error handling
startServer().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
}); 