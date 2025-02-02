import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { EventDetails } from '@/types/event-details.bridge';
import { isVenueFeatures, isEventHighlight, isBeachPartyDetails } from '@/types/event.types';
import { toast } from 'sonner';

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const useEventDetails = (eventId?: string) => {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      // Validate event ID
      if (!eventId) {
        console.error('[EventQuery] Event ID is required');
        throw new Error('Event ID is required');
      }

      if (eventId === ':id') {
        console.error('[EventQuery] Invalid event ID format');
        throw new Error('Invalid event ID format');
      }

      if (!UUID_REGEX.test(eventId)) {
        console.error('[EventQuery] Invalid UUID format:', eventId);
        throw new Error('Invalid UUID format');
      }

      console.log('[EventQuery] Fetching event with ID:', eventId);

      const { data, error } = await supabase
        .from('fashion_events')
        .select(`
          *,
          fashion_images (*),
          fashion_collections (*),
          event_content (*),
          event_tickets (*),
          event_sponsors (
            *,
            sponsor_profiles (*)
          ),
          swimwear_event_details (*)
        `)
        .eq('id', eventId)
        .maybeSingle();

      if (error) {
        console.error('[EventQuery] Error fetching event:', error);
        toast.error('Failed to load event details');
        throw error;
      }

      if (!data) {
        console.error('[EventQuery] Event not found');
        throw new Error('Event not found');
      }

      // Transform and validate the data
      const venue_features = data.venue_features as unknown;
      if (!isVenueFeatures(venue_features)) {
        console.error('[EventQuery] Invalid venue features format');
        throw new Error('Invalid venue features format');
      }

      const event_highlights = data.event_highlights as unknown[];
      if (!Array.isArray(event_highlights) || !event_highlights.every(isEventHighlight)) {
        console.error('[EventQuery] Invalid event highlights format');
        throw new Error('Invalid event highlights format');
      }

      // Transform swimwear event details if present
      const swimwear_event_details = data.swimwear_event_details ? {
        ...data.swimwear_event_details,
        beach_party_details: data.swimwear_event_details.beach_party_details as unknown
      } : null;

      if (swimwear_event_details?.beach_party_details && !isBeachPartyDetails(swimwear_event_details.beach_party_details)) {
        console.error('[EventQuery] Invalid beach party details format');
        throw new Error('Invalid beach party details format');
      }

      // Transform the data to match EventDetails type
      const eventDetails: EventDetails = {
        ...data,
        venue_features,
        event_highlights,
        swimwear_event_details
      };

      console.log('[EventQuery] Successfully loaded event data:', {
        title: eventDetails.title,
        imageCount: eventDetails.fashion_images?.length,
        ticketCount: eventDetails.event_tickets?.length,
        sponsorCount: eventDetails.event_sponsors?.length
      });

      return eventDetails;
    },
    enabled: Boolean(eventId) && eventId !== ':id',
    retry: 1,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    meta: {
      errorMessage: 'Failed to load event details'
    }
  });
};