import { toast } from "sonner";
import { CLOUDINARY_CONFIG, getFirstValidMediaUrl, isValidCloudinaryUrl } from '@/integrations/cloudinary/config';
import type { FashionEvent } from "@/types/database";
import type { EventContent, FashionCollection, FashionImage } from "@/types/event.types";

interface ImageMetadata {
  page?: string;
  collection_id?: string;
  bucket_id?: string;
  file_path?: string;
  uploaded_at?: string;
}

interface TransformedHighlight extends EventContent {
  image: string;
  isLoading?: boolean;
  error?: Error;
}

interface TransformedCollection extends FashionCollection {
  image: string;
  isLoading?: boolean;
  error?: Error;
}

const transformHighlightImage = (highlight: EventContent, images: FashionImage[]): string => {
  try {
    // First try to get image from media_urls
    const mediaUrl = getFirstValidMediaUrl(highlight.media_urls);
    if (mediaUrl && isValidCloudinaryUrl(mediaUrl)) {
      return mediaUrl;
    }

    // Then look for matching image in fashion_images
    const matchingImage = images.find(img => 
      img.category === 'event_gallery' && 
      img.metadata && 
      (img.metadata as ImageMetadata).collection_id === highlight.id
    );

    if (matchingImage && isValidCloudinaryUrl(matchingImage.url)) {
      return matchingImage.url;
    }

    console.warn(`No valid image found for highlight: ${highlight.title}`);
    return CLOUDINARY_CONFIG.defaults.placeholder;
  } catch (error) {
    console.error('Error transforming highlight image:', error);
    return CLOUDINARY_CONFIG.defaults.placeholder;
  }
};

const transformCollectionImage = (collection: FashionCollection, images: FashionImage[]): string => {
  try {
    const collectionImage = images.find(img => {
      const metadata = img.metadata as ImageMetadata | null;
      return img.category === 'promotional' && metadata?.collection_id === collection.id;
    });

    if (collectionImage && isValidCloudinaryUrl(collectionImage.url)) {
      return collectionImage.url;
    }

    console.warn(`No valid image found for collection: ${collection.collection_name}`);
    return CLOUDINARY_CONFIG.defaults.placeholder;
  } catch (error) {
    console.error('Error transforming collection image:', error);
    return CLOUDINARY_CONFIG.defaults.placeholder;
  }
};

export const transformEventData = (eventData: FashionEvent) => {
  console.log("Starting event data transformation:", {
    contentCount: eventData.event_content?.length,
    imagesCount: eventData.fashion_images?.length
  });

  // Transform highlights with proper image URL handling
  const highlights = (eventData.event_content || [])
    .filter(content => content.content_type === 'highlight')
    .map((highlight): TransformedHighlight => {
      const image = transformHighlightImage(highlight, eventData.fashion_images || []);
      
      return {
        ...highlight,
        event_id: highlight.event_id || '',
        media_urls: highlight.media_urls || [],
        publish_date: highlight.publish_date || new Date().toISOString(),
        engagement_metrics: highlight.engagement_metrics || {},
        image,
        isLoading: false
      };
    })
    .slice(0, 3);

  // Transform collections with proper image handling
  const collectionsWithImages = (eventData.fashion_collections || [])
    .map((collection): TransformedCollection => {
      const image = transformCollectionImage(collection, eventData.fashion_images || []);

      return {
        ...collection,
        designer_id: collection.designer_id || '',
        event_id: collection.event_id || '',
        technical_requirements: collection.technical_requirements || '',
        sustainability_info: collection.sustainability_info || '',
        image,
        isLoading: false
      };
    })
    .slice(0, 3);

  // Get hero image with updated selection logic
  const heroImage = eventData.fashion_images?.find(img => {
    const metadata = img.metadata as ImageMetadata | null;
    return img.category === 'promotional' && metadata?.page === 'home';
  })?.url || CLOUDINARY_CONFIG.defaults.placeholder;

  console.log("Transformation complete:", {
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