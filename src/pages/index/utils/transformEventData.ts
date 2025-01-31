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
    console.warn('[Image Processing] No image data provided');
    return {
      url: cloudinaryConfig.defaults.placeholders.highlight,
      alt: 'Default event image'
    };
  }
  
  // First try to get URL from metadata
  const metadata = imageData.metadata as Record<string, unknown> || {};
  
  if (typeof metadata.media_url === 'string' && metadata.media_url) {
    console.log('[Image Processing] Using media_url from metadata:', metadata.media_url);
    return {
      url: metadata.media_url,
      alt: imageData.alt_text || 'Event image'
    };
  }
  
  // Then try cloudinary_id
  if (typeof metadata.cloudinary_id === 'string' && metadata.cloudinary_id) {
    const url = `https://res.cloudinary.com/${cloudinaryConfig.cloud.cloudName}/image/upload/v1/${metadata.cloudinary_id}`;
    console.log('[Image Processing] Using constructed Cloudinary URL:', url);
    return {
      url,
      alt: imageData.alt_text || 'Event image'
    };
  }
  
  // If we have a direct URL on the image, use that
  if (imageData.url) {
    console.log('[Image Processing] Using direct image URL:', imageData.url);
    return {
      url: imageData.url,
      alt: imageData.alt_text || 'Event image'
    };
  }
  
  console.warn('[Image Processing] No valid image source found, using fallback');
  return {
    url: cloudinaryConfig.defaults.placeholders.highlight,
    alt: 'Default event image'
  };
};

const validateImageMetadata = (metadata: unknown): ImageMetadataValidation => {
  if (!metadata || typeof metadata !== 'object') {
    return {
      isValid: false,
      message: 'Invalid metadata structure'
    };
  }
  
  const metadataObj = metadata as Record<string, unknown>;
  
  // Check for either media_url or cloudinary_id
  const hasValidSource = Boolean(
    (typeof metadataObj.media_url === 'string' && metadataObj.media_url) ||
    (typeof metadataObj.cloudinary_id === 'string' && metadataObj.cloudinary_id)
  );
  
  return {
    isValid: hasValidSource,
    message: hasValidSource ? 'Valid image source found' : 'No valid image source found'
  };
};

const findHighlightImage = (highlight: Partial<EventContent>, images: FashionImage[]): FashionImage | null => {
  console.group(`[Image Selection] Finding image for highlight: ${highlight.title}`);
  
  try {
    // First try to find an image specifically linked to this highlight
    const linkedImage = images.find(img => {
      const metadata = img.metadata as Record<string, unknown> || {};
      return metadata.content_id === highlight.id;
    });

    if (linkedImage) {
      console.log('Found linked image:', linkedImage);
      return linkedImage;
    }

    // Then try to find a gallery image
    const galleryImage = images.find(img => {
      if (img.category !== 'event_gallery') return false;
      
      const validation = validateImageMetadata(img.metadata);
      console.log('Validating gallery image:', {
        id: img.id,
        validation
      });
      
      return validation.isValid;
    });

    if (galleryImage) {
      console.log('Found gallery image:', galleryImage);
      return galleryImage;
    }

    console.warn('No suitable image found');
    return null;
  } catch (error) {
    console.error('Error finding highlight image:', error);
    return null;
  } finally {
    console.groupEnd();
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
      
      const highlightImage = findHighlightImage(highlight, eventData.fashion_images || []);
      const processedImage = processImage(highlightImage);
      
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

  // Transform collections with proper image handling
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

  // Get hero image with enhanced selection logic
  const heroImage = eventData.fashion_images?.find((img: FashionImage) => {
    if (img.category !== 'promotional') return false;
    
    const metadata = img.metadata as Record<string, unknown>;
    return metadata?.page === 'home';
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
