import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/types/error';
import { logError } from '@/lib/logger';
import config from '@/config';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  // Log the error
  logError(err, req);

  // Default error
  let statusCode = 500;
  let status = 'error';
  let message = 'Internal server error';
  let stack: string | undefined;

  // Handle known errors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    status = err.status;
    message = err.message;
  }

  // Include stack trace in development
  if (config.server.isDevelopment) {
    stack = err.stack;
  }

  // Send error response
  res.status(statusCode).json({
    status,
    message,
    ...(stack && { stack }),
  });
} 


