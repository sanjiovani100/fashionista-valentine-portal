import { z } from 'zod';
import { getFormValidationMessage } from '@/i18n/utils/form';
import type { FormRole } from '@/types/forms';

const createValidationSchema = (locale: string) => {
  const getMessage = (key: 'required' | 'email' | 'phone' | 'url' | 'minLength' | 'maxLength' | 'min' | 'max' | 'pattern' | 'custom', params = {}) => 
    getFormValidationMessage(locale, key, params);

  // Common validation patterns
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  const measurementRegex = /^\d{2,3}(\.\d{1,2})?$/;
  const urlRegex = /^https?:\/\/.+/;

  const commonSchema = {
    firstName: z.string()
      .min(1, { message: getMessage('required') })
      .max(50, { message: getMessage('maxLength', { count: 50 }) }),
    lastName: z.string()
      .min(1, { message: getMessage('required') })
      .max(50, { message: getMessage('maxLength', { count: 50 }) }),
    email: z.string()
      .min(1, { message: getMessage('required') })
      .email({ message: getMessage('email') })
      .max(100, { message: getMessage('maxLength', { count: 100 }) }),
    phone: z.string()
      .min(1, { message: getMessage('required') })
      .regex(phoneRegex, { message: getMessage('phone') }),
    experience: z.string()
      .min(50, { message: getMessage('minLength', { count: 50 }) })
      .max(500, { message: getMessage('maxLength', { count: 500 }) }),
    references: z.string().nullable().optional()
  };

  const modelSchema = z.object({
    ...commonSchema,
    height: z.string()
      .regex(measurementRegex, { message: getMessage('pattern', { pattern: 'Valid measurement (e.g., 170.5)' }) }),
    bust: z.string()
      .regex(measurementRegex, { message: getMessage('pattern', { pattern: 'Valid measurement (e.g., 90.5)' }) }),
    waist: z.string()
      .regex(measurementRegex, { message: getMessage('pattern', { pattern: 'Valid measurement (e.g., 60.5)' }) }),
    hips: z.string().min(1, { message: getMessage('required') }),
    portfolioLink: z.string()
      .regex(urlRegex, { message: getMessage('url') })
      .nullable()
      .optional(),
    instagramHandle: z.string()
      .regex(/^@?[\w.](?!.*?\.{2})[\w.]+[\w]$/, { 
        message: getMessage('pattern', { pattern: 'Valid Instagram handle' }) 
      })
      .nullable()
      .optional(),
    portfolioFiles: z.array(z.string()).default([])
  });

  const designerSchema = z.object({
    ...commonSchema,
    brandName: z.string()
      .min(1, { message: getMessage('required') })
      .max(100, { message: getMessage('maxLength', { count: 100 }) }),
    website: z.string()
      .regex(urlRegex, { message: getMessage('url') })
      .nullable()
      .optional(),
    collectionDescription: z.string()
      .min(100, { message: getMessage('minLength', { count: 100 }) })
      .max(1000, { message: getMessage('maxLength', { count: 1000 }) }),
    numberOfPieces: z.number()
      .min(1, { message: getMessage('min', { min: 1 }) })
      .max(100, { message: getMessage('max', { max: 100 }) }),
    spaceRequirements: z.string()
      .min(1, { message: getMessage('required') })
      .max(500, { message: getMessage('maxLength', { count: 500 }) }),
    collectionFiles: z.array(z.string()).default([])
  });

  const sponsorSchema = z.object({
    ...commonSchema,
    companyName: z.string()
      .min(1, { message: getMessage('required') })
      .max(100, { message: getMessage('maxLength', { count: 100 }) }),
    industry: z.string()
      .min(1, { message: getMessage('required') })
      .max(50, { message: getMessage('maxLength', { count: 50 }) }),
    companyDescription: z.string()
      .min(100, { message: getMessage('minLength', { count: 100 }) })
      .max(1000, { message: getMessage('maxLength', { count: 1000 }) }),
    marketingGoals: z.string()
      .min(50, { message: getMessage('minLength', { count: 50 }) })
      .max(500, { message: getMessage('maxLength', { count: 500 }) }),
    partnershipPreferences: z.string()
      .min(50, { message: getMessage('minLength', { count: 50 }) })
      .max(500, { message: getMessage('maxLength', { count: 500 }) })
  });

  return {
    model: modelSchema,
    designer: designerSchema,
    sponsor: sponsorSchema
  } as const;
};

export type FormSchemas = ReturnType<typeof createValidationSchema>;
export type FormSchema<T extends FormRole> = z.infer<FormSchemas[T]>;

export default createValidationSchema;


