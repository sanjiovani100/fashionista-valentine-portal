import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { FashionEvent } from "@/types/database";
import { cloudinaryConfig } from "@/components/cloudinary/config";

interface ImageMetadata {
  page?: string;
  content_id?: string;
  collection_id?: string;
  uploadedAt?: string;
}

const validateImageMetadata = (metadata: unknown): { isValid: boolean; missingFields: string[] } => {
  if (!metadata || typeof metadata !== 'object') {
    console.warn('[Image Validation] Invalid metadata structure:', metadata);
    return { isValid: false, missingFields: ['metadata structure invalid'] };
  }
  
  const required = ['page', 'content_id', 'collection_id'];
  const metadataObj = metadata as Record<string, unknown>;
  const missingFields = required.filter(field => !metadataObj[field]);
  
  if (missingFields.length > 0) {
    console.warn('[Image Validation] Missing required fields:', {
      metadata,
      missingFields
    });
  }
  
  return { isValid: missingFields.length === 0, missingFields };
};

export const useEventData = () => {
  return useQuery({
    queryKey: ['active-fashion-event'],
    queryFn: async () => {
      console.group('[Event Data] Fetching event data...');
      
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
              dimensions,
              formats,
              thumbnail_url,
              credits,
              event_id,
              created_at,
              updated_at
            )
          `)
          .eq('name', 'valentines_fashion_show')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (eventError) {
          console.error("[Query Error]", {
            code: eventError.code,
            message: eventError.message,
            details: eventError.details,
            timestamp: new Date().toISOString()
          });
          
          toast.error("Failed to load event data");
          throw eventError;
        }

        if (!eventData) {
          console.error("[Query] No event data found");
          toast.error("Event data not found");
          return null;
        }

        // Log image data for debugging
        console.group('[Image Analysis]');
        
        const imagesByCategory = eventData.fashion_images?.reduce((acc, img) => {
          acc[img.category] = (acc[img.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        console.log('Images by category:', imagesByCategory);

        eventData.fashion_images?.forEach((image, index) => {
          const validation = validateImageMetadata(image.metadata);
          
          console.log(`Image ${index + 1}:`, {
            id: image.id,
            category: image.category,
            metadata: image.metadata,
            url: image.url,
            isValid: validation.isValid,
            missingFields: validation.missingFields
          });
        });

        // Log content data for debugging
        console.group('[Content Analysis]');
        console.log('Event content count:', eventData.event_content?.length);
        console.log('Collections count:', eventData.fashion_collections?.length);
        
        const contentWithImages = eventData.event_content?.filter(content => 
          content.media_urls && content.media_urls.length > 0
        );
        
        console.log('Content items with images:', contentWithImages?.length);
        console.groupEnd();

        console.log("[Query] Event data fetched successfully:", {
          hasContent: !!eventData.event_content?.length,
          hasImages: !!eventData.fashion_images?.length,
          hasCollections: !!eventData.fashion_collections?.length,
          imageCount: eventData.fashion_images?.length || 0,
          contentCount: eventData.event_content?.length || 0,
          collectionsCount: eventData.fashion_collections?.length || 0
        });
        
        console.groupEnd();
        return eventData as FashionEvent;
      } catch (error) {
        console.error("[Query] Unexpected error:", error);
        toast.error("An unexpected error occurred");
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


