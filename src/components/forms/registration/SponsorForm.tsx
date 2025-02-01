import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useFormContext } from 'react-hook-form';
import { useFormTranslation } from '@/i18n/utils/form';
import type { FormSchema } from './schemas/formSchemas';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const SponsorForm = () => {
  const { control, formState: { isSubmitSuccessful, isSubmitting } } = useFormContext<FormSchema>();
  const { 
    getFieldLabel, 
    getPlaceholder,
    successMessage,
    errorMessage
  } = useFormTranslation('sponsor');

  return (
    <div className="space-y-6 border-t border-fashion-pink/20 pt-6">
      <h3 className="text-xl font-playfair mb-4">{getFieldLabel('sponsorDetails')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getFieldLabel('companyName')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={getPlaceholder('companyName')} 
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getFieldLabel('industry')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={getPlaceholder('industry')} 
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="companyDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{getFieldLabel('companyDescription')}</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={getPlaceholder('companyDescription')}
                className="min-h-[100px]"
                {...field}
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="marketingGoals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getFieldLabel('marketingGoals')}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={getPlaceholder('marketingGoals')}
                  className="min-h-[100px]"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="partnershipPreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getFieldLabel('partnershipPreferences')}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={getPlaceholder('partnershipPreferences')}
                  className="min-h-[100px]"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getFieldLabel('website')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={getPlaceholder('website')} 
                  type="url"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getFieldLabel('budget')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={getPlaceholder('budget')} 
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {isSubmitSuccessful && (
        <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {!isSubmitSuccessful && formState.isSubmitted && (
        <Alert className="bg-red-500/10 text-red-500 border-red-500/20">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};