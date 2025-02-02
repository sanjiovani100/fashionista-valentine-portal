import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { FashionEvent } from '@/types/event.types';
import { toast } from '@/hooks/use-toast';

export const useEventDetails = (eventId?: string) => {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      if (!eventId) {
        throw new Error('Event ID is required');
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
        .eq('id', eventId)
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
    enabled: Boolean(eventId)
  });
};