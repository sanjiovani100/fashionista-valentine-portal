import { toast } from "sonner";
import { cloudinaryConfig } from '@/components/cloudinary/config';
import type { EventContent, FashionCollection, FashionImage } from "@/types/event.types";

interface ImageMetadataValidation {
  isValid: boolean;
  missingFields: string[];
  message: string;
}

const validateImageMetadata = (metadata: unknown): ImageMetadataValidation => {
  const requiredFields = ['page', 'content_id', 'collection_id'];
  const metadataObj = metadata as Record<string, unknown>;
  
  const missingFields = requiredFields.filter(field => !metadataObj?.[field]);
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
    message: missingFields.length > 0 
      ? `Missing required metadata fields: ${missingFields.join(', ')}`
      : 'Metadata validation passed'
  };
};

const transformHighlightImage = (highlight: Partial<EventContent>, images: FashionImage[]): string => {
  console.log('[Transform] Processing highlight image for:', highlight.title);
  
  try {
    // First try to get image from event_gallery category with matching content_id
    const galleryImage = images.find(img => {
      if (img.category !== 'event_gallery' || !img.metadata) return false;
      
      const validation = validateImageMetadata(img.metadata);
      if (!validation.isValid) {
        console.warn(`[Transform] Invalid metadata for image:`, validation.message);
        return false;
      }
      
      return img.metadata && 
             (img.metadata as Record<string, unknown>).content_id === highlight.id;
    });

    if (galleryImage?.url) {
      console.log('[Transform] Found gallery image for highlight:', highlight.title);
      return galleryImage.url;
    }

    // Fallback to media_urls if available
    if (Array.isArray(highlight.media_urls) && highlight.media_urls[0]) {
      console.log('[Transform] Using media_url for highlight:', highlight.title);
      return highlight.media_urls[0];
    }

    console.warn(`[Transform] No valid image found for highlight: ${highlight.title}`);
    return cloudinaryConfig.defaults.placeholders.highlight;
  } catch (error) {
    console.error('[Transform] Error transforming highlight image:', error);
    toast.error(`Failed to load image for highlight: ${highlight.title}`);
    return cloudinaryConfig.defaults.placeholders.highlight;
  }
};

const transformCollectionImage = (collection: Partial<FashionCollection>, images: FashionImage[]): string => {
  console.log('[Transform] Processing collection image for:', collection.collection_name);
  
  try {
    // Look for promotional images with lingerie_showcase metadata
    const showcaseImage = images.find(img => {
      if (img.category !== 'promotional' || !img.metadata) {
        console.debug('[Transform] Skipping image - invalid category or missing metadata');
        return false;
      }
      
      const metadata = img.metadata as Record<string, unknown>;
      const isValid = metadata.page === 'lingerie_showcase' && 
                     metadata.collection_id === collection.id;
      
      if (!isValid) {
        console.debug('[Transform] Image metadata validation failed:', {
          page: metadata.page,
          collection_id: metadata.collection_id,
          expected_id: collection.id
        });
      }
      
      return isValid;
    });

    if (showcaseImage?.url) {
      console.log('[Transform] Found showcase image for collection:', collection.collection_name);
      return showcaseImage.url;
    }

    console.warn(`[Transform] No valid image found for collection: ${collection.collection_name}`);
    return cloudinaryConfig.defaults.placeholders.collection;
  } catch (error) {
    console.error('[Transform] Error transforming collection image:', error);
    toast.error(`Failed to load image for collection: ${collection.collection_name}`);
    return cloudinaryConfig.defaults.placeholders.collection;
  }
};

export const transformEventData = (eventData: any) => {
  if (!eventData) {
    console.error('[Transform] No event data provided');
    return {
      highlights: [],
      collectionsWithImages: [],
      heroImage: cloudinaryConfig.defaults.placeholders.hero
    };
  }

  console.log("[Transform] Starting event data transformation:", {
    contentCount: eventData.event_content?.length,
    imagesCount: eventData.fashion_images?.length
  });

  // Transform highlights with proper image URL handling and validation
  const highlights = (eventData.event_content || [])
    .filter((content: EventContent) => content.content_type === 'highlight')
    .map((highlight: EventContent) => {
      console.log('[Transform] Processing highlight:', highlight.title);
      
      return {
        ...highlight,
        event_id: highlight.event_id || '',
        media_urls: highlight.media_urls || [],
        publish_date: highlight.publish_date || new Date().toISOString(),
        engagement_metrics: highlight.engagement_metrics || {},
        image: transformHighlightImage(highlight, eventData.fashion_images || []),
        isLoading: false
      };
    })
    .slice(0, 3);

  // Transform collections with proper image handling and validation
  const collectionsWithImages = (eventData.fashion_collections || [])
    .map((collection: FashionCollection) => {
      console.log('[Transform] Processing collection:', collection.collection_name);
      
      return {
        ...collection,
        designer_id: collection.designer_id || '',
        event_id: collection.event_id || '',
        technical_requirements: collection.technical_requirements || '',
        sustainability_info: collection.sustainability_info || '',
        image: transformCollectionImage(collection, eventData.fashion_images || []),
        isLoading: false
      };
    })
    .slice(0, 3);

  // Get hero image with enhanced selection logic and validation
  const heroImage = eventData.fashion_images?.find((img: FashionImage) => {
    if (img.category !== 'promotional' || !img.metadata) {
      console.debug('[Transform] Skipping hero image - invalid category or missing metadata');
      return false;
    }
    
    const metadata = img.metadata as Record<string, unknown>;
    return metadata.page === 'home';
  })?.url || cloudinaryConfig.defaults.placeholders.hero;

  console.log("[Transform] Transformation complete:", {
    highlightsCount: highlights.length,
    collectionsCount: collectionsWithImages.length,
    hasHeroImage: !!heroImage
  });

  return {
    highlights,
    collectionsWithImages,
    heroImage,
  };
};