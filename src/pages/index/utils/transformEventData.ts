import { toast } from "sonner";
import { cloudinaryConfig } from '@/components/cloudinary/config';
import type { EventContent, FashionCollection, FashionImage } from "@/types/event.types";
import { validateImageMetadata } from './imageValidation';
import { findHighlightImage, constructImageUrl } from './imageProcessing';
import type { ImageMetadata } from './imageTypes';

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
      const processedImage = constructImageUrl(highlightImage);
      
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

      const processedImage = constructImageUrl(collectionImage || null);
      
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
    }) || null
  ).url;

  console.log('[Transform] Transformation complete:', {
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