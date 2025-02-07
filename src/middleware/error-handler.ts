import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/types/error';

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const status = error instanceof AppError ? error.status : 'error';

  res.status(statusCode).json({
    status,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
}; 