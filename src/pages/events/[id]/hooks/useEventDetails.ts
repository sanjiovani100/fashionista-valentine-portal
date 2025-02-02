import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { FashionEvent } from '@/types/event.types';

export const useEventDetails = (eventId?: string) => {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      if (!eventId) throw new Error('Event ID is required');

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
        .eq('id', eventId)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Event not found');

      return data as FashionEvent;
    },
    enabled: !!eventId
  });
};