import { defineConfig } from '@/types/config';

export const securityStrategy = defineConfig({
  authentication: {
    methods: {
      password: {
        minLength: 12,
        requireNumbers: true,
        requireSpecialChars: true,
        requireUppercase: true,
        requireLowercase: true,
        preventCommonPasswords: true,
        maxAge: '90d',
        historySize: 5
      },
      mfa: {
        enabled: true,
        methods: ['authenticator', 'sms'],
        graceLoginCount: 3,
        backupCodes: 10
      },
      session: {
        duration: '4h',
        extendOnActivity: true,
        maxConcurrent: 5,
        refreshToken: {
          enabled: true,
          duration: '30d'
        }
      }
    },
    rateLimit: {
      login: {
        window: '15m',
        max: 5,
        blockDuration: '1h'
      },
      mfa: {
        window: '15m',
        max: 3,
        blockDuration: '30m'
      }
    }
  },

  authorization: {
    rbac: {
      enabled: true,
      roles: ['admin', 'organizer', 'user'],
      permissions: {
        granular: true,
        inheritance: true
      }
    },
    resources: {
      events: ['create', 'read', 'update', 'delete'],
      tickets: ['purchase', 'refund', 'transfer'],
      users: ['view', 'manage']
    },
    audit: {
      enabled: true,
      retention: '1y',
      details: ['user', 'action', 'resource', 'changes']
    }
  },

  dataProtection: {
    encryption: {
      atRest: {
        algorithm: 'AES-256-GCM',
        keyRotation: '90d'
      },
      inTransit: {
        tls: '1.3',
        hsts: true,
        certificateMonitoring: true
      }
    },
    pii: {
      fields: ['email', 'phone', 'address', 'payment'],
      handling: {
        encryption: true,
        masking: true,
        minimization: true
      },
      retention: {
        active: '5y',
        deleted: '90d'
      }
    }
  },

  networkSecurity: {
    firewall: {
      enabled: true,
      rules: {
        inbound: ['web', 'api', 'monitoring'],
        outbound: ['essential-services']
      },
      ddosProtection: true
    },
    cors: {
      enabled: true,
      origins: ['trusted-domains'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      headers: ['Authorization', 'Content-Type']
    },
    headers: {
      security: true,
      csp: {
        enabled: true,
        reportOnly: false,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", 'trusted-cdn'],
          styleSrc: ["'self'", 'trusted-cdn'],
          imgSrc: ["'self'", 'data:', 'trusted-cdn']
        }
      }
    }
  },

  vulnerabilityManagement: {
    scanning: {
      static: {
        frequency: '1d',
        tools: ['sonarqube', 'snyk']
      },
      dynamic: {
        frequency: '7d',
        tools: ['owasp-zap']
      },
      dependencies: {
        frequency: '1d',
        autoUpdate: {
          patch: true,
          minor: false
        }
      }
    },
    reporting: {
      severity: ['critical', 'high', 'medium', 'low'],
      notification: {
        channels: ['slack', 'email'],
        threshold: 'high'
      }
    }
  },

  incidentResponse: {
    monitoring: {
      realtime: true,
      alerts: {
        suspicious: ['login-attempts', 'privilege-escalation'],
        critical: ['data-breach', 'system-compromise']
      }
    },
    response: {
      automatic: {
        enabled: true,
        actions: ['block-ip', 'disable-account']
      },
      manual: {
        team: ['security', 'devops', 'legal'],
        procedures: ['investigate', 'contain', 'remediate']
      }
    },
    recovery: {
      plans: {
        dataBreech: true,
        systemCompromise: true,
        serviceOutage: true
      },
      testing: {
        frequency: '6m',
        scenarios: ['breach', 'attack']
      }
    }
  },

  compliance: {
    frameworks: {
      gdpr: {
        enabled: true,
        requirements: ['consent', 'rights', 'breach-notification']
      },
      pci: {
        enabled: true,
        requirements: ['data-security', 'access-control']
      }
    },
    audit: {
      internal: {
        frequency: '3m',
        scope: ['security', 'privacy', 'compliance']
      },
      external: {
        frequency: '1y',
        certification: ['iso27001', 'soc2']
      }
    }
  }
}); 


