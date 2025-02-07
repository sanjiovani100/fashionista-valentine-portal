import { Request, Response, NextFunction } from 'express';
import { logger } from '@/config/logger';
import { env } from '@/config/env';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Log request
  logger.info('Incoming request', {
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip,
    userAgent: req.get('user-agent'),
    userId: req.user?.id
  });

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logLevel = res.statusCode >= 400 ? 'error' : 'info';

    logger[logLevel]('Request completed', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration,
      userId: req.user?.id
    });

    // Performance monitoring
    if (duration > env.PERFORMANCE_THRESHOLD) {
      logger.warn('Slow request detected', {
        method: req.method,
        path: req.path,
        duration,
        threshold: env.PERFORMANCE_THRESHOLD
      });
    }
  });

  next();
};

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error occurred', {
    error: err.message,
    stack: env.NODE_ENV === 'development' ? err.stack : undefined,
    method: req.method,
    path: req.path,
    userId: req.user?.id
  });

  next(err);
}; 