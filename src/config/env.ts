import { z } from 'zod';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(8081),
  CORS_ORIGIN: z.string().default('*'),
  
  // Database
  SUPABASE_URL: z.string(),
  SUPABASE_KEY: z.string(),
  
  // Redis
  REDIS_URL: z.string().optional(),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_PREFIX: z.string().default('fashionista:'),
  
  // Auth
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('1d'),
  
  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().optional(),

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  PERFORMANCE_THRESHOLD: z.coerce.number().default(1000)
});

export type Env = z.infer<typeof envSchema>;

const validateEnv = (): Env => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    } else {
      console.error('❌ Error validating environment variables:', error);
    }
    process.exit(1);
  }
};

// Export validated environment variables
export const env = validateEnv(); 


