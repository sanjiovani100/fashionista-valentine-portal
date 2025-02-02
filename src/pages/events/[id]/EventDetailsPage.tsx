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

  // Early return for missing ID
  if (!id) {
    console.error('[EventDetails] No event ID provided');
    return <ErrorState error={new Error('No event ID provided')} />;
  }

  // Invalid ID format
  if (id === ':id') {
    console.error('[EventQuery] Invalid event ID format');
    return <ErrorState error={new Error('Invalid event ID format')} />;
  }

  // Invalid UUID format
  if (!UUID_REGEX.test(id)) {
    console.error('[EventQuery] Invalid UUID format:', id);
    return <ErrorState error={new Error('Invalid UUID format')} />;
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