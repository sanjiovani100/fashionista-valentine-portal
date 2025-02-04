import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PageLayout } from '@/components/layout/PageLayout';
import { SwimwearHero } from './components/SwimwearHero';
import { SwimwearDetails } from './components/SwimwearDetails';
import { SwimwearSchedule } from './components/SwimwearSchedule';
import type { SwimwearEvent } from '@/types/swimwear.types';

const SwimwearEventPage = () => {
  const { data: event, isLoading, error } = useQuery({
    queryKey: ['swimwear-event'],
    queryFn: async () => {
      const { data: eventData, error: eventError } = await supabase
        .from('fashion_events')
        .select(`
          *,
          swimwear_event_details!inner (*)
        `)
        .eq('subtype', 'swimwear')
        .single();

      if (eventError) throw eventError;
      
      if (!eventData) throw new Error('No swimwear event found');

      // Get the first swimwear event details record
      const eventDetails = eventData.swimwear_event_details;

      // Transform the data to match SwimwearEvent interface
      const swimwearEvent: SwimwearEvent = {
        id: eventData.id,
        title: eventData.title,
        description: eventData.description,
        venue: eventData.venue,
        start_time: eventData.start_time,
        end_time: eventData.end_time,
        registration_deadline: eventData.registration_deadline,
        capacity: eventData.capacity,
        theme: eventData.theme,
        details: {
          id: eventDetails.id,
          event_id: eventDetails.event_id,
          beach_party_details: eventDetails.beach_party_details,
          pool_access_info: eventDetails.pool_access_info,
          fitting_sessions: eventDetails.fitting_sessions,
          beauty_workshops: eventDetails.beauty_workshops,
          created_at: eventDetails.created_at,
          updated_at: eventDetails.updated_at
        }
      };

      return swimwearEvent;
    }
  });

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold text-red-500">Error Loading Event</h1>
          <p className="mt-2 text-gray-600">Please try again later</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SwimwearHero event={event} />
      <SwimwearDetails event={event} />
      <SwimwearSchedule event={event} />
    </PageLayout>
  );
};

export default SwimwearEventPage;