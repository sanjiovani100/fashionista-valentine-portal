import type { EventContent, FashionCollection, FashionImage } from '@/types/event.types';
import { findHighlightImage } from '../images/selection';
import { constructImageUrl } from '../images/processing';
import type { TransformedEventData, TransformedHighlight, TransformedCollection } from './types';

export const transformHighlights = (
  content: EventContent[],
  images: FashionImage[]
): TransformedHighlight[] => {
  console.log('[Transform] Processing highlights:', {
    contentCount: content?.length,
    imagesCount: images?.length
  });

  const usedImageIds = new Set<string>();

  return (content || [])
    .filter(item => item.content_type === 'highlight')
    .map(highlight => {
      const highlightImage = findHighlightImage(highlight, images);
      if (highlightImage) {
        usedImageIds.add(highlightImage.id);
      }

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
};

export const transformCollections = (
  collections: FashionCollection[],
  images: FashionImage[]
): TransformedCollection[] => {
  console.log('[Transform] Processing collections:', {
    collectionsCount: collections?.length,
    imagesCount: images?.length
  });

  return (collections || [])
    .map(collection => {
      const collectionImage = images.find(img => {
        const metadata = img.metadata as Record<string, unknown>;
        return metadata?.collection_id === collection.id;
      });

      const processedImage = constructImageUrl(collectionImage || null);

      return {
        ...collection,
        image: processedImage.url,
        isLoading: false
      };
    })
    .slice(0, 3);
};

export const transformEventData = (eventData: any): TransformedEventData => {
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

  const highlights = transformHighlights(eventData.event_content, eventData.fashion_images);
  const collections = transformCollections(eventData.fashion_collections, eventData.fashion_images);

  // Get hero image
  const heroImage = constructImageUrl(
    eventData.fashion_images?.find((img: FashionImage) => {
      const metadata = img.metadata as Record<string, unknown>;
      return img.category === 'promotional' && metadata?.page === 'home';
    }) || null
  ).url;

  console.log('[Transform] Transformation complete:', {
    highlightsCount: highlights.length,
    collectionsCount: collections.length,
    hasHeroImage: !!heroImage
  });

  console.groupEnd();
  return {
    highlights,
    collectionsWithImages: collections,
    heroImage
  };
};