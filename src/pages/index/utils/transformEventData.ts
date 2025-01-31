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
  
  // Check for direct media_url first
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
      console.log('[Image Selection] Found linked image:', linkedImage);
      return linkedImage;
    }

    // Then try to find a gallery image that hasn't been used yet
    const unusedGalleryImage = images.find(img => {
      if (img.category !== 'event_gallery') return false;
      
      const metadata = img.metadata as Record<string, unknown> || {};
      const validation = validateImageMetadata(metadata);
      
      console.log('[Image Selection] Validating gallery image:', {
        id: img.id,
        validation,
        metadata
      });
      
      return validation.isValid && !metadata.used;
    });

    if (unusedGalleryImage) {
      // Mark the image as used
      if (unusedGalleryImage.metadata && typeof unusedGalleryImage.metadata === 'object') {
        (unusedGalleryImage.metadata as Record<string, unknown>).used = true;
      }
      console.log('[Image Selection] Found unused gallery image:', unusedGalleryImage);
      return unusedGalleryImage;
    }

    console.warn('[Image Selection] No suitable image found');
    return null;
  } catch (error) {
    console.error('[Image Selection] Error finding highlight image:', error);
    return null;
  } finally {
    console.groupEnd();
  }
};

export const transformEventData = (eventData: any) => {
  console.group('[Transform] Starting event data transformation');
  
  if (!eventData) {
    console.error('[Transform] No event data provided');
    console.groupEnd();
    return {
      highlights: [],
      collectionsWithImages: [],
      heroImage: cloudinaryConfig.defaults.placeholders.hero
    };
  }

  console.log('[Transform] Initial data:', {
    contentCount: eventData.event_content?.length,
    imagesCount: eventData.fashion_images?.length,
    collectionsCount: eventData.fashion_collections?.length
  });

  // Reset the 'used' flag for all images
  const availableImages = (eventData.fashion_images || []).map(img => ({
    ...img,
    metadata: { ...(img.metadata || {}), used: false }
  }));

  // Transform highlights with proper image URL handling and validation
  const highlights = (eventData.event_content || [])
    .filter((content: EventContent) => content.content_type === 'highlight')
    .map((highlight: EventContent) => {
      console.log('[Transform] Processing highlight:', highlight.title);
      
      const highlightImage = findHighlightImage(highlight, availableImages);
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
      console.log('[Transform] Processing collection:', collection.collection_name);
      
      const collectionImage = availableImages.find(img => {
        const metadata = img.metadata as Record<string, unknown> || {};
        return metadata.collection_id === collection.id;
      });

      const processedImage = processImage(collectionImage);
      
      return {
        ...collection,
        designer_id: collection.designer_id || '',
        event_id: collection.event_id || '',
        technical_requirements: collection.technical_requirements || '',
        sustainability_info: collection.sustainability_info || '',
        image: processedImage.url,
        isLoading: false
      };
    })
    .slice(0, 3);

  // Get hero image with enhanced selection logic
  const heroImage = processImage(
    availableImages.find((img: FashionImage) => {
      const metadata = img.metadata as Record<string, unknown>;
      return img.category === 'promotional' && metadata?.page === 'home';
    })
  ).url || cloudinaryConfig.defaults.placeholders.hero;

  console.log('[Transform] Transformation complete:', {
    highlightsCount: highlights.length,
    collectionsCount: collectionsWithImages.length,
    hasHeroImage: !!heroImage,
    highlights
  });

  console.groupEnd();
  return {
    highlights,
    collectionsWithImages,
    heroImage,
  };
};