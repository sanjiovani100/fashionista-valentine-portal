import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormSection } from '../../components/FormSection';
import { FormFieldWrapper } from '../../components/FormFieldWrapper';

const companySizes = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees'
];

export const CompanyDetails = () => {
  const { control } = useFormContext();

  return (
    <FormSection
      title="Company Details"
      description="Tell us about your company"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormFieldWrapper
          name="companyName"
          label="Company Name"
          control={control}
        >
          <Input placeholder="Enter company name" />
        </FormFieldWrapper>
        
        <FormFieldWrapper
          name="industry"
          label="Industry"
          control={control}
        >
          <Input placeholder="Enter industry" />
        </FormFieldWrapper>

        <FormFieldWrapper
          name="website"
          label="Website"
          control={control}
        >
          <Input type="url" placeholder="https://example.com" />
        </FormFieldWrapper>

        <FormFieldWrapper
          name="companySize"
          label="Company Size"
          control={control}
        >
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent>
              {companySizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>
      </div>
    </FormSection>
  );
};