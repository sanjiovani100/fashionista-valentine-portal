import { toast } from "sonner";
import { cloudinaryConfig } from '@/components/cloudinary/config';
import type { EventContent, FashionCollection, FashionImage } from "@/types/event.types";

const transformHighlightImage = (highlight: Partial<EventContent>, images: FashionImage[]): string => {
  try {
    // First try to get image from event_gallery category
    const galleryImage = images.find(img => 
      img.category === 'event_gallery' && 
      img.metadata && 
      typeof img.metadata === 'object' &&
      'content_id' in img.metadata &&
      img.metadata.content_id === highlight.id
    );

    if (galleryImage?.url) {
      return galleryImage.url;
    }

    // Fallback to media_urls if available
    if (highlight.media_urls?.[0]) {
      return highlight.media_urls[0];
    }

    console.warn(`No valid image found for highlight: ${highlight.title}`);
    return cloudinaryConfig.defaults.placeholders.event;
  } catch (error) {
    console.error('Error transforming highlight image:', error);
    return cloudinaryConfig.defaults.placeholders.event;
  }
};

const transformCollectionImage = (collection: Partial<FashionCollection>, images: FashionImage[]): string => {
  try {
    // Look for promotional images with lingerie_showcase metadata
    const showcaseImage = images.find(img => {
      if (img.category !== 'promotional' || !img.metadata) return false;
      
      const metadata = img.metadata as Record<string, unknown>;
      return metadata.page === 'lingerie_showcase' && 
             metadata.collection_id === collection.id;
    });

    if (showcaseImage?.url) {
      return showcaseImage.url;
    }

    console.warn(`No valid image found for collection: ${collection.collection_name}`);
    return cloudinaryConfig.defaults.placeholders.collection;
  } catch (error) {
    console.error('Error transforming collection image:', error);
    return cloudinaryConfig.defaults.placeholders.collection;
  }
};

export const transformEventData = (eventData: any) => {
  if (!eventData) {
    console.error('No event data provided');
    return {
      highlights: [],
      collectionsWithImages: [],
      heroImage: cloudinaryConfig.defaults.placeholders.event
    };
  }

  console.log("Starting event data transformation:", {
    contentCount: eventData.event_content?.length,
    imagesCount: eventData.fashion_images?.length
  });

  // Transform highlights with proper image URL handling
  const highlights = (eventData.event_content || [])
    .filter((content: any) => content.content_type === 'highlight')
    .map((highlight: EventContent) => ({
      ...highlight,
      event_id: highlight.event_id || '',
      media_urls: highlight.media_urls || [],
      publish_date: highlight.publish_date || new Date().toISOString(),
      engagement_metrics: highlight.engagement_metrics || {},
      image: transformHighlightImage(highlight, eventData.fashion_images || []),
      isLoading: false
    }))
    .slice(0, 3);

  // Transform collections with proper image handling
  const collectionsWithImages = (eventData.fashion_collections || [])
    .map((collection: FashionCollection) => ({
      ...collection,
      designer_id: collection.designer_id || '',
      event_id: collection.event_id || '',
      technical_requirements: collection.technical_requirements || '',
      sustainability_info: collection.sustainability_info || '',
      image: transformCollectionImage(collection, eventData.fashion_images || []),
      isLoading: false
    }))
    .slice(0, 3);

  // Get hero image with updated selection logic
  const heroImage = eventData.fashion_images?.find((img: FashionImage) => {
    if (img.category !== 'promotional' || !img.metadata) return false;
    
    const metadata = img.metadata as Record<string, unknown>;
    return metadata.page === 'home';
  })?.url || cloudinaryConfig.defaults.placeholders.event;

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