import type { FashionEvent } from "@/types/database";
import type { EventContent, FashionCollection } from "@/types/event.types";

// Default Cloudinary fallback image
const FALLBACK_IMAGE = "https://res.cloudinary.com/dzqy2ixl0/image/upload/v1738041736/placeholder_kgzjk4.jpg";

export const transformEventData = (eventData: FashionEvent) => {
  // Transform highlights data
  const highlights = (eventData.event_content || [])
    .filter(content => content.content_type === 'highlight')
    .map((highlight) => ({
      ...highlight,
      // Use the first media URL from the array, or fallback if none exists
      image: highlight.media_urls?.[0] || FALLBACK_IMAGE,
      engagement_metrics: highlight.engagement_metrics || null,
      media_urls: highlight.media_urls || null,
      publish_date: highlight.publish_date || null,
      event_id: highlight.event_id || null
    }))
    .slice(0, 3);

  // Transform collections data with proper image mapping
  const collectionsWithImages = (eventData.fashion_collections || [])
    .map((collection, index) => {
      // Find matching image for this collection based on index
      const collectionImage = eventData.fashion_images?.[index]?.url || FALLBACK_IMAGE;
      
      return {
        ...collection,
        image: collectionImage,
        designer_id: collection.designer_id || null,
        event_id: collection.event_id || null,
        technical_requirements: collection.technical_requirements || null,
        sustainability_info: collection.sustainability_info || null
      };
    })
    .slice(0, 3);

  // Get hero image
  const heroImage = eventData.fashion_images?.find(img => 
    img.category === 'event_hero'
  )?.url || FALLBACK_IMAGE;

  console.log("Transformed highlights:", highlights);
  console.log("Transformed collections:", collectionsWithImages);

  return {
    highlights,
    collectionsWithImages,
    heroImage,
  };
};