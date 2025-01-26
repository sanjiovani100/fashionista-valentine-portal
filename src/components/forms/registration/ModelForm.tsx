import React from 'react';
import { Input } from '@/components/ui/input';
import { FormItem, FormLabel, FormControl } from '@/components/ui/form';

export const ModelForm = () => {
  return (
    <div className="space-y-6 border-t border-fashion-pink/20 pt-6">
      <h3 className="text-xl font-playfair mb-4">Model Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormItem>
          <FormLabel>Height (cm)</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Height in cm" />
          </FormControl>
        </FormItem>
        
        <FormItem>
          <FormLabel>Bust (cm)</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Bust measurement" />
          </FormControl>
        </FormItem>
        
        <FormItem>
          <FormLabel>Waist (cm)</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Waist measurement" />
          </FormControl>
        </FormItem>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormItem>
          <FormLabel>Portfolio Link</FormLabel>
          <FormControl>
            <Input type="url" placeholder="Link to your portfolio" />
          </FormControl>
        </FormItem>
        
        <FormItem>
          <FormLabel>Instagram Handle</FormLabel>
          <FormControl>
            <Input placeholder="@yourusername" />
          </FormControl>
        </FormItem>
      </div>
    </div>
  );
};