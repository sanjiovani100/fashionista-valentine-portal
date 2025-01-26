import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import type { FormSchema } from './schemas/formSchemas';

export const SponsorForm = () => {
  const { control } = useFormContext<FormSchema>();

  return (
    <div className="space-y-6 border-t border-fashion-pink/20 pt-6">
      <h3 className="text-xl font-playfair mb-4">Sponsor Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Your company name" {...field} />
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
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Input placeholder="Company industry" {...field} />
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
            <FormLabel>Company Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Tell us about your company"
                className="min-h-[100px]"
                {...field}
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
              <FormLabel>Marketing Goals</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What are your marketing objectives?"
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
          name="partnershipPreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Partnership Preferences</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your ideal partnership arrangement"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};