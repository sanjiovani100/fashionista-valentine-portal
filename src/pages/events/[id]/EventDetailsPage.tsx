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
import { toast } from 'sonner';

export const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error } = useEventDetails(id);

  // Log the current state for testing
  React.useEffect(() => {
    console.log('[EventDetails] Current state:', {
      id,
      isLoading,
      hasError: !!error,
      eventLoaded: !!event,
      imageCount: event?.fashion_images?.length,
      ticketCount: event?.event_tickets?.length,
      sponsorCount: event?.event_sponsors?.length
    });

    if (event) {
      toast.success('Event details loaded successfully');
    }
  }, [id, event, isLoading, error]);

  // Early return for missing ID
  if (!id) {
    console.error('[EventDetails] No event ID provided');
    return <ErrorState error={new Error('No event ID provided')} />;
  }

  // Loading state
  if (isLoading) {
    console.log('[EventDetails] Loading event data...');
    return <LoadingState />;
  }

  // Error state
  if (error) {
    console.error('[EventDetails] Error loading event:', error);
    return <ErrorState error={error} />;
  }

  // Not found state
  if (!event) {
    console.error('[EventDetails] Event not found for ID:', id);
    return <ErrorState error={new Error('Event not found')} />;
  }

  // Verify data relationships
  const hasImages = event.fashion_images && event.fashion_images.length > 0;
  const hasTickets = event.event_tickets && event.event_tickets.length > 0;
  const hasSponsors = event.event_sponsors && event.event_sponsors.length > 0;

  console.log('[EventDetails] Data relationships:', {
    hasImages,
    imageCount: event.fashion_images?.length,
    hasTickets,
    ticketCount: event.event_tickets?.length,
    hasSponsors,
    sponsorCount: event.event_sponsors?.length
  });

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