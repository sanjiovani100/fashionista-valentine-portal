import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import type { FormSchema } from './schemas/formSchemas';

export const DesignerForm = () => {
  const { control } = useFormContext<FormSchema>();

  return (
    <div className="space-y-6 border-t border-fashion-pink/20 pt-6">
      <h3 className="text-xl font-playfair mb-4">Designer Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="brandName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input placeholder="Your brand name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input type="url" placeholder="Brand website URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="collectionDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Collection Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your collection"
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
          name="numberOfPieces"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Pieces</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Number of pieces to showcase" {...field} onChange={e => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="spaceRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Space Requirements</FormLabel>
              <FormControl>
                <Input placeholder="Required space in sqm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};