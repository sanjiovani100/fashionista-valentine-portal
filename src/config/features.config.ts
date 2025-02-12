import { defineConfig } from '@/types/config';

export const featureConfig = defineConfig({
  flags: {
    newTicketingSystem: {
      enabled: false,
      rolloutPercentage: 0,
      description: 'New ticketing system with improved UX',
      dependencies: ['stripe-integration'],
      audience: {
        beta: true,
        internal: true,
        public: false
      }
    },
    enhancedAnalytics: {
      enabled: true,
      rolloutPercentage: 100,
      description: 'Enhanced analytics dashboard with real-time metrics',
      dependencies: ['metrics-service'],
      audience: {
        beta: false,
        internal: true,
        public: true
      }
    },
    aiRecommendations: {
      enabled: true,
      rolloutPercentage: 20,
      description: 'AI-powered event recommendations',
      dependencies: ['openai-integration'],
      audience: {
        beta: true,
        internal: true,
        public: false
      }
    },
    virtualFitting: {
      enabled: false,
      rolloutPercentage: 0,
      description: 'Virtual fitting room experience',
      dependencies: ['ar-core', '3d-models'],
      audience: {
        beta: true,
        internal: false,
        public: false
      }
    }
  },
  
  toggles: {
    maintenance: false,
    betaFeatures: true,
    debugMode: process.env.NODE_ENV === 'development',
    performanceMonitoring: true,
    userFeedback: true
  },

  experiments: {
    ticketPricing: {
      enabled: true,
      variants: [
        {
          id: 'control',
          weight: 50
        },
        {
          id: 'test_a',
          weight: 25,
          variables: {
            discountPercentage: 10
          }
        },
        {
          id: 'test_b',
          weight: 25,
          variables: {
            discountPercentage: 15
          }
        }
      ]
    },
    uiRefresh: {
      enabled: true,
      variants: [
        {
          id: 'current',
          weight: 70
        },
        {
          id: 'new_design',
          weight: 30
        }
      ]
    }
  },

  permissions: {
    roles: {
      admin: {
        features: ['*'],
        experiments: ['*']
      },
      organizer: {
        features: ['enhancedAnalytics', 'aiRecommendations'],
        experiments: ['ticketPricing']
      },
      user: {
        features: ['enhancedAnalytics'],
        experiments: ['uiRefresh']
      }
    }
  },

  monitoring: {
    enabled: true,
    metrics: [
      'feature_usage',
      'experiment_conversion',
      'flag_evaluations'
    ],
    alerts: {
      errorThreshold: 0.1,
      latencyThreshold: 100
    }
  }
}); 


