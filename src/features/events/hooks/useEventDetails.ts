import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { EventDetails } from '@/types/event-details.bridge';
import { isVenueFeatures, isEventHighlight, isBeachPartyDetails, transformVenueFeatures, transformEventHighlights } from '@/types/event.types';
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
      const venue_features = transformVenueFeatures(data.venue_features);
      const event_highlights = transformEventHighlights(data.event_highlights);

      // Transform swimwear event details if present
      const swimwear_event_details = data.swimwear_event_details ? {
        id: data.swimwear_event_details.id,
        event_id: data.swimwear_event_details.event_id,
        beach_party_details: isBeachPartyDetails(data.swimwear_event_details.beach_party_details)
          ? data.swimwear_event_details.beach_party_details
          : { location: '', time: '', features: [] },
        pool_access_info: data.swimwear_event_details.pool_access_info || {},
        fitting_sessions: data.swimwear_event_details.fitting_sessions || [],
        beauty_workshops: data.swimwear_event_details.beauty_workshops || [],
        created_at: data.swimwear_event_details.created_at,
        updated_at: data.swimwear_event_details.updated_at
      } : null;

      // Transform collections data
      const fashion_collections = data.fashion_collections?.map(collection => ({
        ...collection,
        size_range: collection.size_range as Record<string, string>
      })) || null;

      // Transform event content data
      const event_content = data.event_content?.map(content => ({
        ...content,
        engagement_metrics: content.engagement_metrics as Record<string, unknown>
      })) || null;

      // Transform fashion images data
      const fashion_images = data.fashion_images?.map(image => ({
        ...image,
        metadata: image.metadata as Record<string, unknown>,
        formats: image.formats as Record<string, unknown>,
        dimensions: image.dimensions as Record<string, unknown>
      })) || null;

      console.log('[EventQuery] Successfully loaded event data:', {
        title: data.title,
        imageCount: fashion_images?.length,
        ticketCount: data.event_tickets?.length,
        sponsorCount: data.event_sponsors?.length
      });

      return {
        ...data,
        venue_features,
        event_highlights,
        swimwear_event_details,
        fashion_collections,
        event_content,
        event_tickets: data.event_tickets || null,
        event_sponsors: data.event_sponsors || null,
        fashion_images
      } as EventDetails;
    },
    enabled: Boolean(eventId) && eventId !== ':id',
    retry: 1,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    meta: {
      errorMessage: 'Failed to load event details'
    }
  });
};