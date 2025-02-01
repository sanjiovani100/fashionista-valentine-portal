import { z } from 'zod';
import { useFormTranslation } from '@/i18n/utils/form';

export const modelSchema = z.object({
  height: z.number().min(100).max(250),
  bust: z.number().min(50).max(150),
  waist: z.number().min(50).max(150),
  portfolioLink: z.string().url().optional().nullable(),
  instagramHandle: z.string().optional().nullable(),
  portfolioFiles: z.array(z.string()).optional().default([])
});

export const designerSchema = z.object({
  brandName: z.string().min(2),
  website: z.string().url().optional().nullable(),
  collectionDescription: z.string().min(10),
  numberOfPieces: z.number().min(1),
  spaceRequirements: z.string().min(2),
  collectionFiles: z.array(z.string()).optional().default([])
});

export const sponsorSchema = z.object({
  companyName: z.string().min(2),
  industry: z.string().min(2),
  companyDescription: z.string().min(50),
  marketingGoals: z.string().min(50),
  partnershipPreferences: z.string().min(50),
  website: z.string().url().optional(),
  budget: z.string().min(1)
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

export const createValidationSchema = (formType: 'sponsor' | 'model') => {
  const { getValidationMessage } = useFormTranslation(formType);

  const baseValidation = {
    firstName: z.string().min(2, { message: getValidationMessage('required') }),
    lastName: z.string().min(2, { message: getValidationMessage('required') }),
    email: z.string().email({ message: getValidationMessage('email') }),
    phone: z.string().min(10, { message: getValidationMessage('phone') })
  };

  const sponsorValidation = {
    companyName: z.string().min(2, { message: getValidationMessage('required') }),
    industry: z.string().min(2, { message: getValidationMessage('required') }),
    companyDescription: z.string().min(50, { message: getValidationMessage('minLength', 50) }),
    marketingGoals: z.string().min(50, { message: getValidationMessage('minLength', 50) }),
    partnershipPreferences: z.string().min(50, { message: getValidationMessage('minLength', 50) }),
    website: z.string().url({ message: getValidationMessage('url') }).optional(),
    budget: z.string().min(1, { message: getValidationMessage('required') })
  };

  const modelValidation = {
    experience: z.string().min(50, { message: getValidationMessage('minLength', 50) }),
    portfolio: z.string().url({ message: getValidationMessage('url') }).optional(),
    height: z.string().min(1, { message: getValidationMessage('required') }),
    measurements: z.string().min(1, { message: getValidationMessage('required') })
  };

  return formType === 'sponsor'
    ? z.object({ ...baseValidation, ...sponsorValidation })
    : z.object({ ...baseValidation, ...modelValidation });
};