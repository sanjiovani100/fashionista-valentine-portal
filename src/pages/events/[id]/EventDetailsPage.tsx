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
import { SwimwearHero } from './components/swimwear/SwimwearHero';
import { toast } from 'sonner';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error } = useEventDetails(id);

  // Validate ID format and existence
  React.useEffect(() => {
    if (!id) {
      console.error('[EventDetails] No event ID provided');
      return;
    }

    if (id === ':id') {
      console.error('[EventQuery] Invalid event ID format');
      return;
    }

    if (!UUID_REGEX.test(id)) {
      console.error('[EventQuery] Invalid UUID format:', id);
      return;
    }

    console.log('[EventDetails] Validating event ID:', id);
  }, [id]);

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

      console.log('[EventDetails] Data relationships:', {
        images: event.fashion_images?.map(img => ({
          id: img.id,
          category: img.category,
          url: img.url
        })),
        tickets: event.event_tickets?.map(ticket => ({
          id: ticket.id,
          type: ticket.ticket_type,
          price: ticket.price
        })),
        sponsors: event.event_sponsors?.map(sponsor => ({
          id: sponsor.id,
          name: sponsor.sponsor_profiles?.company_name
        }))
      });

      toast.success('Event details loaded successfully');
    }
  }, [event]);

  // Handle different error scenarios with specific messages
  const getErrorMessage = () => {
    if (!id) {
      return new Error('Please provide an event ID to view event details.');
    }

    if (id === ':id') {
      return new Error('The event ID is not properly formatted. Please check the URL.');
    }

    if (!UUID_REGEX.test(id)) {
      return new Error('The provided event ID is not valid. Please check the URL and try again.');
    }

    if (error) {
      return error;
    }

    if (!event) {
      return new Error('Event not found. Please check if the event ID is correct.');
    }

    return null;
  };

  const errorMessage = getErrorMessage();

  // Early return for error states with specific messages
  if (errorMessage) {
    console.error('[EventDetails] Error:', errorMessage.message);
    return <ErrorState error={errorMessage} />;
  }

  // Loading state
  if (isLoading) {
    console.log('[EventDetails] Loading event data...');
    return <LoadingState />;
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