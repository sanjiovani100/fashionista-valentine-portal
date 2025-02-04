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
          swimwear_event_details (*)
        `)
        .eq('subtype', 'swimwear')
        .single();

      if (eventError) throw eventError;
      return eventData as SwimwearEvent;
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