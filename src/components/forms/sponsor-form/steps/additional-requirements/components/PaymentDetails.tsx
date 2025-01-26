import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FormFieldWrapper } from '../../../components/FormFieldWrapper';

const paymentMethods = [
  'Bank Transfer',
  'Credit Card',
  'Wire Transfer',
  'Check'
];

export const PaymentDetails = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <FormFieldWrapper
        name="specialRequirements"
        label="Special Requirements/Notes"
        control={control}
      >
        <Textarea 
          placeholder="Any special requirements or additional notes"
          className="min-h-[100px]"
        />
      </FormFieldWrapper>

      <FormFieldWrapper
        name="paymentMethod"
        label="Preferred Payment Method"
        control={control}
      >
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethods.map((method) => (
              <SelectItem key={method} value={method}>
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormFieldWrapper>
    </div>
  );
};