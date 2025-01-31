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
  console.group(`[Transform] Processing highlight image for: ${highlight.title}`);
  
  try {
    console.log('Available images for highlight:', images.length);
    
    // First try to get image from event_gallery category with matching content_id
    const galleryImage = images.find(img => {
      console.log('Checking image:', {
        category: img.category,
        metadata: img.metadata,
        url: img.url
      });

      if (img.category !== 'event_gallery') {
        console.debug('Skipping non-gallery image');
        return false;
      }
      
      if (!img.metadata) {
        console.warn('Missing metadata for image');
        return false;
      }
      
      const validation = validateImageMetadata(img.metadata);
      if (!validation.isValid) {
        console.warn('Invalid metadata:', validation.message);
        return false;
      }
      
      const isMatch = img.metadata && 
                     (img.metadata as Record<string, unknown>).content_id === highlight.id;
      
      console.log('Image evaluation:', {
        isMatch,
        highlightId: highlight.id,
        contentId: (img.metadata as Record<string, unknown>).content_id
      });
      
      return isMatch;
    });

    if (galleryImage?.url) {
      console.log('Found gallery image:', galleryImage.url);
      console.groupEnd();
      return galleryImage.url;
    }

    // Fallback to media_urls if available
    if (Array.isArray(highlight.media_urls) && highlight.media_urls[0]) {
      console.log('Using media_url:', highlight.media_urls[0]);
      console.groupEnd();
      return highlight.media_urls[0];
    }

    console.warn('No valid image found, using fallback');
    console.groupEnd();
    return cloudinaryConfig.defaults.placeholders.highlight;
  } catch (error) {
    console.error('Error transforming highlight image:', error);
    console.groupEnd();
    toast.error(`Failed to load image for highlight: ${highlight.title}`);
    return cloudinaryConfig.defaults.placeholders.highlight;
  }
};

const transformCollectionImage = (collection: Partial<FashionCollection>, images: FashionImage[]): string => {
  console.group(`[Transform] Processing collection image for: ${collection.collection_name}`);
  
  try {
    console.log('Available images for collection:', images.length);
    
    // Look for promotional images with lingerie_showcase metadata
    const showcaseImage = images.find(img => {
      console.log('Checking image:', {
        category: img.category,
        metadata: img.metadata,
        url: img.url
      });

      if (img.category !== 'promotional') {
        console.debug('Skipping non-promotional image');
        return false;
      }
      
      if (!img.metadata) {
        console.warn('Missing metadata for image');
        return false;
      }
      
      const metadata = img.metadata as Record<string, unknown>;
      const isValid = metadata.page === 'lingerie_showcase' && 
                     metadata.collection_id === collection.id;
      
      console.log('Image evaluation:', {
        isValid,
        collectionId: collection.id,
        page: metadata.page,
        metadataCollectionId: metadata.collection_id
      });
      
      return isValid;
    });

    if (showcaseImage?.url) {
      console.log('Found showcase image:', showcaseImage.url);
      console.groupEnd();
      return showcaseImage.url;
    }

    console.warn('No valid image found, using fallback');
    console.groupEnd();
    return cloudinaryConfig.defaults.placeholders.collection;
  } catch (error) {
    console.error('Error transforming collection image:', error);
    console.groupEnd();
    toast.error(`Failed to load image for collection: ${collection.collection_name}`);
    return cloudinaryConfig.defaults.placeholders.collection;
  }
};

export const transformEventData = (eventData: any) => {
  console.group('[Transform] Starting event data transformation');
  
  if (!eventData) {
    console.error('No event data provided');
    console.groupEnd();
    return {
      highlights: [],
      collectionsWithImages: [],
      heroImage: cloudinaryConfig.defaults.placeholders.hero
    };
  }

  console.log('Initial data:', {
    contentCount: eventData.event_content?.length,
    imagesCount: eventData.fashion_images?.length
  });

  // Transform highlights with proper image URL handling and validation
  const highlights = (eventData.event_content || [])
    .filter((content: EventContent) => content.content_type === 'highlight')
    .map((highlight: EventContent) => {
      console.log('Processing highlight:', highlight.title);
      
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
      console.log('Processing collection:', collection.collection_name);
      
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
    console.log('Checking hero image:', {
      category: img.category,
      metadata: img.metadata
    });

    if (img.category !== 'promotional' || !img.metadata) {
      console.debug('Skipping non-promotional or missing metadata image');
      return false;
    }
    
    const metadata = img.metadata as Record<string, unknown>;
    return metadata.page === 'home';
  })?.url || cloudinaryConfig.defaults.placeholders.hero;

  console.log('Transformation complete:', {
    highlightsCount: highlights.length,
    collectionsCount: collectionsWithImages.length,
    hasHeroImage: !!heroImage
  });

  console.groupEnd();
  return {
    highlights,
    collectionsWithImages,
    heroImage,
  };
};