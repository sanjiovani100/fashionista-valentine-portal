import { z } from 'zod';

export const modelSchema = z.object({
  height: z.number().min(100).max(250),
  bust: z.number().min(50).max(150),
  waist: z.number().min(50).max(150),
  portfolioLink: z.string().url().optional().nullable(),
  instagramHandle: z.string().optional().nullable()
});

export const designerSchema = z.object({
  brandName: z.string().min(2),
  website: z.string().url().optional().nullable(),
  collectionDescription: z.string().min(10),
  numberOfPieces: z.number().min(1),
  spaceRequirements: z.string().min(2)
});

export const sponsorSchema = z.object({
  companyName: z.string().min(2),
  industry: z.string().min(2),
  companyDescription: z.string().min(10),
  marketingGoals: z.string().min(10),
  partnershipPreferences: z.string().min(10)
});

export const commonSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  experience: z.string().min(10, 'Please describe your experience'),
  references: z.string().optional()
});

export type FormSchema = z.infer<typeof commonSchema> & 
  Partial<z.infer<typeof modelSchema>> & 
  Partial<z.infer<typeof designerSchema>> & 
  Partial<z.infer<typeof sponsorSchema>>;