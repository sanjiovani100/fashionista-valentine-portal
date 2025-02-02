import React from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { EventHero } from './components/EventHero';
import { EventContent } from './components/EventContent';
import { EventSidebar } from './components/EventSidebar';
import { useEventDetails } from './hooks/useEventDetails';
import { LoadingState } from '@/pages/index/components/LoadingState';
import { ErrorState } from '@/pages/index/components/ErrorState';

export const EventDetailsPage = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { data: event, isLoading, error } = useEventDetails(id);

  if (!id) return <ErrorState error={new Error('No event ID provided')} />;
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!event) return <ErrorState error={new Error('Event not found')} />;

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <EventHero event={event} />
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <EventContent event={event} />
            </div>
            <div className="lg:col-span-4">
              <EventSidebar event={event} />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default EventDetailsPage;