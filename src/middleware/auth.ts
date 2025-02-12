import { Request, Response, NextFunction } from 'express';
import { supabase } from '@/lib/supabase';
import { AuthenticationError, AuthorizationError } from '@/types/error';
import { logSecurity } from '@/lib/logger';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

// Middleware to verify JWT and set user in request
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Get JWT from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AuthenticationError('No token provided');
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      logSecurity('Authentication failed', false, { error });
      throw new AuthenticationError('Invalid token');
    }

    // Set user in request
    req.user = {
      id: user.id,
      email: user.email || '',
      role: user.role || 'user',
    };

    logSecurity('Authentication successful', true, { userId: user.id });
    next();
  } catch (error) {
    next(error);
  }
}

// Middleware to check if user has required role
export function authorize(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new AuthenticationError();
      }

      if (!roles.includes(req.user.role)) {
        logSecurity('Authorization failed', false, {
          userId: req.user.id,
          requiredRoles: roles,
          userRole: req.user.role,
        });
        throw new AuthorizationError('Insufficient permissions');
      }

      logSecurity('Authorization successful', true, {
        userId: req.user.id,
        role: req.user.role,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

// Middleware to validate request origin
export function validateOrigin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const origin = req.get('origin');
    if (!origin) {
      throw new AuthenticationError('Origin not provided');
    }

    // Add your origin validation logic here
    // For example, check against a whitelist of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'https://your-production-domain.com',
    ];

    if (!allowedOrigins.includes(origin)) {
      logSecurity('Invalid origin', false, { origin });
      throw new AuthenticationError('Invalid origin');
    }

    next();
  } catch (error) {
    next(error);
  }
}

// Middleware to validate API key
export function validateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
      throw new AuthenticationError('API key not provided');
    }

    // Add your API key validation logic here
    // For example, check against a list of valid API keys or verify with your auth service

    next();
  } catch (error) {
    next(error);
  }
} 


