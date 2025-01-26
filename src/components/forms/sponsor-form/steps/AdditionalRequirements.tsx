import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/forms/registration/components/FileUpload';

const paymentMethods = [
  'Bank Transfer',
  'Credit Card',
  'Wire Transfer',
  'Check'
];

export const AdditionalRequirements = () => {
  const { control, setValue } = useFormContext();

  const handleLogoUpload = (urls: string[]) => {
    setValue('logoUrl', urls[0]);
  };

  const handleGuidelinesUpload = (urls: string[]) => {
    setValue('brandGuidelinesUrl', urls[0]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair mb-6">Additional Requirements</h2>

      <div className="space-y-8">
        <FormField
          control={control}
          name="logoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Logo</FormLabel>
              <FormControl>
                <FileUpload
                  role="sponsor"
                  maxFiles={1}
                  maxSizeMB={5}
                  onUploadComplete={handleLogoUpload}
                  acceptedFileTypes={['image/*']}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="brandGuidelinesUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Guidelines</FormLabel>
              <FormControl>
                <FileUpload
                  role="sponsor"
                  maxFiles={1}
                  maxSizeMB={10}
                  onUploadComplete={handleGuidelinesUpload}
                  acceptedFileTypes={['application/pdf']}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="specialRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requirements/Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any special requirements or additional notes"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};