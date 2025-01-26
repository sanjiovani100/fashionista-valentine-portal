import { z } from 'zod';

const companyInformationSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  industry: z.string().min(2, 'Industry is required'),
  website: z.string().url('Please enter a valid URL').optional().nullable(),
  companySize: z.string().min(2, 'Company size is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  contactPosition: z.string().min(2, 'Position is required'),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().min(10, 'Valid phone number is required'),
});

const sponsorshipDetailsSchema = z.object({
  sponsorshipLevel: z.enum(['gold', 'silver', 'bronze'], {
    required_error: 'Please select a sponsorship level',
  }),
  marketingGoals: z.string().min(10, 'Please describe your marketing goals'),
  targetAudience: z.string().min(10, 'Please describe your target audience'),
  previousExperience: z.string().optional(),
});

const additionalRequirementsSchema = z.object({
  logoUrl: z.string().optional(),
  brandGuidelinesUrl: z.string().optional(),
  specialRequirements: z.string().optional(),
  paymentMethod: z.string().min(2, 'Please select a payment method'),
});

export const stepValidationSchemas = {
  1: companyInformationSchema,
  2: sponsorshipDetailsSchema,
  3: additionalRequirementsSchema,
};

export const sponsorFormSchema = companyInformationSchema
  .merge(sponsorshipDetailsSchema)
  .merge(additionalRequirementsSchema);

export type SponsorFormData = z.infer<typeof sponsorFormSchema>;