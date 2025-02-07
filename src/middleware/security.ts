import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from '@/config/env';
import { Router } from 'express';

export const configureSecurityMiddleware = (router: Router): void => {
  // Basic security headers
  router.use(helmet({
    contentSecurityPolicy: env.NODE_ENV === 'production',
    crossOriginEmbedderPolicy: env.NODE_ENV === 'production',
    crossOriginOpenerPolicy: env.NODE_ENV === 'production',
    crossOriginResourcePolicy: env.NODE_ENV === 'production',
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      status: 'error',
      message: 'Too many requests, please try again later.'
    }
  });

  // Apply rate limiting to all routes
  router.use(limiter);

  // CORS configuration is handled in server.ts

  // Prevent clickjacking
  router.use(helmet.frameguard({ action: 'deny' }));

  // Disable X-Powered-By header
  router.use(helmet.hidePoweredBy());

  // Prevent MIME type sniffing
  router.use(helmet.noSniff());

  // XSS protection
  router.use(helmet.xssFilter());

  // HTTP Strict Transport Security
  if (env.NODE_ENV === 'production') {
    router.use(helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }));
  }

  // Validate content types
  router.use((req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
      const contentType = req.headers['content-type'];
      if (!contentType || !contentType.includes('application/json')) {
        return res.status(415).json({
          status: 'error',
          message: 'Unsupported Media Type - API only accepts application/json'
        });
      }
    }
    next();
  });
}; 