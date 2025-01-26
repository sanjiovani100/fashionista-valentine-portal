import React from 'react';
import { FormSection } from '../components/FormSection';
import { SponsorshipLevel } from './sponsorship-details/SponsorshipLevel';
import { MarketingDetails } from './sponsorship-details/MarketingDetails';

export const SponsorshipDetailsStep = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-playfair mb-6">Sponsorship Details</h2>
      
      <FormSection
        title="Sponsorship Level"
        description="Choose your preferred sponsorship package"
      >
        <SponsorshipLevel />
      </FormSection>

      <FormSection
        title="Marketing Information"
        description="Tell us about your marketing objectives and target audience"
      >
        <MarketingDetails />
      </FormSection>
    </div>
  );
};