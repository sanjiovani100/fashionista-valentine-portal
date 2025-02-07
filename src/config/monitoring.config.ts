import { defineConfig } from '@/types/config';

export const monitoringConfig = defineConfig({
  metrics: {
    collection: {
      interval: '1m',
      retention: '90d',
      sampling: {
        rate: 0.1,
        priority: ['error', 'critical']
      }
    },
    alerts: {
      responseTime: '>2s',
      errorRate: '>1%',
      cpuUsage: '>80%',
      memoryUsage: '>85%',
      diskSpace: '>90%'
    },
    thresholds: {
      api: {
        p95ResponseTime: 800,
        p99ResponseTime: 1500,
        errorBudget: 0.1 // 0.1% error budget
      },
      database: {
        queryTimeout: 5000,
        connectionPoolUsage: 80,
        replicationLag: '10s'
      }
    }
  },
  
  analytics: {
    tracking: {
      pageViews: true,
      events: true,
      userJourney: true,
      performance: true,
      errors: true
    },
    reporting: {
      daily: [
        'sales',
        'registrations',
        'activeUsers',
        'ticketsSold'
      ],
      weekly: [
        'trends',
        'performance',
        'userRetention',
        'eventPopularity'
      ],
      monthly: [
        'revenue',
        'growth',
        'churn',
        'customerLifetimeValue'
      ]
    },
    realtime: {
      enabled: true,
      metrics: [
        'activeUsers',
        'ticketSales',
        'eventRegistrations',
        'pageViews'
      ]
    }
  },

  logging: {
    level: 'info',
    format: 'json',
    destinations: ['console', 'file', 'cloudWatch'],
    rotation: {
      size: '100m',
      interval: '1d',
      maxFiles: 30
    },
    context: {
      includeTimestamp: true,
      includeRequestId: true,
      includePid: true
    }
  },

  tracing: {
    enabled: true,
    sampler: {
      type: 'probabilistic',
      value: 0.1
    },
    exporters: ['jaeger', 'zipkin'],
    tags: [
      'service',
      'environment',
      'version',
      'userId'
    ]
  },

  healthChecks: {
    enabled: true,
    interval: '30s',
    timeout: '5s',
    services: [
      'database',
      'cache',
      'storage',
      'email',
      'payment'
    ]
  },

  dashboards: {
    refresh: '5m',
    defaultTimeRange: '24h',
    panels: [
      'systemMetrics',
      'businessMetrics',
      'userMetrics',
      'errorMetrics'
    ]
  }
}); 