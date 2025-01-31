import { toast } from "sonner";
import { cloudinaryConfig } from '@/components/cloudinary/config';
import type { EventContent, FashionCollection, FashionImage } from "@/types/event.types";

interface ImageMetadataValidation {
  isValid: boolean;
  message: string;
}

interface ProcessedImage {
  url: string;
  alt: string;
}

const processImage = (imageData: FashionImage | null): ProcessedImage => {
  if (!imageData) {
    return {
      url: cloudinaryConfig.defaults.placeholders.highlight,
      alt: 'Default event image'
    };
  }
  
  const metadata = imageData.metadata as Record<string, unknown> || {};
  
  // Try to get URL from metadata first
  if (typeof metadata.media_url === 'string' && metadata.media_url) {
    return {
      url: metadata.media_url,
      alt: imageData.alt_text || 'Event image'
    };
  }
  
  // Try cloudinary_id next
  if (typeof metadata.cloudinary_id === 'string' && metadata.cloudinary_id) {
    return {
      url: `https://res.cloudinary.com/${cloudinaryConfig.cloud.cloudName}/image/upload/v1/${metadata.cloudinary_id}`,
      alt: imageData.alt_text || 'Event image'
    };
  }
  
  // If no valid metadata URLs, use the image's direct URL
  if (imageData.url) {
    return {
      url: imageData.url,
      alt: imageData.alt_text || 'Event image'
    };
  }
  
  // Fallback to default
  return {
    url: cloudinaryConfig.defaults.placeholders.highlight,
    alt: 'Default event image'
  };
};

const validateImageMetadata = (metadata: unknown): ImageMetadataValidation => {
  const metadataObj = metadata as Record<string, unknown>;
  
  // Check for either media_url or cloudinary_id
  const hasValidMetadata = Boolean(
    (typeof metadataObj?.media_url === 'string' && metadataObj.media_url.length > 0) ||
    (typeof metadataObj?.cloudinary_id === 'string' && metadataObj.cloudinary_id.length > 0) ||
    (typeof metadataObj?.page === 'string' && metadataObj.page.length > 0)
  );
  
  return {
    isValid: hasValidMetadata,
    message: hasValidMetadata 
      ? 'Metadata validation passed'
      : 'Missing required metadata fields'
  };
};

const transformHighlightImage = (highlight: Partial<EventContent>, images: FashionImage[]): string => {
  console.group(`[Transform] Processing highlight image for: ${highlight.title}`);
  
  try {
    console.log('Available images for highlight:', {
      totalImages: images.length,
      galleryImages: images.filter(img => img.category === 'event_gallery').length,
      promotionalImages: images.filter(img => img.category === 'promotional').length
    });
    
    // First try to get image from event_gallery category
    const galleryImage = images.find(img => {
      console.log('Checking image:', {
        id: img.id,
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

      return true;
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
    console.log('Available images for collection:', {
      totalImages: images.length,
      promotionalImages: images.filter(img => img.category === 'promotional').length
    });
    
    // Look for promotional images with lingerie_showcase metadata
    const showcaseImage = images.find(img => {
      console.log('Checking image:', {
        id: img.id,
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
      const isValid = metadata.page === 'lingerie_showcase';
      
      console.log('Image evaluation:', {
        isValid,
        collectionId: collection.id,
        page: metadata.page
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
    imagesCount: eventData.fashion_images?.length,
    collectionsCount: eventData.fashion_collections?.length
  });

  // Transform highlights with proper image URL handling and validation
  const highlights = (eventData.event_content || [])
    .filter((content: EventContent) => content.content_type === 'highlight')
    .map((highlight: EventContent) => {
      console.log('Processing highlight:', highlight.title);
      
      const galleryImage = (eventData.fashion_images || []).find((img: FashionImage) => {
        if (img.category !== 'event_gallery') return false;
        
        const validation = validateImageMetadata(img.metadata);
        if (!validation.isValid) {
          console.warn('Invalid metadata:', validation.message);
          return false;
        }

        return true;
      });

      const processedImage = processImage(galleryImage);
      
      return {
        ...highlight,
        event_id: highlight.event_id || '',
        media_urls: highlight.media_urls || [],
        publish_date: highlight.publish_date || new Date().toISOString(),
        engagement_metrics: highlight.engagement_metrics || {},
        image: processedImage.url,
        alt: processedImage.alt,
        isLoading: false
      };
    })
    .slice(0, 3);

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
    hasHeroImage: !!heroImage
  });

  console.groupEnd();
  return {
    highlights,
    collectionsWithImages,
    heroImage,
  };
};
