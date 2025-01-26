import { CompanyInformationStep } from './CompanyInformationStep';
import { SponsorshipDetailsStep } from './SponsorshipDetailsStep';
import { AdditionalRequirementsStep } from './AdditionalRequirementsStep';
import { stepValidationSchemas } from '../schema';
import type { FormStep } from '../types';

export { 
  CompanyInformationStep as CompanyInformation,
  SponsorshipDetailsStep as SponsorshipDetails,
  AdditionalRequirementsStep as AdditionalRequirements 
};

export const steps: FormStep[] = [
  {
    id: 1,
    title: "Company Information",
    description: "Tell us about your company",
    fields: ['companyName', 'industry', 'website', 'companySize', 'contactName', 'contactPosition', 'contactEmail', 'contactPhone'],
    validationSchema: stepValidationSchemas[1]
  },
  {
    id: 2,
    title: "Sponsorship Details",
    description: "Choose your sponsorship package",
    fields: ['sponsorshipLevel', 'marketingGoals', 'targetAudience', 'previousExperience'],
    validationSchema: stepValidationSchemas[2]
  },
  {
    id: 3,
    title: "Additional Requirements",
    description: "Upload your brand assets",
    fields: ['logoUrl', 'brandGuidelinesUrl', 'specialRequirements', 'paymentMethod'],
    validationSchema: stepValidationSchemas[3]
  }
];