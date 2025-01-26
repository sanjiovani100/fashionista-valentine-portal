import React from 'react';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import type { FormSchema } from './schemas/formSchemas';

export const ModelForm = () => {
  const { control } = useFormContext<FormSchema>();

  return (
    <div className="space-y-6 border-t border-fashion-pink/20 pt-6">
      <h3 className="text-xl font-playfair mb-4">Model Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (cm)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Height in cm" {...field} onChange={e => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="bust"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bust (cm)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Bust measurement" {...field} onChange={e => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="waist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Waist (cm)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Waist measurement" {...field} onChange={e => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="portfolioLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio Link</FormLabel>
              <FormControl>
                <Input type="url" placeholder="Link to your portfolio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="instagramHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram Handle</FormLabel>
              <FormControl>
                <Input placeholder="@yourusername" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};