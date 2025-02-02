import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { EventHero } from './components/EventHero';
import { EventContent } from './components/EventContent';
import { EventSidebar } from './components/EventSidebar';
import { useEventDetails } from '@/features/events/hooks/useEventDetails';
import { LoadingState } from '@/pages/index/components/LoadingState';
import { ErrorState } from '@/pages/index/components/ErrorState';
import { ImageErrorBoundary } from '@/components/cloudinary';
import { SwimwearHero } from './components/swimwear/SwimwearHero';
import { toast } from 'sonner';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: event, isLoading, error } = useEventDetails(id);

  // Validate ID format and existence
  React.useEffect(() => {
    if (!id) {
      console.error('[EventDetails] No event ID provided');
      toast.error('Please provide an event ID to view event details.');
      navigate('/events');
      return;
    }

    if (!UUID_REGEX.test(id)) {
      console.error('[EventQuery] Invalid UUID format:', id);
      toast.error('The event ID is not properly formatted. Please check the URL.');
      navigate('/events');
      return;
    }

    console.log('[EventDetails] Validating event ID:', id);
  }, [id, navigate]);

  // Log data relationships
  React.useEffect(() => {
    if (event) {
      console.log('[EventQuery] Successfully loaded event data:', {
        title: event.title,
        hasImages: event.fashion_images?.length > 0,
        hasTickets: event.event_tickets?.length > 0,
        hasSponsors: event.event_sponsors?.length > 0,
        imageCount: event.fashion_images?.length,
        ticketCount: event.event_tickets?.length,
        sponsorCount: event.event_sponsors?.length
      });

      toast.success('Event details loaded successfully');
    }
  }, [event]);

  // Loading state
  if (isLoading) {
    console.log('[EventDetails] Loading event data...');
    return <LoadingState />;
  }

  // Error state
  if (error) {
    console.error('[EventDetails] Error:', error);
    return <ErrorState error={error instanceof Error ? error : new Error('Failed to load event')} />;
  }

  // No event found
  if (!event) {
    console.error('[EventDetails] Event not found');
    return <ErrorState error={new Error('Event not found. Please check if the event ID is correct.')} />;
  }

  // Determine if this is a swimwear event
  const isSwimwearEvent = event.subtype === 'swimwear';

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <ImageErrorBoundary fallback={<div>Failed to load event hero</div>}>
          {isSwimwearEvent ? (
            <SwimwearHero event={event} />
          ) : (
            <EventHero event={event} />
          )}
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