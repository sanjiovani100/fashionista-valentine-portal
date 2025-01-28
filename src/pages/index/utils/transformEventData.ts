import type { FashionEvent } from "@/types/database";
import type { EventContent, FashionCollection } from "@/types/event.types";

// Default Cloudinary fallback image
const FALLBACK_IMAGE = "https://res.cloudinary.com/dzqy2ixl0/image/upload/v1738041736/placeholder_kgzjk4.jpg";

export const transformEventData = (eventData: FashionEvent) => {
  console.log("Starting event data transformation:", { 
    contentCount: eventData.event_content?.length,
    collectionsCount: eventData.fashion_collections?.length,
    imagesCount: eventData.fashion_images?.length 
  });

  // Transform highlights data with required fields
  const highlights = (eventData.event_content || [])
    .filter(content => content.content_type === 'highlight')
    .map((highlight): EventContent & { image: string } => {
      // Get the first media URL if available, otherwise use fallback
      const imageUrl = highlight.media_urls?.[0] || FALLBACK_IMAGE;
      
      console.log("Processing highlight:", {
        title: highlight.title,
        mediaUrls: highlight.media_urls,
        selectedUrl: imageUrl,
        allUrls: highlight.media_urls 
      });

      return {
        ...highlight,
        event_id: highlight.event_id || '',
        media_urls: highlight.media_urls || [],
        publish_date: highlight.publish_date || new Date().toISOString(),
        engagement_metrics: highlight.engagement_metrics || {},
        image: imageUrl
      };
    })
    .slice(0, 3);

  console.log("Processing highlights:", {
    rawHighlights: eventData.event_content,
    transformedHighlights: highlights.map(h => ({
      title: h.title,
      mediaUrls: h.media_urls,
      imageUrl: h.image
    }))
  });

  // Transform collections data with proper image mapping and required fields
  const collectionsWithImages = (eventData.fashion_collections || [])
    .map((collection): FashionCollection & { image: string } => {
      // Find matching image for this collection
      const collectionImage = eventData.fashion_images?.find(img => 
        typeof img.metadata === 'object' && 
        img.metadata !== null && 
        'collection_id' in img.metadata && 
        img.metadata.collection_id === collection.id
      )?.url || FALLBACK_IMAGE;
      
      console.log(`Processing collection: ${collection.collection_name}`, {
        hasImage: collectionImage !== FALLBACK_IMAGE,
        imageUrl: collectionImage
      });

      return {
        ...collection,
        designer_id: collection.designer_id || '',
        event_id: collection.event_id || '',
        technical_requirements: collection.technical_requirements || '',
        sustainability_info: collection.sustainability_info || '',
        image: collectionImage
      };
    })
    .slice(0, 3);

  // Get hero image
  const heroImage = eventData.fashion_images?.find(img => 
    img.category === 'event_hero'
  )?.url || FALLBACK_IMAGE;

  console.log("Transformation complete:", {
    highlightsCount: highlights.length,
    collectionsCount: collectionsWithImages.length,
    hasHeroImage: heroImage !== FALLBACK_IMAGE,
    highlights: highlights.map(h => ({ title: h.title, image: h.image }))
  });

  return {
    highlights,
    collectionsWithImages,
    heroImage,
  };
};