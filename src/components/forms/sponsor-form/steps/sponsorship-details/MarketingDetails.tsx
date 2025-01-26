import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormFieldWrapper } from '../../components/FormFieldWrapper';

export const MarketingDetails = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <FormFieldWrapper
        name="marketingGoals"
        label="Marketing Goals"
        control={control}
      >
        <Textarea 
          placeholder="Describe your marketing objectives for this event"
          className="min-h-[100px]"
        />
      </FormFieldWrapper>

      <FormFieldWrapper
        name="targetAudience"
        label="Target Audience"
        control={control}
      >
        <Textarea 
          placeholder="Describe your target audience"
          className="min-h-[100px]"
        />
      </FormFieldWrapper>

      <FormFieldWrapper
        name="previousExperience"
        label="Previous Sponsorship Experience"
        control={control}
      >
        <Textarea 
          placeholder="Share your previous sponsorship experience"
          className="min-h-[100px]"
        />
      </FormFieldWrapper>
    </div>
  );
};