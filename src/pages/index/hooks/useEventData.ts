import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { FashionEvent } from "@/types/database";
import { cloudinaryConfig } from "@/components/cloudinary/config";

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

interface ImageFormats {
  original: string;
  thumbnail?: string;
  webp?: string;
  avif?: string;
}

interface ImageMetadata {
  page?: string;
  content_id?: string;
  collection_id?: string;
  uploadedAt?: string;
}

interface QueryError {
  code: string;
  message: string;
  details?: string;
}

const validateImageMetadata = (metadata: unknown): metadata is ImageMetadata => {
  if (!metadata || typeof metadata !== 'object') return false;
  
  const required = ['page', 'content_id', 'collection_id'];
  return required.every(field => field in metadata);
};

const getPromotionalImage = (images: FashionEvent['fashion_images'], type: 'hero' | 'highlight'): string => {
  const image = images?.find(img => {
    if (img.category !== 'promotional' || !img.metadata) return false;
    
    const metadata = img.metadata as ImageMetadata;
    return metadata.page === type;
  });

  if (!image) {
    console.warn(`[Image] No ${type} image found, using fallback`);
    return type === 'hero' 
      ? cloudinaryConfig.defaults.placeholders.hero 
      : cloudinaryConfig.defaults.placeholders.highlight;
  }

  return image.url;
};

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
          console.error("[Query] Error fetching event data:", {
            code: eventError.code,
            message: eventError.message,
            details: eventError.details,
            timestamp: new Date().toISOString()
          });
          
          toast.error("Failed to load event data", {
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

        // Validate image metadata and log issues
        eventData.fashion_images?.forEach((image, index) => {
          if (!validateImageMetadata(image.metadata)) {
            console.warn(`[Query] Image ${index} has invalid metadata:`, {
              imageId: image.id,
              category: image.category,
              metadata: image.metadata
            });
          }

          // Validate dimensions and formats
          if (!image.dimensions) {
            console.warn(`[Query] Image ${index} missing dimensions:`, {
              imageId: image.id,
              category: image.category
            });
          }

          if (!image.formats) {
            console.warn(`[Query] Image ${index} missing formats:`, {
              imageId: image.id,
              category: image.category
            });
          }
        });

        // Log successful data fetch with important counts
        console.log("[Query] Event data fetched successfully:", {
          hasContent: !!eventData.event_content?.length,
          hasImages: !!eventData.fashion_images?.length,
          hasCollections: !!eventData.fashion_collections?.length,
          imageCount: eventData.fashion_images?.length || 0,
          contentCount: eventData.event_content?.length || 0,
          collectionsCount: eventData.fashion_collections?.length || 0
        });
        
        return eventData as FashionEvent;
      } catch (error) {
        const queryError = error as QueryError;
        console.error("[Query] Unexpected error:", {
          code: queryError.code,
          message: queryError.message,
          details: queryError.details,
          timestamp: new Date().toISOString()
        });
        
        toast.error("An unexpected error occurred", {
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