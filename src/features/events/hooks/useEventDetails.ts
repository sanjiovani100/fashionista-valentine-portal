import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { EventDetails } from '@/types/event-details.bridge';
import { toast } from 'sonner';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const useEventDetails = (eventId?: string) => {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      // Validate event ID
      if (!eventId) {
        throw new Error('Event ID is required');
      }

      if (!UUID_REGEX.test(eventId)) {
        throw new Error('Invalid event ID format');
      }

      console.log('[EventQuery] Fetching event details:', eventId);

      const { data, error } = await supabase
        .from('fashion_events')
        .select(`
          *,
          fashion_images (*),
          event_content (*),
          swimwear_event_details (*),
          event_tickets (*),
          event_sponsors (
            *,
            sponsor_profiles (
              company_name
            )
          )
        `)
        .eq('id', eventId)
        .maybeSingle();

      if (error) {
        console.error('[EventQuery] Error:', error);
        throw error;
      }

      if (!data) {
        throw new Error('Event not found');
      }

      return data as EventDetails;
    },
    enabled: Boolean(eventId) && eventId !== ':id',
    retry: 1,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    meta: {
      errorMessage: 'Failed to load event details'
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to load event details');
    }
  });
};