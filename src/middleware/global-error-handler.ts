import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.js';
import { AppError, ValidationError, NotFoundError, DatabaseError } from './error-handler.js';
import { ErrorReportingService } from '../services/error-reporting.service.ts';

// Extend Express Request to include startTime and user
declare global {
  namespace Express {
    interface Request {
      startTime?: number;
      user?: { id: string };
    }
  }
}

interface ErrorResponse {
  status: number;
  message: string;
  code?: string;
  details?: unknown;
  stack?: string;
  errorId?: string;
}

export class GlobalErrorHandler {
  private errorReportingService: ErrorReportingService;
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.errorReportingService = new ErrorReportingService();
  }

  private formatError(error: Error): ErrorResponse {
    if (error instanceof ValidationError) {
      return {
        status: 400,
        message: error.message,
        code: 'VALIDATION_ERROR',
        details: error.details,
        stack: this.isDevelopment ? error.stack : undefined
      };
    }

    if (error instanceof NotFoundError) {
      return {
        status: 404,
        message: error.message,
        code: 'NOT_FOUND',
        stack: this.isDevelopment ? error.stack : undefined
      };
    }

    if (error instanceof DatabaseError) {
      return {
        status: 503,
        message: error.message,
        code: 'DATABASE_ERROR',
        stack: this.isDevelopment ? error.stack : undefined
      };
    }

    // Default unknown error
    return {
      status: 500,
      message: this.isDevelopment ? error.message : 'Internal Server Error',
      code: 'INTERNAL_ERROR',
      stack: this.isDevelopment ? error.stack : undefined
    };
  }

  public handleError = async (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const startTime = req.startTime || Date.now();
    const responseTime = Date.now() - startTime;

    // Report error with request context
    const context = {
      url: req.url,
      method: req.method,
      headers: req.headers,
      query: req.query,
      body: req.body,
      userId: req.user?.id,
      responseTime
    };

    const errorReport = this.errorReportingService.report(error, context);

    // Format error response
    const errorResponse = this.formatError(error);
    
    // Add error report ID to response for tracking
    errorResponse.errorId = errorReport.id;

    res.status(errorResponse.status).json(errorResponse);
  };

  public handleUncaughtException = (error: Error): void => {
    this.errorReportingService.report(error, { type: 'uncaughtException' });
    logger.error('Uncaught Exception:', error);
    process.exit(1);
  };

  public handleUnhandledRejection = (reason: any): void => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    this.errorReportingService.report(error, { type: 'unhandledRejection' });
    logger.error('Unhandled Rejection:', error);
    process.exit(1);
  };
} 