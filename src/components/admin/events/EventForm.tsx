import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { EventDetails } from '@/types/event';

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  venue: z.string().min(1, 'Venue is required'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  start_time: z.date(),
  end_time: z.date(),
  registration_deadline: z.date(),
  theme: z.string().min(1, 'Theme is required'),
  meta_description: z.string().optional(),
  meta_keywords: z.array(z.string()).optional(),
  venue_features: z.object({
    pool_specs: z.object({
      dimensions: z.string(),
      depth: z.string(),
      temperature: z.string()
    }).optional(),
    changing_facilities: z.object({
      capacity: z.number(),
      amenities: z.array(z.string())
    }).optional(),
    photography_zones: z.array(z.object({
      name: z.string(),
      capacity: z.number(),
      equipment_allowed: z.array(z.string())
    })).optional()
  }).optional()
});

type EventFormData = z.infer<typeof eventSchema>;

interface EventFormProps {
  event?: Partial<EventDetails>;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({ event, onSubmit, onCancel }) => {
  const defaultValues: EventFormData = {
    title: event?.title ?? '',
    description: event?.description ?? '',
    venue: event?.venue ?? '',
    capacity: event?.capacity ?? 100,
    start_time: event?.start_time ? new Date(event.start_time) : new Date(),
    end_time: event?.end_time ? new Date(event.end_time) : new Date(),
    registration_deadline: event?.registration_deadline ? new Date(event.registration_deadline) : new Date(),
    theme: event?.theme ?? '',
    meta_description: event?.meta_description ?? '',
    meta_keywords: event?.meta_keywords ?? [],
    venue_features: {
      pool_specs: event?.venue_features?.pool_specs ?? {
        dimensions: '',
        depth: '',
        temperature: ''
      },
      changing_facilities: event?.venue_features?.changing_facilities ?? {
        capacity: 0,
        amenities: []
      },
      photography_zones: event?.venue_features?.photography_zones ?? []
    }
  };

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Basic Information</h3>
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter event title"
                    className="bg-black/20 border-white/10 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter event description"
                    className="bg-black/20 border-white/10 text-white min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="venue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter venue"
                      className="bg-black/20 border-white/10 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter capacity"
                      className="bg-black/20 border-white/10 text-white"
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Date and Time */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Date and Time</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="start_time"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      value={value}
                      onChange={onChange}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end_time"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      value={value}
                      onChange={onChange}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="registration_deadline"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Registration Deadline</FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={value}
                    onChange={onChange}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Theme and SEO */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Theme and SEO</h3>
          
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Theme</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter event theme"
                    className="bg-black/20 border-white/10 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter meta description"
                    className="bg-black/20 border-white/10 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="bg-transparent border-white/10 text-white hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary text-white hover:bg-primary/90"
          >
            {event ? 'Update Event' : 'Create Event'}
          </Button>
        </div>
      </form>
    </Form>
  );
}; 