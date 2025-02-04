import { z } from 'zod';

// Base schemas for common fields
export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name cannot exceed 50 characters');

export const emailSchema = z
  .string()
  .email('Invalid email address')
  .min(5, 'Email must be at least 5 characters')
  .max(100, 'Email cannot exceed 100 characters');

export const phoneSchema = z
  .string()
  .regex(
    /^\+?[1-9]\d{1,14}$/,
    'Phone number must be in international format (e.g., +1234567890)'
  );

export const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Model-specific schemas
export const measurementSchema = z
  .number()
  .min(0, 'Measurement must be a positive number')
  .max(300, 'Measurement seems too large');

export const modelMeasurementsSchema = z.object({
  height: measurementSchema,
  bust: measurementSchema,
  waist: measurementSchema,
  hips: measurementSchema,
  shoeSize: z.number().min(4, 'Invalid shoe size').max(15, 'Invalid shoe size'),
});

// Event-specific schemas
export const eventSchema = z.object({
  eventName: z
    .string()
    .min(5, 'Event name must be at least 5 characters')
    .max(100, 'Event name cannot exceed 100 characters'),
  eventDate: z
    .string()
    .refine((date) => {
      const eventDate = new Date(date);
      const now = new Date();
      const twoWeeksFromNow = new Date(now.setDate(now.getDate() + 14));
      return eventDate >= twoWeeksFromNow;
    }, 'Event must be scheduled at least 2 weeks in advance')
    .refine((date) => {
      const eventDate = new Date(date);
      const now = new Date();
      const oneYearFromNow = new Date(now.setFullYear(now.getFullYear() + 1));
      return eventDate <= oneYearFromNow;
    }, 'Event cannot be scheduled more than 1 year in advance'),
  location: z
    .string()
    .min(5, 'Location must be at least 5 characters')
    .max(200, 'Location cannot exceed 200 characters'),
  capacity: z
    .number()
    .int('Capacity must be a whole number')
    .min(10, 'Minimum capacity is 10')
    .max(1000, 'Maximum capacity is 1000'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description cannot exceed 2000 characters'),
});

// Sponsor-specific schemas
export const sponsorTierSchema = z.enum(['platinum', 'gold', 'silver']);

export const sponsorSchema = z.object({
  companyName: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name cannot exceed 100 characters'),
  tier: sponsorTierSchema,
  commitmentPeriod: z
    .string()
    .refine(
      (period) => {
        const months = parseInt(period.split(' ')[0]);
        return months >= 1;
      },
      'Minimum commitment period is 1 month'
    ),
  website: z.string().url('Invalid website URL'),
  contactPerson: z.object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
  }),
}); 