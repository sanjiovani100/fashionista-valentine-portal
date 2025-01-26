import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormItem, FormLabel, FormControl } from '@/components/ui/form';

export const DesignerForm = () => {
  return (
    <div className="space-y-6 border-t border-fashion-pink/20 pt-6">
      <h3 className="text-xl font-playfair mb-4">Designer Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormItem>
          <FormLabel>Brand Name</FormLabel>
          <FormControl>
            <Input placeholder="Your brand name" />
          </FormControl>
        </FormItem>
        
        <FormItem>
          <FormLabel>Website</FormLabel>
          <FormControl>
            <Input type="url" placeholder="Brand website URL" />
          </FormControl>
        </FormItem>
      </div>

      <FormItem>
        <FormLabel>Collection Description</FormLabel>
        <FormControl>
          <Textarea 
            placeholder="Describe your collection"
            className="min-h-[100px]"
          />
        </FormControl>
      </FormItem>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormItem>
          <FormLabel>Number of Pieces</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Number of pieces to showcase" />
          </FormControl>
        </FormItem>
        
        <FormItem>
          <FormLabel>Space Requirements</FormLabel>
          <FormControl>
            <Input placeholder="Required space in sqm" />
          </FormControl>
        </FormItem>
      </div>
    </div>
  );
};