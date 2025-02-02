import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { FashionEvent } from '@/types/event.types';
import { toast } from '@/hooks/use-toast';

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const useEventDetails = (eventId?: string) => {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      // Validate event ID
      if (!eventId) {
        console.error('Event ID is required');
        throw new Error('Event ID is required');
      }

      if (eventId === ':id') {
        console.error('Invalid event ID format');
        throw new Error('Invalid event ID format');
      }

      if (!UUID_REGEX.test(eventId)) {
        console.error('Invalid UUID format:', eventId);
        throw new Error('Invalid UUID format');
      }

      console.log('Fetching event with ID:', eventId);

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
          )
        `)
        .match({ id: eventId })
        .maybeSingle();

      if (error) {
        console.error('Error fetching event:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load event details"
        });
        throw error;
      }

      if (!data) {
        throw new Error('Event not found');
      }

      return data as FashionEvent;
    },
    enabled: Boolean(eventId) && eventId !== ':id',
    retry: 1,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    meta: {
      errorMessage: 'Failed to load event details'
    }
  });
};