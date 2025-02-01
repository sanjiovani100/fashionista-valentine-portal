import { cloudinaryConfig } from '@/components/cloudinary/config';
import type { EventContent, FashionCollection, FashionImage } from '@/types/event.types';
import { findHighlightImage } from '../images/selection';
import { constructImageUrl } from '../images/processing';

export interface TransformedHighlight extends EventContent {
  image: string;
  alt?: string;
  isLoading: boolean;
}

export interface TransformedCollection extends FashionCollection {
  image: string;
  isLoading: boolean;
}

export interface TransformedEventData {
  highlights: TransformedHighlight[];
  collectionsWithImages: TransformedCollection[];
  heroImage: string;
}

export const transformHighlights = (
  content: EventContent[],
  images: FashionImage[]
): TransformedHighlight[] => {
  console.log('[Transform] Processing highlights:', {
    contentCount: content?.length,
    imagesCount: images?.length
  });

  return (content || [])
    .filter(item => item.content_type === 'highlight')
    .map(highlight => {
      const highlightImage = findHighlightImage(highlight, images);
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

  const usedImageIds = new Set<string>();  // Track used images

  const highlights = (eventData.event_content || [])
    .filter((content: EventContent) => content.content_type === 'highlight')
    .map((highlight: EventContent) => {
      const highlightImage = findHighlightImage(highlight, eventData.fashion_images || [], usedImageIds);
      const processedImage = {
        url: highlightImage?.url || cloudinaryConfig.defaults.placeholders.highlight,
        alt: highlightImage?.alt_text || 'Event image'
      };

      return {
        ...highlight,
        image: processedImage.url,
        alt: processedImage.alt,
        isLoading: false
      };
    })
    .slice(0, 3);

  const collections = transformCollections(eventData.fashion_collections, eventData.fashion_images);

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