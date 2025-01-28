import type { FashionEvent } from "@/types/database";
import type { EventContent, FashionCollection } from "@/types/event.types";

export const transformEventData = (eventData: FashionEvent) => {
  // Transform highlights data
  const highlights = (eventData.event_content || [])
    .filter(content => content.content_type === 'highlight')
    .map((highlight) => ({
      ...highlight,
      image: highlight.media_urls?.[0] || 'placeholder',
      engagement_metrics: highlight.engagement_metrics || null,
      media_urls: highlight.media_urls || null,
      publish_date: highlight.publish_date || null,
      event_id: highlight.event_id || null
    }))
    .slice(0, 3);

  // Transform collections data
  const collectionsWithImages = (eventData.fashion_collections || [])
    .map((collection) => ({
      ...collection,
      image: eventData.fashion_images?.[0]?.url || 'placeholder',
      designer_id: collection.designer_id || null,
      event_id: collection.event_id || null,
      technical_requirements: collection.technical_requirements || null,
      sustainability_info: collection.sustainability_info || null
    }))
    .slice(0, 3);

  // Get hero image
  const heroImage = eventData.fashion_images?.find(img => 
    img.category === 'event_hero'
  )?.url || 'hero-red-bg_spclrx';

  return {
    highlights,
    collectionsWithImages,
    heroImage,
  };
};