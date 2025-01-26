import React from 'react';
import { CompanyDetails } from './components/CompanyDetails';
import { ContactDetails } from './components/ContactDetails';
import { FormSection } from '../../components/FormSection';

export const CompanyInformation = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-playfair mb-6">Company Information</h2>
      
      <FormSection
        title="Company Details"
        description="Tell us about your company"
      >
        <CompanyDetails />
      </FormSection>

      <FormSection
        title="Contact Person Details"
        description="Provide details of the primary contact person"
      >
        <ContactDetails />
      </FormSection>
    </div>
  );
};