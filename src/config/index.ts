import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Environment variable validation schema
const envSchema = z.object({
  // Server
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Supabase
  VITE_SUPABASE_URL: z.string(),
  SUPABASE_SERVICE_KEY: z.string(),
  SUPABASE_ANON_KEY: z.string(),

  // Security
  JWT_SECRET: z.string(),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100'),

  // File Upload
  MAX_FILE_SIZE: z.string().default('5242880'), // 5MB
  ALLOWED_FILE_TYPES: z.string().default('image/jpeg,image/png,image/webp'),

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  LOG_FORMAT: z.enum(['dev', 'combined', 'common', 'short', 'tiny']).default('dev'),

  // Optional: Email Service
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().optional(),

  // Optional: Payment Gateway
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // Cache
  CACHE_TTL: z.string().default('3600'),
  CACHE_CHECK_PERIOD: z.string().default('120'),
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

// Configuration object
const config = {
  server: {
    port: parseInt(env.PORT, 10),
    nodeEnv: env.NODE_ENV,
    isDevelopment: env.NODE_ENV === 'development',
    isProduction: env.NODE_ENV === 'production',
    isTest: env.NODE_ENV === 'test',
  },

  supabase: {
    url: env.VITE_SUPABASE_URL,
    serviceKey: env.SUPABASE_SERVICE_KEY,
    anonKey: env.SUPABASE_ANON_KEY,
  },

  security: {
    jwtSecret: env.JWT_SECRET,
    corsOrigin: env.CORS_ORIGIN,
  },

  rateLimit: {
    windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS, 10),
    maxRequests: parseInt(env.RATE_LIMIT_MAX_REQUESTS, 10),
  },

  upload: {
    maxFileSize: parseInt(env.MAX_FILE_SIZE, 10),
    allowedFileTypes: env.ALLOWED_FILE_TYPES.split(','),
  },

  logging: {
    level: env.LOG_LEVEL,
    format: env.LOG_FORMAT,
  },

  email: env.SMTP_HOST
    ? {
        host: env.SMTP_HOST,
        port: parseInt(env.SMTP_PORT || '587', 10),
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
        from: env.EMAIL_FROM,
      }
    : null,

  payment: env.STRIPE_SECRET_KEY
    ? {
        stripeSecretKey: env.STRIPE_SECRET_KEY,
        stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
      }
    : null,

  cache: {
    ttl: parseInt(env.CACHE_TTL, 10),
    checkPeriod: parseInt(env.CACHE_CHECK_PERIOD, 10),
  },
} as const;

export default config; 


