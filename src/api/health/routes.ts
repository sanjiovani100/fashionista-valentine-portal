import { Router } from 'express';
import { supabase } from '@/lib/supabase/config';
import { env } from '@/config/env';
import { logger } from '@/config/logger';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.NODE_ENV,
      services: {
        api: 'up',
        database: env.NODE_ENV === 'development' ? 'mock' : 'unknown'
      },
      mode: env.NODE_ENV === 'development' ? 'mock' : 'live'
    };

    // Only check real database in production
    if (env.NODE_ENV === 'production') {
      try {
        const { data, error } = await supabase
          .from('health_check')
          .select('count')
          .single();

        health.services.database = error ? 'down' : 'up';
        if (error) {
          logger.warn('Database health check failed:', error);
        }
      } catch (err) {
        logger.error('Database health check error:', err);
        health.services.database = 'down';
      }
    }

    // Always return 200 in development
    const statusCode = env.NODE_ENV === 'development' ? 200 : 
      (health.services.database === 'down' ? 503 : 200);
    
    res.status(statusCode).json(health);
  } catch (err) {
    logger.error('Health check error:', err);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: err instanceof Error ? err.message : 'Unknown error',
      mode: env.NODE_ENV === 'development' ? 'mock' : 'live'
    });
  }
});

export { router as healthRoutes }; 