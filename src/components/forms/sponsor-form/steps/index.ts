import { CompanyInformation } from './company-information/CompanyInformation';
import { SponsorshipDetails } from './sponsorship-details/SponsorshipDetails';
import { AdditionalRequirements } from './additional-requirements/AdditionalRequirements';
import { FormStep } from '../types';
import { stepValidationSchemas } from '../schema';

export { 
  CompanyInformation,
  SponsorshipDetails,
  AdditionalRequirements
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