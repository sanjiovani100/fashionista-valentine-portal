import { defineConfig } from '@/types/config';

export const apiConfig = defineConfig({
  versioning: {
    current: 'v1',
    supported: ['v1'],
    deprecationPolicy: '6 months',
    headers: {
      version: 'X-API-Version',
      deprecation: 'X-API-Deprecation'
    }
  },
  
  response: {
    pagination: {
      defaultLimit: 20,
      maxLimit: 100,
      style: 'cursor',
      fields: {
        next: 'next_cursor',
        previous: 'previous_cursor',
        total: 'total_count'
      }
    },
    caching: {
      ttl: 3600,
      strategy: 'stale-while-revalidate',
      varyBy: ['Authorization', 'Accept-Language'],
      private: ['user-specific', 'payment-info']
    }
  },

  rateLimit: {
    enabled: true,
    window: '15m',
    max: 100,
    headers: {
      remaining: 'X-RateLimit-Remaining',
      reset: 'X-RateLimit-Reset'
    },
    tiers: {
      free: {
        window: '15m',
        max: 100
      },
      pro: {
        window: '15m',
        max: 1000
      },
      enterprise: {
        window: '15m',
        max: 10000
      }
    }
  },

  endpoints: {
    events: {
      list: {
        method: 'GET',
        path: '/events',
        cache: true,
        rateLimit: true
      },
      create: {
        method: 'POST',
        path: '/events',
        validation: true,
        auth: true
      },
      update: {
        method: 'PUT',
        path: '/events/:id',
        validation: true,
        auth: true
      }
    },
    tickets: {
      purchase: {
        method: 'POST',
        path: '/tickets/purchase',
        validation: true,
        auth: true,
        idempotency: true
      }
    }
  },

  validation: {
    enabled: true,
    strict: true,
    sanitize: true,
    errorMessages: {
      required: 'This field is required',
      invalid: 'Invalid value provided'
    }
  },

  documentation: {
    enabled: true,
    format: 'openapi',
    version: '3.0.0',
    servers: [
      {
        url: 'https://api.fashionistas.com',
        description: 'Production'
      },
      {
        url: 'https://staging-api.fashionistas.com',
        description: 'Staging'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ]
  },

  monitoring: {
    metrics: {
      responseTime: true,
      statusCodes: true,
      rateLimit: true,
      cache: true
    },
    logging: {
      requests: true,
      responses: true,
      errors: true
    },
    alerts: {
      errorRate: {
        threshold: 0.05,
        window: '5m'
      },
      latency: {
        p95: 500,
        p99: 1000
      }
    }
  },

  cors: {
    enabled: true,
    origins: [
      'https://fashionistas.com',
      'https://admin.fashionistas.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    headers: ['Content-Type', 'Authorization'],
    credentials: true
  }
}); 


