import { defineConfig } from '@/types/config';

export const deploymentConfig = defineConfig({
  environments: {
    development: {
      url: 'dev.fashionistas.com',
      autoDeployBranch: 'develop',
      variables: {
        NODE_ENV: 'development',
        LOG_LEVEL: 'debug'
      },
      resources: {
        cpu: '0.5',
        memory: '1Gi',
        replicas: 1
      }
    },
    staging: {
      url: 'staging.fashionistas.com',
      autoDeployBranch: 'staging',
      variables: {
        NODE_ENV: 'staging',
        LOG_LEVEL: 'info'
      },
      resources: {
        cpu: '1',
        memory: '2Gi',
        replicas: 2
      }
    },
    production: {
      url: 'fashionistas.com',
      autoDeployBranch: 'main',
      approvalRequired: true,
      variables: {
        NODE_ENV: 'production',
        LOG_LEVEL: 'warn'
      },
      resources: {
        cpu: '2',
        memory: '4Gi',
        replicas: 3
      }
    }
  },
  
  pipeline: {
    stages: [
      'lint',
      'test',
      'build',
      'security-scan',
      'deploy'
    ],
    parallelization: true,
    caching: true,
    timeout: '30m',
    notifications: {
      slack: true,
      email: true
    }
  },

  docker: {
    registry: 'ghcr.io/fashionistas',
    buildArgs: {
      NODE_VERSION: '18-alpine'
    },
    labels: {
      maintainer: 'Fashionistas DevOps',
      version: '${VERSION}'
    }
  },

  kubernetes: {
    namespace: 'fashionistas',
    deploymentStrategy: 'RollingUpdate',
    rolloutConfig: {
      maxSurge: '25%',
      maxUnavailable: '25%'
    },
    healthCheck: {
      initialDelaySeconds: 30,
      periodSeconds: 10,
      timeoutSeconds: 5
    }
  },

  monitoring: {
    enabled: true,
    datadog: {
      enabled: true,
      metrics: true,
      logs: true,
      apm: true
    },
    prometheus: {
      enabled: true,
      scrapeInterval: '15s'
    }
  },

  scaling: {
    auto: true,
    metrics: [
      {
        type: 'cpu',
        averageUtilization: 70
      },
      {
        type: 'memory',
        averageUtilization: 80
      }
    ],
    minReplicas: 2,
    maxReplicas: 10
  },

  backup: {
    enabled: true,
    schedule: '0 0 * * *',
    retention: '30d',
    volumes: [
      'data-volume',
      'config-volume'
    ]
  }
}); 


