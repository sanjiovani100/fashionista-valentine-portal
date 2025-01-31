import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { FashionEvent } from "@/types/database";

export const useEventData = () => {
  return useQuery({
    queryKey: ['active-fashion-event'],
    queryFn: async () => {
      console.log("[Query] Fetching event data...");
      
      const { data: eventData, error: eventError } = await supabase
        .from('fashion_events')
        .select(`
          *,
          event_tickets(*),
          event_content(*),
          fashion_collections(
            *,
            designer_profiles(*)
          ),
          fashion_images!inner(
            id,
            category,
            url,
            alt_text,
            metadata,
            description,
            event_id,
            created_at,
            updated_at,
            thumbnail_url,
            credits,
            dimensions,
            formats
          )
        `)
        .eq('name', 'valentines_fashion_show')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (eventError) {
        console.error("[Query] Error fetching event data:", eventError);
        toast.error("Failed to load event data. Please try again.");
        throw eventError;
      }
      
      if (!eventData) {
        console.error("[Query] No event data found");
        toast.error("Event data not found");
        return null;
      }

      console.log("[Query] Event data fetched successfully:", {
        hasContent: !!eventData.event_content?.length,
        hasImages: !!eventData.fashion_images?.length,
        hasCollections: !!eventData.fashion_collections?.length
      });
      
      return eventData as FashionEvent;
    },
    retry: 2,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    meta: {
      errorMessage: "There was a problem loading the event data. Please try again later."
    }
  });
};