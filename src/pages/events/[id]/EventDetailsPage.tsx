import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PageLayout } from '@/components/layout/PageLayout';
import { EventHero } from './components/EventHero';
import { EventContent } from './components/EventContent';
import { EventSidebar } from './components/EventSidebar';
import { LoadingState } from '@/pages/index/components/LoadingState';
import { ErrorState } from '@/pages/index/components/ErrorState';

const EventDetailsPage = () => {
  const { id } = useParams();

  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fashion_events')
        .select(`
          *,
          swimwear_event_details(*),
          fashion_collections(
            *,
            designer_profiles(*)
          ),
          fashion_images(*),
          event_sponsors(
            *,
            sponsor_profiles(*)
          ),
          event_tickets(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!event) return <ErrorState message="Event not found" />;

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800">
        <EventHero event={event} />
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EventContent event={event} />
            </div>
            <div className="lg:col-span-1">
              <EventSidebar event={event} />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default EventDetailsPage;