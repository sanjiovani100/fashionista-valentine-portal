import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/types/error';
import { logger } from '@/config/logger';
import { ZodError } from 'zod';
import { env } from '@/config/env';

interface ErrorResponse {
  status: string;
  message: string;
  code?: string;
  details?: unknown;
  stack?: string;
}

export const errorHandler = (
  error: Error | AppError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  const errorResponse: ErrorResponse = {
    status: 'error',
    message: 'Internal server error'
  };

  // Log error with request details
  logger.error('Error occurred:', {
    error: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userId: req.user?.id
  });

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    errorResponse.status = error.status;
    errorResponse.message = error.message;
    errorResponse.code = error.code;
  } else if (error instanceof ZodError) {
    statusCode = 400;
    errorResponse.message = 'Validation failed';
    errorResponse.details = error.errors;
  } else if (error.name === 'UnauthorizedError') {
    statusCode = 401;
    errorResponse.message = 'Authentication required';
  }

  // Include stack trace in development
  if (env.NODE_ENV === 'development') {
    errorResponse.stack = error.stack;
  }

  // Send error response
  res.status(statusCode).json(errorResponse);
};

// Custom error types
export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR');
    this.details = details;
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Permission denied') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
  }
} 