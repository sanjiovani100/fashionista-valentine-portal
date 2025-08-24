import express from 'express';
import cors from 'cors';
import { GlobalErrorHandler } from './middleware/global-error-handler.js';
import { HealthService } from './services/health.service.js';
import { ErrorReportingService } from './services/error-reporting.service.js';
import { RecoveryService } from './services/recovery.service.js';
import { logger } from './config/logger.js';

export class Server {
  private app: express.Application;
  private healthService: HealthService;
  private errorHandler: GlobalErrorHandler;
  private recoveryService: RecoveryService;
  private port: number;

  constructor() {
    this.app = express();
    this.healthService = new HealthService();
    this.errorHandler = new GlobalErrorHandler();
    this.recoveryService = new RecoveryService();
    this.port = 0; // Will be set in start()
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
    
    // Add request start time to all requests
    this.app.use((req, res, next) => {
      req.startTime = Date.now();
      next();
    });
  }

  private setupRoutes(): void {
    // Root route
    this.app.get('/', (req, res) => {
      res.json({ message: 'Server is running' });
    });

    // Health check endpoint
    this.app.get('/health', async (req, res) => {
      try {
        const health = await this.healthService.getStatus(this.port);
        res.json(health);
      } catch (error) {
        this.errorHandler.handleError(error as Error, req, res, () => {});
      }
    });

    // Error metrics endpoint
    this.app.get('/metrics/errors', async (req, res) => {
      try {
        const errorReportingService = new ErrorReportingService();
        const timeframe = req.query.timeframe ? parseInt(req.query.timeframe as string) : undefined;
        const metrics = errorReportingService.getMetrics(timeframe);
        res.json(metrics);
      } catch (error) {
        this.errorHandler.handleError(error as Error, req, res, () => {});
      }
    });

    // Recent errors endpoint (protected, admin only)
    this.app.get('/admin/errors', async (req, res) => {
      try {
        const errorReportingService = new ErrorReportingService();
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
        const errors = errorReportingService.getRecentErrors(limit);
        res.json(errors);
      } catch (error) {
        this.errorHandler.handleError(error as Error, req, res, () => {});
      }
    });
  }

  private setupErrorHandling(): void {
    // Register error handler middleware
    this.app.use(this.errorHandler.handleError);

    // Register global handlers
    process.on('uncaughtException', this.errorHandler.handleUncaughtException);
    process.on('unhandledRejection', this.errorHandler.handleUnhandledRejection);
  }

  public async start(port: number): Promise<void> {
    this.port = port;
    return new Promise((resolve, reject) => {
      try {
        const server = this.app.listen(port, () => {
          logger.info(`Server started on port ${port}`);
          resolve();
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
          logger.info('SIGTERM signal received. Closing server...');
          server.close(() => {
            logger.info('Server closed');
            process.exit(0);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}

// Create and export the server instance
export async function startServer(port: number): Promise<express.Application> {
  const server = new Server();
  await server.start(port);
  return server.getApp();
} 


