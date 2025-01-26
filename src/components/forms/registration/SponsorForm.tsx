import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormItem, FormLabel, FormControl } from '@/components/ui/form';

export const SponsorForm = () => {
  return (
    <div className="space-y-6 border-t border-fashion-pink/20 pt-6">
      <h3 className="text-xl font-playfair mb-4">Sponsor Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormItem>
          <FormLabel>Company Name</FormLabel>
          <FormControl>
            <Input placeholder="Your company name" />
          </FormControl>
        </FormItem>
        
        <FormItem>
          <FormLabel>Industry</FormLabel>
          <FormControl>
            <Input placeholder="Company industry" />
          </FormControl>
        </FormItem>
      </div>

      <FormItem>
        <FormLabel>Company Description</FormLabel>
        <FormControl>
          <Textarea 
            placeholder="Tell us about your company"
            className="min-h-[100px]"
          />
        </FormControl>
      </FormItem>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormItem>
          <FormLabel>Marketing Goals</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="What are your marketing objectives?"
              className="min-h-[100px]"
            />
          </FormControl>
        </FormItem>
        
        <FormItem>
          <FormLabel>Partnership Preferences</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Describe your ideal partnership arrangement"
              className="min-h-[100px]"
            />
          </FormControl>
        </FormItem>
      </div>
    </div>
  );
};