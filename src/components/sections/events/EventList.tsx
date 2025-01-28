import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { EventCard } from './EventCard';
import { Loader2 } from 'lucide-react';
import type { FashionEvent } from '@/types/database';

export const EventList = () => {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      console.log('Fetching events data...');
      const { data, error } = await supabase
        .from('fashion_events')
        .select(`
          *,
          event_content (*),
          fashion_collections (*),
          fashion_images (*),
          event_tickets (*)
        `)
        .order('start_time', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        throw error;
      }
      
      console.log('Events data:', data);
      return data as FashionEvent[];
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-fashion-pink" />
      </div>
    );
  }

  if (error) {
    console.error('Error in EventList:', error);
    return (
      <div className="text-red-500 text-center">
        Failed to load events. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events?.map((event) => (
        <EventCard 
          key={event.id} 
          event={event}
          onRegister={() => console.log('Register for event:', event.id)}
        />
      ))}
    </div>
  );
};