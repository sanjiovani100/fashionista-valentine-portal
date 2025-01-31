import { toast } from "sonner";
import { cloudinaryConfig } from '@/components/cloudinary/config';
import type { EventContent, FashionCollection, FashionImage } from "@/types/event.types";

interface ImageMetadata {
  cloudinary_id?: string;
  media_url?: string;
  content_id?: string;
  collection_id?: string;
  page?: string;
}

interface ProcessedImage {
  url: string;
  alt: string;
}

const validateImageMetadata = (metadata: unknown): { isValid: boolean; message: string } => {
  if (!metadata || typeof metadata !== 'object') {
    console.warn('[Image Validation] Invalid metadata structure:', metadata);
    return { 
      isValid: false, 
      message: 'Invalid metadata structure' 
    };
  }
  
  const meta = metadata as ImageMetadata;
  
  // Check for either cloudinary_id or media_url
  if (meta.cloudinary_id || meta.media_url) {
    console.log('[Image Validation] Valid source found:', {
      hasCloudinaryId: !!meta.cloudinary_id,
      hasMediaUrl: !!meta.media_url
    });
    return { 
      isValid: true, 
      message: 'Valid image source found' 
    };
  }
  
  console.warn('[Image Validation] No valid image source found in metadata:', meta);
  return { 
    isValid: false, 
    message: 'No valid image source found' 
  };
};

const constructImageUrl = (imageData: FashionImage): ProcessedImage => {
  console.group('[URL Construction]');
  try {
    if (!imageData) {
      throw new Error('No image data provided');
    }

    const metadata = imageData.metadata as ImageMetadata;
    
    // First try media_url from metadata
    if (metadata?.media_url) {
      console.log('Using media_url from metadata:', metadata.media_url);
      return {
        url: metadata.media_url,
        alt: imageData.alt_text || 'Event image'
      };
    }
    
    // Then try cloudinary_id
    if (metadata?.cloudinary_id) {
      const url = `https://res.cloudinary.com/${cloudinaryConfig.cloud.cloudName}/image/upload/v1/${metadata.cloudinary_id}`;
      console.log('Using constructed Cloudinary URL:', url);
      return {
        url,
        alt: imageData.alt_text || 'Event image'
      };
    }
    
    // If we have a direct URL on the image, use that
    if (imageData.url) {
      console.log('Using direct image URL:', imageData.url);
      return {
        url: imageData.url,
        alt: imageData.alt_text || 'Event image'
      };
    }
    
    throw new Error('No valid image source found');
  } catch (error) {
    console.error('[URL Construction] Error:', error);
    return {
      url: cloudinaryConfig.defaults.placeholders.highlight,
      alt: 'Default event image'
    };
  } finally {
    console.groupEnd();
  }
};

const findHighlightImage = (highlight: Partial<EventContent>, images: FashionImage[]): FashionImage | null => {
  console.group(`[Image Selection] Finding image for highlight: ${highlight.title}`);
  
  try {
    // First try to find an image specifically linked to this highlight
    const linkedImage = images.find(img => {
      const metadata = img.metadata as ImageMetadata;
      return metadata?.content_id === highlight.id;
    });

    if (linkedImage) {
      console.log('[Image Selection] Found linked image:', linkedImage);
      return linkedImage;
    }

    // Then try to find a gallery image that hasn't been used yet
    const unusedGalleryImage = images.find(img => {
      if (img.category !== 'event_gallery') return false;
      
      const validation = validateImageMetadata(img.metadata);
      
      console.log('[Image Selection] Validating gallery image:', {
        id: img.id,
        validation,
        metadata: img.metadata
      });
      
      return validation.isValid;
    });

    if (unusedGalleryImage) {
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

  // Transform highlights with proper image URL handling and validation
  const highlights = (eventData.event_content || [])
    .filter((content: EventContent) => content.content_type === 'highlight')
    .map((highlight: EventContent) => {
      console.log('[Transform] Processing highlight:', highlight.title);
      
      const highlightImage = findHighlightImage(highlight, eventData.fashion_images || []);
      const processedImage = constructImageUrl(highlightImage || {
        url: cloudinaryConfig.defaults.placeholders.highlight,
        alt_text: highlight.title
      } as FashionImage);
      
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
      
      const collectionImage = eventData.fashion_images?.find(img => {
        const metadata = img.metadata as ImageMetadata;
        return metadata.collection_id === collection.id;
      });

      const processedImage = constructImageUrl(collectionImage || {
        url: cloudinaryConfig.defaults.placeholders.collection,
        alt_text: collection.collection_name
      } as FashionImage);
      
      return {
        ...collection,
        image: processedImage.url,
        isLoading: false
      };
    })
    .slice(0, 3);

  // Get hero image with enhanced selection logic
  const heroImage = constructImageUrl(
    eventData.fashion_images?.find((img: FashionImage) => {
      const metadata = img.metadata as ImageMetadata;
      return img.category === 'promotional' && metadata?.page === 'home';
    }) || {
      url: cloudinaryConfig.defaults.placeholders.hero,
      alt_text: 'Hero image'
    } as FashionImage
  ).url;

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
