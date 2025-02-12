export const DEVELOPMENT_STANDARDS = {
  // Event Management Standards
  eventManagement: {
    validation: {
      // Ensure proper validation for event-specific data
      requiredFields: [
        'eventName',
        'eventDate',
        'location',
        'capacity',
        'organizerId'
      ],
      dateValidation: {
        minAdvanceNotice: '2 weeks',
        maxFutureBooking: '1 year'
      },
      capacityLimits: {
        min: 10,
        max: 1000
      }
    },
    caching: {
      eventListTTL: '5 minutes',
      eventDetailsTTL: '10 minutes',
      sponsorListTTL: '15 minutes'
    }
  },

  // Model Management Standards
  modelManagement: {
    profileValidation: {
      requiredMeasurements: [
        'height',
        'bust',
        'waist',
        'hips',
        'shoeSize'
      ],
      photoRequirements: {
        minPhotos: 3,
        maxPhotos: 20,
        allowedFormats: ['jpg', 'png', 'heic'],
        maxSizeMB: 10
      }
    },
    availability: {
      updateFrequency: '24 hours',
      notificationLeadTime: '48 hours'
    }
  },

  // Sponsor Management Standards
  sponsorManagement: {
    tierRequirements: {
      platinum: {
        minCommitment: '6 months',
        prioritySupport: true,
        customBranding: true
      },
      gold: {
        minCommitment: '3 months',
        prioritySupport: true
      },
      silver: {
        minCommitment: '1 month'
      }
    },
    brandAssets: {
      logoRequirements: {
        minWidth: 500,
        minHeight: 500,
        formats: ['svg', 'png']
      }
    }
  },

  // Performance Standards
  performance: {
    metrics: {
      pageLoadTime: '2 seconds',
      apiResponseTime: '500ms',
      imageLoadTime: '1 second'
    },
    optimization: {
      imageLazyLoading: true,
      infiniteScrollBatchSize: 20,
      maxConcurrentRequests: 6
    }
  },

  // Security Standards
  security: {
    authentication: {
      sessionTimeout: '2 hours',
      maxLoginAttempts: 5,
      passwordRequirements: {
        minLength: 12,
        requireSpecialChar: true,
        requireNumber: true,
        requireUppercase: true
      }
    },
    dataProtection: {
      personalDataEncryption: true,
      backupFrequency: '24 hours',
      dataRetentionPeriod: '2 years'
    }
  },

  // API Standards
  api: {
    versioning: {
      pattern: 'v{major}',
      deprecationNotice: '3 months'
    },
    rateLimit: {
      authenticated: {
        requestsPerMinute: 60,
        burstLimit: 100
      },
      public: {
        requestsPerMinute: 30,
        burstLimit: 50
      }
    },
    response: {
      standardFields: [
        'status',
        'data',
        'message',
        'timestamp'
      ]
    }
  },

  // Testing Standards
  testing: {
    coverage: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80
    },
    types: [
      'unit',
      'integration',
      'e2e',
      'performance',
      'accessibility'
    ],
    environments: [
      'development',
      'staging',
      'production'
    ]
  },

  // Accessibility Standards
  accessibility: {
    compliance: 'WCAG 2.1 Level AA',
    requirements: [
      'keyboardNavigation',
      'screenReaderCompatibility',
      'colorContrast',
      'responsiveDesign'
    ],
    testing: {
      frequency: 'weekly',
      tools: [
        'axe-core',
        'WAVE',
        'Lighthouse'
      ]
    }
  },

  // Monitoring Standards
  monitoring: {
    metrics: [
      'userEngagement',
      'errorRates',
      'responseTime',
      'availabilityUptime'
    ],
    alerts: {
      errorThreshold: '1%',
      responseTimeThreshold: '2000ms',
      uptimeThreshold: '99.9%'
    },
    logging: {
      levels: [
        'error',
        'warn',
        'info',
        'debug'
      ],
      retention: '30 days'
    }
  },

  // Code Quality Standards
  codeQuality: {
    linting: {
      typescript: {
        strict: true,
        noImplicitAny: true,
        noUnusedLocals: true
      },
      react: {
        strictMode: true,
        hooksRules: true
      }
    },
    naming: {
      components: 'PascalCase',
      functions: 'camelCase',
      constants: 'UPPER_SNAKE_CASE',
      files: 'kebab-case'
    },
    documentation: {
      required: [
        'componentProps',
        'functions',
        'apis',
        'configurations'
      ],
      format: 'TSDoc'
    }
  },

  // State Management Standards
  stateManagement: {
    patterns: {
      global: 'Redux',
      local: 'React.useState',
      server: 'React Query'
    },
    caching: {
      strategy: 'stale-while-revalidate',
      timeout: '5 minutes'
    }
  },

  // UI/UX Standards
  uiux: {
    designSystem: {
      spacing: {
        unit: 4,
        scale: [0, 4, 8, 16, 24, 32, 48, 64]
      },
      breakpoints: {
        mobile: '320px',
        tablet: '768px',
        desktop: '1024px',
        wide: '1440px'
      },
      typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
        scale: {
          small: '0.875rem',
          body: '1rem',
          large: '1.25rem',
          heading: '1.5rem'
        }
      }
    },
    interactions: {
      hoverStates: true,
      loadingStates: true,
      errorStates: true,
      successStates: true
    }
  }
}; 


