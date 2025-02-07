import { defineConfig } from '@/types/config';

export const testingConfig = defineConfig({
  unit: {
    coverage: {
      statements: 85,
      branches: 80,
      functions: 85,
      lines: 85
    },
    patterns: [
      '**/*.test.ts',
      '**/*.test.tsx'
    ],
    exclude: [
      'node_modules',
      'dist',
      'coverage'
    ]
  },
  
  integration: {
    setupFiles: ['./test/setup.ts'],
    testMatch: ['**/*.integration.test.ts'],
    globalSetup: './test/global-setup.ts',
    teardown: './test/teardown.ts',
    environment: 'node',
    testTimeout: 30000
  },
  
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupFiles: ['./cypress/support/e2e.ts'],
    video: false,
    screenshots: {
      enabled: true,
      onFailureOnly: true
    },
    viewportWidth: 1280,
    viewportHeight: 720
  },

  // Component Testing
  component: {
    setupFiles: ['./test/component-setup.ts'],
    snapshotSerializers: ['jest-serializer-html'],
    coverage: {
      components: 90,
      hooks: 85
    }
  },

  // Performance Testing
  performance: {
    lighthouse: {
      enabled: true,
      thresholds: {
        performance: 90,
        accessibility: 90,
        seo: 90,
        pwa: 90
      }
    },
    loadTesting: {
      users: 100,
      duration: '5m',
      rampUp: '30s'
    }
  },

  // Security Testing
  security: {
    scanners: ['snyk', 'owasp-zap'],
    frequency: 'daily',
    vulnerabilityThreshold: 'medium'
  }
}); 