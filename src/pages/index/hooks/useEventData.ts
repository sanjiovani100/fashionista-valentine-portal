import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { FashionEvent } from "@/types/database";

interface QueryError {
  message: string;
  details?: string;
  hint?: string;
}

export const useEventData = () => {
  return useQuery({
    queryKey: ['active-fashion-event'],
    queryFn: async () => {
      console.log("[Query] Fetching event data...");
      
      try {
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
          console.error("[Query] Error fetching event data:", {
            error: eventError,
            timestamp: new Date().toISOString()
          });
          
          toast.error("Failed to load event data. Please try again.", {
            description: "There was a problem connecting to the server."
          });
          
          throw eventError;
        }
        
        if (!eventData) {
          console.error("[Query] No event data found", {
            timestamp: new Date().toISOString()
          });
          
          toast.error("Event data not found", {
            description: "The requested event could not be found."
          });
          
          return null;
        }

        // Log successful data fetch with important counts
        console.log("[Query] Event data fetched successfully:", {
          hasContent: !!eventData.event_content?.length,
          hasImages: !!eventData.fashion_images?.length,
          hasCollections: !!eventData.fashion_collections?.length,
          imageCount: eventData.fashion_images?.length || 0,
          contentCount: eventData.event_content?.length || 0,
          collectionsCount: eventData.fashion_collections?.length || 0
        });

        // Validate image metadata
        eventData.fashion_images?.forEach((image, index) => {
          if (!image.metadata) {
            console.warn(`[Query] Image ${index} missing metadata:`, {
              imageId: image.id,
              category: image.category
            });
          }
        });
        
        return eventData as FashionEvent;
      } catch (err) {
        const error = err as QueryError;
        console.error("[Query] Unexpected error:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          timestamp: new Date().toISOString()
        });
        
        toast.error("An unexpected error occurred.", {
          description: "Please try refreshing the page."
        });
        
        throw error;
      }
    },
    retry: 2,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    meta: {
      errorMessage: "There was a problem loading the event data. Please try again later."
    }
  });
};