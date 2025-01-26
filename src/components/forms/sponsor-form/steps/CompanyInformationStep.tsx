import React from 'react';
import { FormSection } from '../components/FormSection';
import { CompanyDetails } from './company-information/CompanyDetails';
import { ContactDetails } from './company-information/ContactDetails';

export const CompanyInformationStep = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-playfair mb-6">Company Information</h2>
      <CompanyDetails />
      <ContactDetails />
    </div>
  );
};