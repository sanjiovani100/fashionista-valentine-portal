import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { EventCard } from './EventCard';
import { Loader2 } from 'lucide-react';
import type { FashionEvent } from '@/types/database';

export const EventList = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fashion_events')
        .select('*')
        .order('start_time', { ascending: true });

      if (error) throw error;
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