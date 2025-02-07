import { defineConfig } from '@/types/config';

export const securityConfig = defineConfig({
  authentication: {
    sessionTimeout: 3600, // 1 hour
    maxLoginAttempts: 5,
    passwordPolicy: {
      minLength: 12,
      requireNumbers: true,
      requireSpecialChars: true,
      requireUppercase: true,
      requireLowercase: true,
      preventPasswordReuse: 5 // last 5 passwords
    },
    mfa: {
      enabled: true,
      methods: ['authenticator', 'sms'],
      gracePeroid: 7 // days
    }
  },
  
  rateLimit: {
    window: 15 * 60 * 1000, // 15 minutes
    max: 100, // requests per window
    whitelist: ['127.0.0.1'],
    blacklist: []
  },
  
  cors: {
    allowedOrigins: [
      'https://fashionistas.com',
      'https://admin.fashionistas.com',
      'https://api.fashionistas.com'
    ],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Total-Count'],
    maxAge: 24 * 60 * 60 // 24 hours
  },

  encryption: {
    algorithm: 'aes-256-gcm',
    keyRotation: 30, // days
    saltRounds: 12
  },

  headers: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self';"
  },

  jwt: {
    algorithm: 'RS256',
    expiresIn: '1d',
    refreshToken: {
      expiresIn: '7d',
      reuseWindow: 60 // seconds
    }
  },

  sanitization: {
    enabled: true,
    rules: {
      html: true,
      sql: true,
      xss: true
    }
  },

  audit: {
    enabled: true,
    events: [
      'login',
      'logout',
      'password-change',
      'profile-update',
      'ticket-purchase'
    ],
    retention: '90d'
  }
}); 