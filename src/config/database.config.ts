import { defineConfig } from '@/types/config';

export const databaseConfig = defineConfig({
  pooling: {
    min: 2,
    max: 10,
    idleTimeoutMillis: 30000,
    acquireTimeoutMillis: 60000,
    reapIntervalMillis: 1000,
    createTimeoutMillis: 30000,
    createRetryIntervalMillis: 200,
    propagateCreateError: false
  },
  
  backup: {
    frequency: '24h',
    retention: '30d',
    type: 'incremental',
    compression: true,
    location: {
      primary: 's3://fashionistas-backup',
      secondary: 's3://fashionistas-backup-dr'
    },
    encryption: {
      enabled: true,
      algorithm: 'AES-256'
    }
  },
  
  monitoring: {
    queryTimeout: 5000,
    slowQueryThreshold: 1000,
    deadlockDetection: true,
    connectionMonitoring: true,
    metrics: {
      enabled: true,
      collection: {
        interval: '1m',
        retention: '90d'
      }
    }
  },

  replication: {
    enabled: true,
    strategy: 'async',
    readReplicas: 2,
    maxLagSeconds: 10,
    failover: {
      automatic: true,
      maxAttempts: 3
    }
  },

  maintenance: {
    vacuum: {
      enabled: true,
      frequency: '7d',
      threshold: 1000
    },
    analyze: {
      enabled: true,
      frequency: '24h'
    },
    indexes: {
      reindex: {
        enabled: true,
        frequency: '7d'
      }
    }
  },

  security: {
    encryption: {
      atRest: true,
      inTransit: true
    },
    audit: {
      enabled: true,
      level: 'write',
      retention: '90d'
    },
    access: {
      restrictedTables: [
        'users',
        'payments',
        'audit_logs'
      ]
    }
  },

  performance: {
    queryCache: {
      enabled: true,
      size: '100mb',
      ttl: '1h'
    },
    preparedStatements: {
      enabled: true,
      cache: {
        size: 1000,
        ttl: '24h'
      }
    },
    optimization: {
      autoVacuum: true,
      statementTimeout: '30s',
      lockTimeout: '5s'
    }
  }
}); 


