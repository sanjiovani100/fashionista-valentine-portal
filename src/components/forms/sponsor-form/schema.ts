import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

export const sponsorFormSchema = z.object({
  // Company Information
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  industry: z.string().min(2, 'Industry is required'),
  website: z.string().url('Please enter a valid URL').optional().nullable(),
  companySize: z.string().min(2, 'Company size is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  contactPosition: z.string().min(2, 'Position is required'),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().min(10, 'Valid phone number is required'),

  // Sponsorship Details
  sponsorshipLevel: z.enum(['gold', 'silver', 'bronze'], {
    required_error: 'Please select a sponsorship level',
  }),
  marketingGoals: z.string().min(10, 'Please describe your marketing goals'),
  targetAudience: z.string().min(10, 'Please describe your target audience'),
  previousExperience: z.string().optional(),

  // Additional Requirements
  logoFile: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      'Only .jpg, .png, and .pdf files are accepted'
    )
    .optional(),
  brandGuidelinesFile: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      'Only .jpg, .png, and .pdf files are accepted'
    )
    .optional(),
  specialRequirements: z.string().optional(),
  paymentMethod: z.string().min(2, 'Please select a payment method'),
});

export const stepValidationSchemas = {
  1: z.object({
    companyName: sponsorFormSchema.shape.companyName,
    industry: sponsorFormSchema.shape.industry,
    website: sponsorFormSchema.shape.website,
    companySize: sponsorFormSchema.shape.companySize,
    contactName: sponsorFormSchema.shape.contactName,
    contactPosition: sponsorFormSchema.shape.contactPosition,
    contactEmail: sponsorFormSchema.shape.contactEmail,
    contactPhone: sponsorFormSchema.shape.contactPhone,
  }),
  2: z.object({
    sponsorshipLevel: sponsorFormSchema.shape.sponsorshipLevel,
    marketingGoals: sponsorFormSchema.shape.marketingGoals,
    targetAudience: sponsorFormSchema.shape.targetAudience,
    previousExperience: sponsorFormSchema.shape.previousExperience,
  }),
  3: z.object({
    logoFile: sponsorFormSchema.shape.logoFile,
    brandGuidelinesFile: sponsorFormSchema.shape.brandGuidelinesFile,
    specialRequirements: sponsorFormSchema.shape.specialRequirements,
    paymentMethod: sponsorFormSchema.shape.paymentMethod,
  }),
};

export type SponsorFormData = z.infer<typeof sponsorFormSchema>;