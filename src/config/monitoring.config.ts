import { defineConfig } from '@/types/config';
import { env } from './env';

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
      diskSpace: '>90%',
      databaseConnections: '>80%',
      cacheHitRate: '<85%',
      apiErrorRate: '>0.1%',
      paymentFailureRate: '>0.1%',
      performance: {
        responseTime: {
          threshold: env.PERFORMANCE_THRESHOLD || 1000,
          alert: true
        },
        memoryUsage: {
          threshold: 80, // percentage
          alert: true
        },
        cpuUsage: {
          threshold: 70, // percentage
          alert: true
        }
      },
      errors: {
        threshold: 5, // errors per minute
        alert: true,
        ignore: [
          'ResizeObserver loop limit exceeded',
          'Network request failed'
        ]
      },
      api: {
        timeout: 5000,
        errorThreshold: 1, // percentage
        slowRequestThreshold: 2000
      },
      ux: {
        firstContentfulPaint: 1000,
        largestContentfulPaint: 2500,
        firstInputDelay: 100,
        cumulativeLayoutShift: 0.1
      }
    },
    thresholds: {
      api: {
        p95ResponseTime: 800,
        p99ResponseTime: 1500,
        errorBudget: 0.1,
        maxConcurrentRequests: 1000,
        rateLimit: 100,
        timeoutMs: 30000
      },
      database: {
        queryTimeout: 5000,
        connectionPoolUsage: 80,
        replicationLag: '10s',
        maxConnections: 100,
        queryCache: '1h',
        slowQueryMs: 1000
      },
      frontend: {
        firstContentfulPaint: 1500,
        timeToInteractive: 3000,
        largestContentfulPaint: 2500,
        cumulativeLayoutShift: 0.1,
        firstInputDelay: 100
      }
    }
  },
  
  analytics: {
    tracking: {
      pageViews: true,
      events: true,
      userJourney: true,
      performance: true,
      errors: true,
      userBehavior: true,
      conversion: true,
      engagement: true,
      retention: true
    },
    reporting: {
      daily: [
        'sales',
        'registrations',
        'activeUsers',
        'ticketsSold',
        'conversionRate',
        'bounceRate',
        'averageSessionDuration',
        'errorRate'
      ],
      weekly: [
        'trends',
        'performance',
        'userRetention',
        'eventPopularity',
        'userGrowth',
        'featureUsage',
        'systemHealth',
        'securityIncidents'
      ],
      monthly: [
        'revenue',
        'growth',
        'churn',
        'customerLifetimeValue',
        'infrastructureCosts',
        'systemEfficiency',
        'serviceAvailability',
        'complianceStatus'
      ]
    },
    realtime: {
      enabled: true,
      metrics: [
        'activeUsers',
        'ticketSales',
        'eventRegistrations',
        'pageViews',
        'systemLoad',
        'errorCount',
        'responseTime',
        'concurrentUsers'
      ]
    }
  },

  logging: {
    level: env.LOG_LEVEL || 'info',
    format: env.NODE_ENV === 'development' ? 'pretty' : 'json',
    destinations: ['console', 'file', 'cloudWatch'],
    rotation: {
      size: '100m',
      interval: '1d',
      maxFiles: 30
    },
    context: {
      includeTimestamp: true,
      includeRequestId: true,
      includePid: true,
      includeUserAgent: true,
      includePerformanceMetrics: true,
      includeMemoryUsage: true
    },
    retention: '30d',
    maxFiles: 10,
    maxSize: '10m'
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
      'userId',
      'region',
      'instanceId',
      'deploymentId',
      'featureFlags'
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
      'payment',
      'search',
      'notification',
      'queue',
      'cdn'
    ],
    thresholds: {
      unhealthyCount: 3,
      recoveryTime: '5m',
      degradedPerformance: '50%'
    }
  },

  dashboards: {
    refresh: '5m',
    defaultTimeRange: '24h',
    panels: [
      'systemMetrics',
      'businessMetrics',
      'userMetrics',
      'errorMetrics',
      'securityMetrics',
      'performanceMetrics',
      'costMetrics',
      'complianceMetrics'
    ],
    customization: {
      enabled: true,
      saveLayouts: true,
      exportData: true,
      alerting: true
    }
  },

  anomalyDetection: {
    enabled: true,
    sensitivity: 'medium',
    metrics: [
      'errorRate',
      'responseTime',
      'userBehavior',
      'systemLoad'
    ],
    actions: [
      'alert',
      'incident',
      'autoScale'
    ]
  },

  costMonitoring: {
    enabled: true,
    budgets: {
      infrastructure: 1000,
      services: 2000,
      total: 5000
    },
    alerts: {
      threshold: 80,
      forecast: true
    }
  },

  alerts: {
    channels: ['email', 'slack'],
    throttle: {
      period: '5m',
      limit: 10
    },
    templates: {
      performance: {
        title: 'Performance Alert',
        body: 'Performance threshold exceeded: {{metric}} = {{value}}'
      },
      error: {
        title: 'Error Alert',
        body: 'Error rate threshold exceeded: {{count}} errors in last {{period}}'
      }
    }
  },
  
  reporting: {
    enabled: true,
    interval: '1d',
    metrics: [
      'responseTime',
      'errorRate',
      'apiUsage',
      'userSessions'
    ],
    retention: '90d'
  }
}); 


