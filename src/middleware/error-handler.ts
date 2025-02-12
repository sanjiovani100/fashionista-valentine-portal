import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.js';

export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public details?: unknown) {
    super(message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err);

  if (err instanceof AppError) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }

  // Default error response
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};

// Custom error types
export class AuthenticationError extends AppError {
  constructor(message = 'Authentication required') {
    super(message);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Permission denied') {
    super(message);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message);
  }
} 


