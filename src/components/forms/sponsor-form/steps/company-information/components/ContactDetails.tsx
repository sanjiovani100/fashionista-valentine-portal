import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormFieldWrapper } from '../../../components/FormFieldWrapper';

export const ContactDetails = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-playfair mt-8 mb-4">Contact Person Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormFieldWrapper
          name="contactName"
          label="Name"
          control={control}
        >
          <Input placeholder="Enter contact name" />
        </FormFieldWrapper>

        <FormFieldWrapper
          name="contactPosition"
          label="Position"
          control={control}
        >
          <Input placeholder="Enter position" />
        </FormFieldWrapper>

        <FormFieldWrapper
          name="contactEmail"
          label="Email"
          control={control}
        >
          <Input type="email" placeholder="Enter email" />
        </FormFieldWrapper>

        <FormFieldWrapper
          name="contactPhone"
          label="Phone"
          control={control}
        >
          <Input type="tel" placeholder="Enter phone number" />
        </FormFieldWrapper>
      </div>
    </div>
  );
};