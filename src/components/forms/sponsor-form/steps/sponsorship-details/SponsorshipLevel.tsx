import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormFieldWrapper } from '../../components/FormFieldWrapper';

const sponsorshipLevels = [
  { value: 'gold', label: 'Gold Sponsor' },
  { value: 'silver', label: 'Silver Sponsor' },
  { value: 'bronze', label: 'Bronze Sponsor' },
];

export const SponsorshipLevel = () => {
  const { control } = useFormContext();

  return (
    <FormFieldWrapper
      name="sponsorshipLevel"
      label="Preferred Sponsorship Level"
      control={control}
    >
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select sponsorship level" />
        </SelectTrigger>
        <SelectContent>
          {sponsorshipLevels.map((level) => (
            <SelectItem key={level.value} value={level.value}>
              {level.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormFieldWrapper>
  );
};