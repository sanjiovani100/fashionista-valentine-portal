import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const sponsorshipLevels = [
  { value: 'gold', label: 'Gold Sponsor' },
  { value: 'silver', label: 'Silver Sponsor' },
  { value: 'bronze', label: 'Bronze Sponsor' },
];

export const SponsorshipDetails = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair mb-6">Sponsorship Details</h2>

      <FormField
        control={control}
        name="sponsorshipLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Sponsorship Level</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select sponsorship level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {sponsorshipLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="marketingGoals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Marketing Goals</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your marketing objectives for this event"
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
        name="targetAudience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Audience</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your target audience"
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
        name="previousExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Previous Sponsorship Experience</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Share your previous sponsorship experience"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};