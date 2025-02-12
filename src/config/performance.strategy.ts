import { defineConfig } from '@/types/config';

export const performanceStrategy = defineConfig({
  frontend: {
    metrics: {
      core: {
        fcp: { threshold: 1500, weight: 30 },  // First Contentful Paint
        lcp: { threshold: 2500, weight: 25 },  // Largest Contentful Paint
        fid: { threshold: 100, weight: 15 },   // First Input Delay
        cls: { threshold: 0.1, weight: 15 },   // Cumulative Layout Shift
        ttfb: { threshold: 600, weight: 15 }   // Time to First Byte
      },
      custom: {
        imageLoadTime: { threshold: 1000 },
        fontLoadTime: { threshold: 800 },
        scriptExecutionTime: { threshold: 500 },
        resourceCaching: { hitRate: 0.9 },
        apiResponseTime: { threshold: 1000 }
      }
    },
    optimization: {
      images: {
        compression: true,
        lazyLoading: true,
        srcset: true,
        webp: true
      },
      javascript: {
        bundleSizeLimit: '250kb',
        chunkSizeLimit: '50kb',
        treeshaking: true,
        lazyLoading: true
      },
      css: {
        minification: true,
        purge: true,
        criticalInline: true
      },
      caching: {
        staticAssets: '30d',
        api: '5m',
        html: 'no-cache'
      }
    }
  },

  backend: {
    metrics: {
      response: {
        p50: { threshold: 100 },
        p90: { threshold: 500 },
        p95: { threshold: 800 },
        p99: { threshold: 1500 }
      },
      database: {
        queryTime: { threshold: 100 },
        connectionPool: { usage: 0.8 },
        indexUsage: { minimum: 0.9 }
      },
      memory: {
        usage: { threshold: 0.85 },
        gc: { frequency: '5m' }
      }
    },
    optimization: {
      caching: {
        strategy: 'multilevel',
        layers: ['memory', 'redis'],
        ttl: {
          short: '5m',
          medium: '1h',
          long: '1d'
        }
      },
      queries: {
        optimization: true,
        parameterization: true,
        indexing: true
      }
    }
  },

  infrastructure: {
    scaling: {
      auto: {
        enabled: true,
        metrics: ['cpu', 'memory', 'requests'],
        thresholds: {
          cpu: 0.7,
          memory: 0.8,
          requests: 1000
        }
      },
      manual: {
        schedule: {
          peak: '9-17',
          offPeak: '17-9'
        }
      }
    },
    resources: {
      cpu: {
        request: '0.5',
        limit: '2'
      },
      memory: {
        request: '512Mi',
        limit: '2Gi'
      }
    }
  },

  monitoring: {
    collection: {
      interval: '1m',
      retention: '90d'
    },
    alerting: {
      channels: ['slack', 'email'],
      thresholds: {
        critical: {
          responseTime: '>2s',
          errorRate: '>1%',
          availability: '<99.9%'
        },
        warning: {
          responseTime: '>1s',
          errorRate: '>0.1%',
          availability: '<99.95%'
        }
      }
    },
    reporting: {
      daily: ['performance', 'errors', 'availability'],
      weekly: ['trends', 'patterns', 'recommendations'],
      monthly: ['sla', 'optimization', 'capacity']
    }
  },

  testing: {
    load: {
      scenarios: ['peak', 'normal', 'stress'],
      metrics: ['response', 'error', 'throughput'],
      thresholds: {
        response: {
          p95: '2s',
          p99: '5s'
        }
      }
    },
    synthetic: {
      frequency: '5m',
      locations: ['us-east', 'eu-west', 'ap-south'],
      scenarios: ['critical-path', 'checkout']
    }
  }
}); 


