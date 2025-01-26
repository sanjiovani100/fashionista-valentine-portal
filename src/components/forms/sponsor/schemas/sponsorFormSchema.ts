import { z } from 'zod';

export const sponsorFormSchema = z.object({
  // Company Information
  companyName: z.string().min(2, 'Company name is required'),
  industry: z.string().min(2, 'Industry is required'),
  website: z.string().url('Please enter a valid URL').optional().nullable(),
  companySize: z.string().min(2, 'Company size is required'),
  
  // Contact Person
  contactName: z.string().min(2, 'Contact name is required'),
  contactPosition: z.string().min(2, 'Position is required'),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().min(10, 'Valid phone number is required'),
  
  // Sponsorship Details
  sponsorshipLevel: z.enum(['gold', 'silver', 'bronze']),
  marketingGoals: z.string().min(10, 'Please describe your marketing goals'),
  targetAudience: z.string().min(10, 'Please describe your target audience'),
  previousExperience: z.string().optional(),
  
  // Additional Requirements
  logoUrl: z.string().optional(),
  brandGuidelinesUrl: z.string().optional(),
  specialRequirements: z.string().optional(),
  paymentMethod: z.string().min(2, 'Please select a payment method'),
});

export type SponsorFormSchema = z.infer<typeof sponsorFormSchema>;