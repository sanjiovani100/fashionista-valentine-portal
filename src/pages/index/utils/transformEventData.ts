import { toast } from "sonner";
import { cloudinaryConfig } from '@/components/cloudinary/config';
import type { EventContent, FashionCollection, FashionImage } from "@/types/event.types";
import type { ImageMetadata, ProcessedImage } from "./imageTypes";

const validateImageMetadata = (metadata: unknown): { isValid: boolean; message: string } => {
  console.group('[Image Validation]');
  console.log('Validating metadata:', metadata);
  
  if (!metadata || typeof metadata !== 'object') {
    console.warn('Invalid metadata structure:', metadata);
    console.groupEnd();
    return {
      isValid: false, 
      message: 'Invalid metadata structure'
    };
  }

  const meta = metadata as ImageMetadata;
  const hasValidSource = Boolean(meta.cloudinary_id || meta.media_url);
  
  console.log('Validation result:', { hasValidSource, meta });
  console.groupEnd();

  return {
    isValid: hasValidSource,
    message: hasValidSource ? 'Valid image source found' : 'No valid image source found'
  };
};

const constructImageUrl = (imageData: FashionImage | null): ProcessedImage => {
  console.group('[URL Construction]');
  
  if (!imageData) {
    console.warn('No image data provided');
    console.groupEnd();
    return {
      url: cloudinaryConfig.defaults.placeholders.highlight,
      alt: 'Default event image'
    };
  }

  const metadata = imageData.metadata as ImageMetadata;
  console.log('Processing image data:', { id: imageData.id, metadata });

  if (metadata?.media_url) {
    console.log('Using media_url:', metadata.media_url);
    console.groupEnd();
    return {
      url: metadata.media_url,
      alt: imageData.alt_text || 'Event image'
    };
  }

  if (metadata?.cloudinary_id) {
    const url = `https://res.cloudinary.com/${cloudinaryConfig.cloud.cloudName}/image/upload/${metadata.cloudinary_id}`;
    console.log('Using constructed Cloudinary URL:', url);
    console.groupEnd();
    return {
      url,
      alt: imageData.alt_text || 'Event image'
    };
  }

  console.log('Using fallback URL:', imageData.url);
  console.groupEnd();
  return {
    url: imageData.url || cloudinaryConfig.defaults.placeholders.highlight,
    alt: imageData.alt_text || 'Default event image'
  };
};

const findHighlightImage = (highlight: Partial<EventContent>, images: FashionImage[], usedImageIds: Set<string>): FashionImage | null => {
  console.group(`[Image Selection] Finding image for highlight: ${highlight.title}`);
  
  try {
    // First try to find an image specifically linked to this highlight
    const linkedImage = images.find(img => {
      const metadata = img.metadata as ImageMetadata;
      const isUnused = !usedImageIds.has(img.id);
      const isLinked = metadata?.content_id === highlight.id;
      
      console.log('Checking image:', {
        imageId: img.id,
        isUnused,
        isLinked,
        metadata
      });
      
      return isLinked && isUnused;
    });

    if (linkedImage) {
      console.log('Found linked image:', linkedImage);
      usedImageIds.add(linkedImage.id);
      return linkedImage;
    }

    // Then try to find an unused gallery image
    const unusedGalleryImage = images.find(img => {
      if (img.category !== 'event_gallery' || usedImageIds.has(img.id)) return false;
      
      const validation = validateImageMetadata(img.metadata);
      console.log('Checking gallery image:', {
        id: img.id,
        validation,
        metadata: img.metadata
      });
      
      return validation.isValid;
    });

    if (unusedGalleryImage) {
      console.log('Found unused gallery image:', unusedGalleryImage);
      usedImageIds.add(unusedGalleryImage.id);
      return unusedGalleryImage;
    }

    console.warn('No suitable image found');
    return null;
  } catch (error) {
    console.error('[Image Selection] Error:', error);
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

  // Track used images to prevent duplicates
  const usedImageIds = new Set<string>();

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
      
      const highlightImage = findHighlightImage(highlight, eventData.fashion_images || [], usedImageIds);
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

