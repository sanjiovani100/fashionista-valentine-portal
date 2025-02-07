export type ConfigDefinition = {
  [key: string]: any;
};

export function defineConfig<T extends ConfigDefinition>(config: T): T {
  return config;
}

export interface TestingConfig {
  unit: {
    coverage: {
      statements: number;
      branches: number;
      functions: number;
      lines: number;
    };
    patterns: string[];
    exclude: string[];
  };
  integration: {
    setupFiles: string[];
    testMatch: string[];
    globalSetup: string;
    teardown: string;
    environment: string;
    testTimeout: number;
  };
  e2e: {
    baseUrl: string;
    setupFiles: string[];
    video: boolean;
    screenshots: {
      enabled: boolean;
      onFailureOnly: boolean;
    };
    viewportWidth: number;
    viewportHeight: number;
  };
  component: {
    setupFiles: string[];
    snapshotSerializers: string[];
    coverage: {
      components: number;
      hooks: number;
    };
  };
  performance: {
    lighthouse: {
      enabled: boolean;
      thresholds: {
        performance: number;
        accessibility: number;
        seo: number;
        pwa: number;
      };
    };
    loadTesting: {
      users: number;
      duration: string;
      rampUp: string;
    };
  };
  security: {
    scanners: string[];
    frequency: string;
    vulnerabilityThreshold: string;
  };
}

export interface SecurityConfig {
  authentication: {
    sessionTimeout: number;
    maxLoginAttempts: number;
    passwordPolicy: {
      minLength: number;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
    };
  };
  rateLimit: {
    window: number;
    max: number;
  };
  cors: {
    allowedOrigins: string[];
    allowedMethods: string[];
  };
}

export interface MonitoringConfig {
  metrics: {
    collection: {
      interval: string;
      retention: string;
    };
    alerts: {
      responseTime: string;
      errorRate: string;
      cpuUsage: string;
    };
  };
  analytics: {
    tracking: {
      pageViews: boolean;
      events: boolean;
      userJourney: boolean;
    };
    reporting: {
      daily: string[];
      weekly: string[];
      monthly: string[];
    };
  };
}

export interface DatabaseConfig {
  pooling: {
    min: number;
    max: number;
    idleTimeoutMillis: number;
  };
  backup: {
    frequency: string;
    retention: string;
    type: string;
  };
  monitoring: {
    queryTimeout: number;
    slowQueryThreshold: number;
  };
}

export interface CodeQualityConfig {
  complexity: {
    maxCyclomaticComplexity: number;
    maxDepth: number;
    maxParameters: number;
  };
  naming: {
    components: string;
    functions: string;
    constants: string;
  };
  documentation: {
    required: string[];
  };
}

export interface DeploymentConfig {
  environments: {
    [key: string]: {
      url: string;
      autoDeployBranch: string;
      approvalRequired?: boolean;
    };
  };
  pipeline: {
    stages: string[];
    parallelization: boolean;
    caching: boolean;
  };
}

export interface FeatureConfig {
  flags: {
    [key: string]: {
      enabled: boolean;
      rolloutPercentage: number;
    };
  };
  toggles: {
    [key: string]: boolean;
  };
}

export interface ApiConfig {
  versioning: {
    current: string;
    supported: string[];
    deprecationPolicy: string;
  };
  response: {
    pagination: {
      defaultLimit: number;
      maxLimit: number;
    };
    caching: {
      ttl: number;
      strategy: string;
    };
  };
} 