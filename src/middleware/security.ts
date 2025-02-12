import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from '@/config/env';
import { Router, Request, Response, NextFunction } from 'express';
import { logger } from '@/config/logger';

// Cache allowed origins for better performance
const allowedOriginsSet = new Set(env.CORS_ORIGIN.split(',').map(o => o.trim()));

// CORS headers that need to be managed
const CORS_HEADERS = [
  'access-control-allow-origin',
  'access-control-allow-methods',
  'access-control-allow-headers',
  'access-control-allow-credentials',
  'access-control-max-age'
];

export const configureSecurityMiddleware = (router: Router): void => {
  // Custom CORS middleware
  router.use((req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;

    // Skip CORS for requests without origin
    if (!origin) {
      return next();
    }

    // Check if origin is allowed
    const isAllowedOrigin = allowedOriginsSet.has(origin) || allowedOriginsSet.has('*');

    // Create a new response object to handle headers
    const originalSetHeader = res.setHeader.bind(res);
    res.setHeader = function(name: string, value: any) {
      if (name.toLowerCase().startsWith('access-control-') && !isAllowedOrigin) {
        return res;
      }
      return originalSetHeader(name, value);
    };

    if (isAllowedOrigin) {
      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Max-Age', '86400');
        return res.status(204).end();
      }

      // Handle actual requests
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    next();
  });

  // Helmet Security Headers
  router.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", process.env.SUPABASE_URL || ''],
        fontSrc: ["'self'", 'https:', 'data:'],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: env.NODE_ENV === 'production',
    crossOriginOpenerPolicy: env.NODE_ENV === 'production',
    crossOriginResourcePolicy: env.NODE_ENV === 'production',
    dnsPrefetchControl: { allow: false },
    frameguard: { action: 'deny' },
    hidePoweredBy: true,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    ieNoOpen: true,
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    xssFilter: true,
  }));

  // Rate Limiting
  const limiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    keyGenerator: (req) => {
      return (req.headers['x-forwarded-for']?.toString() || req.ip || 'unknown-ip');
    },
    handler: (req, res) => {
      logger.warn('Rate limit exceeded', {
        ip: req.ip,
        path: req.path,
        method: req.method
      });
      res.status(429).json({
        status: 'error',
        message: 'Too many requests, please try again later.',
        retryAfter: Math.ceil(env.RATE_LIMIT_WINDOW_MS / 1000)
      });
    }
  });

  // Apply rate limiting to all routes
  router.use(limiter);

  // Security Middleware for Request Validation
  router.use((req, res, next) => {
    // Check Content-Length header
    const contentLength = parseInt(req.headers['content-length'] || '0');
    if (contentLength > 1 * 1024 * 1024) { // 1MB limit
      return res.status(413).json({
        status: 'error',
        message: 'Request entity too large'
      });
    }

    // Validate Content-Type for requests with body
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      const contentType = req.headers['content-type'];
      if (!contentType || !contentType.includes('application/json')) {
        return res.status(415).json({
          status: 'error',
          message: 'Unsupported Media Type - API only accepts application/json'
        });
      }
    }

    // Add security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    if (env.NODE_ENV === 'production') {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }

    next();
  });

  // Prevent parameter pollution
  router.use((req, res, next) => {
    const cleanQuery = (obj: Record<string, any>) => {
      Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
          obj[key] = obj[key][0];
        }
      });
    };

    if (req.query) cleanQuery(req.query);
    if (req.body) cleanQuery(req.body);
    next();
  });

  // CORS monitoring in production
  if (env.NODE_ENV === 'production') {
    router.use((req, res, next) => {
      const origin = req.headers.origin;
      if (origin && !allowedOriginsSet.has(origin) && !allowedOriginsSet.has('*')) {
        logger.warn('Unauthorized CORS attempt:', {
          origin,
          path: req.path,
          method: req.method
        });
      }
      next();
    });
  }

  // Error boundary for CORS
  router.use((err: Error, req: any, res: any, next: any) => {
    logger.error('CORS error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
}; 


