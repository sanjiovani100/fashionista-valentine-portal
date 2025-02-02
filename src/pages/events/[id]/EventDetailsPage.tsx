import React from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { EventHero } from './components/EventHero';
import { EventContent } from './components/EventContent';
import { EventSidebar } from './components/EventSidebar';
import { useEventDetails } from './hooks/useEventDetails';
import { LoadingState } from '@/pages/index/components/LoadingState';
import { ErrorState } from '@/pages/index/components/ErrorState';
import { ImageErrorBoundary } from '@/components/cloudinary';

export const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error } = useEventDetails(id);

  // Early return for missing ID
  if (!id) {
    return <ErrorState error={new Error('No event ID provided')} />;
  }

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return <ErrorState error={error} />;
  }

  // Not found state
  if (!event) {
    return <ErrorState error={new Error('Event not found')} />;
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <ImageErrorBoundary fallback={<div>Failed to load event hero</div>}>
          <EventHero event={event} />
        </ImageErrorBoundary>
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <ImageErrorBoundary fallback={<div>Failed to load event content</div>}>
                <EventContent event={event} />
              </ImageErrorBoundary>
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