import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().transform(Number).default('8080'),
  CORS_ORIGIN: z.string().default('*'),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_KEY: z.string().optional(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
}).transform((env) => ({
  ...env,
  // Make Supabase required only in production
  SUPABASE_URL: env.NODE_ENV === 'production' 
    ? env.SUPABASE_URL 
    : env.SUPABASE_URL || 'http://localhost:54321',
  SUPABASE_KEY: env.NODE_ENV === 'production'
    ? env.SUPABASE_KEY
    : env.SUPABASE_KEY || 'dummy-key-for-development'
}));

export type Env = z.infer<typeof envSchema>;

export const validateEnv = (): Env => {
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